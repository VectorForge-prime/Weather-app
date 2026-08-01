const VERSION =
  "weather-app-v13-premium-1";

const STATIC_CACHE =
  `${VERSION}-static`;

const DATA_CACHE =
  `${VERSION}-data`;

const MAP_CACHE =
  `${VERSION}-maps`;


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
  */
  await cache.addAll(
    LOCAL_APP_SHELL
  );

  /*
    Bibliotecile externe sunt salvate separat.
    Dacă un CDN nu răspunde, instalarea nu este blocată.
  */
  await Promise.allSettled(
    EXTERNAL_RESOURCES.map(
      async function (
        resourceUrl
      ) {
        try {
          const response =
            await fetch(
              resourceUrl,
              {
                mode:
                  "cors"
              }
            );

          if (
            response &&
            response.ok
          ) {
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
      activateNewVersion()
    );
  }
);


async function activateNewVersion() {
  const cacheNames =
    await caches.keys();

  const currentCaches = [
    STATIC_CACHE,
    DATA_CACHE,
    MAP_CACHE
  ];

  const oldCaches =
    cacheNames.filter(
      function (
        cacheName
      ) {
        return !currentCaches.includes(
          cacheName
        );
      }
    );

  await Promise.all(
    oldCaches.map(
      function (
        cacheName
      ) {
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

function isOpenMeteoRequest(
  url
) {
  return [
    "api.open-meteo.com",
    "air-quality-api.open-meteo.com",
    "geocoding-api.open-meteo.com"
  ].includes(
    url.hostname
  );
}


function isOpenStreetMapTile(
  url
) {
  return url.hostname.endsWith(
    "tile.openstreetmap.org"
  );
}


function isExternalLibrary(
  url
) {
  return (
    url.hostname ===
      "unpkg.com" ||
    url.hostname ===
      "cdn.jsdelivr.net"
  );
}


function isLocalRequest(
  url
) {
  return (
    url.origin ===
    self.location.origin
  );
}


/* =========================
   STRATEGII CACHE
========================= */

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
      await fetch(
        request
      );

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

    if (
      cachedResponse
    ) {
      return cachedResponse;
    }

    throw error;
  }
}


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

  if (
    cachedResponse
  ) {
    return cachedResponse;
  }

  const networkResponse =
    await fetch(
      request
    );

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
    fetch(
      request
    )
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
   NAVIGARE
========================= */

async function handleNavigationRequest(
  request
) {
  try {
    const networkResponse =
      await fetch(
        request
      );

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
    const cachedRequest =
      await caches.match(
        request
      );

    if (
      cachedRequest
    ) {
      return cachedRequest;
    }

    const cachedIndex =
      await caches.match(
        "./index.html"
      );

    if (
      cachedIndex
    ) {
      return cachedIndex;
    }

    return caches.match(
      "./offline.html"
    );
  }
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


    if (
      isOpenMeteoRequest(
        url
      )
    ) {
      event.respondWith(
        networkFirst(
          request,
          DATA_CACHE
        )
      );

      return;
    }


    if (
      isOpenStreetMapTile(
        url
      )
    ) {
      event.respondWith(
        cacheFirst(
          request,
          MAP_CACHE
        )
      );

      return;
    }


    if (
      isExternalLibrary(
        url
      )
    ) {
      event.respondWith(
        staleWhileRevalidate(
          request,
          STATIC_CACHE
        )
      );

      return;
    }


    if (
      isLocalRequest(
        url
      )
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
   MESAJE ȘI UPDATE
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