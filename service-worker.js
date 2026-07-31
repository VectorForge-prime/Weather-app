const VERSION =
  "weather-app-v12-pro-1";

const STATIC_CACHE =
  `${VERSION}-static`;

const DATA_CACHE =
  `${VERSION}-data`;

const MAP_CACHE =
  `${VERSION}-maps`;


/*
  Fișiere locale obligatorii.

  Acestea trebuie să existe în proiect.
*/
const LOCAL_APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest",
  "./offline.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];


/*
  Biblioteci externe.

  Dacă una dintre ele nu poate fi descărcată,
  instalarea Service Worker-ului nu va fi blocată.
*/
const EXTERNAL_RESOURCES = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js"
];


/* =========================
   INSTALARE
========================= */

self.addEventListener(
  "install",
  function (event) {
    event.waitUntil(
      installApplicationShell()
    );
  }
);


async function installApplicationShell() {
  const cache =
    await caches.open(
      STATIC_CACHE
    );

  /*
    Fișierele locale sunt obligatorii.
    Dacă unul lipsește, trebuie să vedem eroarea.
  */
  await cache.addAll(
    LOCAL_APP_SHELL
  );

  /*
    Resursele externe sunt salvate separat.
    O eroare CDN nu blochează instalarea aplicației.
  */
  await Promise.allSettled(
    EXTERNAL_RESOURCES.map(
      async function (resourceUrl) {
        try {
          const response =
            await fetch(
              resourceUrl,
              {
                mode: "cors"
              }
            );

          if (response.ok) {
            await cache.put(
              resourceUrl,
              response.clone()
            );
          }
        } catch (error) {
          console.warn(
            "Resursa externă nu a fost salvată:",
            resourceUrl,
            error
          );
        }
      }
    )
  );
}


/* =========================
   ACTIVARE
========================= */

self.addEventListener(
  "activate",
  function (event) {
    event.waitUntil(
      removeOldCaches()
    );
  }
);


async function removeOldCaches() {
  const cacheNames =
    await caches.keys();

  const currentCaches = [
    STATIC_CACHE,
    DATA_CACHE,
    MAP_CACHE
  ];

  const oldCaches =
    cacheNames.filter(
      function (cacheName) {
        return !currentCaches.includes(
          cacheName
        );
      }
    );

  await Promise.all(
    oldCaches.map(
      function (cacheName) {
        return caches.delete(
          cacheName
        );
      }
    )
  );

  await self.clients.claim();
}


/* =========================
   IDENTIFICAREA CERERILOR
========================= */

function isOpenMeteoRequest(url) {
  return [
    "api.open-meteo.com",
    "air-quality-api.open-meteo.com",
    "geocoding-api.open-meteo.com"
  ].includes(
    url.hostname
  );
}


function isOpenStreetMapTile(url) {
  return (
    url.hostname.endsWith(
      "tile.openstreetmap.org"
    )
  );
}


function isExternalLibrary(url) {
  return (
    url.hostname ===
      "unpkg.com" ||
    url.hostname ===
      "cdn.jsdelivr.net"
  );
}


function isLocalRequest(url) {
  return (
    url.origin ===
    self.location.origin
  );
}


/* =========================
   STRATEGII CACHE
========================= */

/*
  Network First

  Încearcă întâi internetul.
  Dacă nu merge, returnează ultima versiune din cache.
*/
async function networkFirst(
  request,
  cacheName
) {
  const cache =
    await caches.open(
      cacheName
    );

  try {
    const networkResponse =
      await fetch(request);

    if (
      networkResponse &&
      networkResponse.ok
    ) {
      await cache.put(
        request,
        networkResponse.clone()
      );
    }

    return networkResponse;
  } catch (error) {
    const cachedResponse =
      await cache.match(
        request
      );

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}


/*
  Cache First

  Returnează mai întâi resursa salvată.
  Dacă nu există, o descarcă și o salvează.
*/
async function cacheFirst(
  request,
  cacheName
) {
  const cache =
    await caches.open(
      cacheName
    );

  const cachedResponse =
    await cache.match(
      request
    );

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse =
    await fetch(request);

  if (
    networkResponse &&
    networkResponse.ok
  ) {
    await cache.put(
      request,
      networkResponse.clone()
    );
  }

  return networkResponse;
}


/*
  Stale While Revalidate

  Afișează imediat versiunea din cache,
  dar verifică în fundal dacă există una nouă.
*/
async function staleWhileRevalidate(
  request,
  cacheName
) {
  const cache =
    await caches.open(
      cacheName
    );

  const cachedResponse =
    await cache.match(
      request
    );

  const networkPromise =
    fetch(request)
      .then(
        async function (
          networkResponse
        ) {
          if (
            networkResponse &&
            networkResponse.ok
          ) {
            await cache.put(
              request,
              networkResponse.clone()
            );
          }

          return networkResponse;
        }
      )
      .catch(
        function () {
          return null;
        }
      );

  return (
    cachedResponse ||
    networkPromise
  );
}


/* =========================
   FETCH
========================= */

self.addEventListener(
  "fetch",
  function (event) {
    const request =
      event.request;

    if (
      request.method !==
      "GET"
    ) {
      return;
    }

    const url =
      new URL(
        request.url
      );


    /*
      Navigarea către pagini HTML.
    */
    if (
      request.mode ===
      "navigate"
    ) {
      event.respondWith(
        handleNavigationRequest(
          request
        )
      );

      return;
    }


    /*
      API-urile meteo folosesc Network First.
    */
    if (
      isOpenMeteoRequest(url)
    ) {
      event.respondWith(
        networkFirst(
          request,
          DATA_CACHE
        )
      );

      return;
    }


    /*
      Hărțile folosesc Cache First.
    */
    if (
      isOpenStreetMapTile(url)
    ) {
      event.respondWith(
        cacheFirst(
          request,
          MAP_CACHE
        )
      );

      return;
    }


    /*
      Bibliotecile externe folosesc
      Stale While Revalidate.
    */
    if (
      isExternalLibrary(url)
    ) {
      event.respondWith(
        staleWhileRevalidate(
          request,
          STATIC_CACHE
        )
      );

      return;
    }


    /*
      Fișierele locale folosesc
      Stale While Revalidate.
    */
    if (
      isLocalRequest(url)
    ) {
      event.respondWith(
        staleWhileRevalidate(
          request,
          STATIC_CACHE
        )
      );
    }
  }
);


/* =========================
   NAVIGARE OFFLINE
========================= */

async function handleNavigationRequest(
  request
) {
  try {
    const networkResponse =
      await fetch(request);

    if (
      networkResponse &&
      networkResponse.ok
    ) {
      const cache =
        await caches.open(
          STATIC_CACHE
        );

      await cache.put(
        request,
        networkResponse.clone()
      );
    }

    return networkResponse;
  } catch (error) {
    const cachedPage =
      await caches.match(
        request
      );

    if (cachedPage) {
      return cachedPage;
    }

    const cachedIndex =
      await caches.match(
        "./index.html"
      );

    if (cachedIndex) {
      return cachedIndex;
    }

    return caches.match(
      "./offline.html"
    );
  }
}


/* =========================
   ACTUALIZAREA APLICAȚIEI
========================= */

self.addEventListener(
  "message",
  function (event) {
    if (
      event.data &&
      event.data.type ===
        "SKIP_WAITING"
    ) {
      self.skipWaiting();
    }
  }
);