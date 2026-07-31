const VERSION = "weather-app-v11-1";

const STATIC_CACHE =
  `${VERSION}-static`;

const DATA_CACHE =
  `${VERSION}-data`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest",
  "./offline.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png",

  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];


self.addEventListener(
  "install",
  function (event) {
    event.waitUntil(
      caches
        .open(STATIC_CACHE)
        .then(function (cache) {
          return cache.addAll(
            APP_SHELL
          );
        })
    );
  }
);


self.addEventListener(
  "activate",
  function (event) {
    event.waitUntil(
      caches
        .keys()
        .then(function (cacheNames) {
          return Promise.all(
            cacheNames
              .filter(function (cacheName) {
                return (
                  cacheName !== STATIC_CACHE &&
                  cacheName !== DATA_CACHE
                );
              })
              .map(function (cacheName) {
                return caches.delete(
                  cacheName
                );
              })
          );
        })
        .then(function () {
          return self.clients.claim();
        })
    );
  }
);


function isApiRequest(url) {
  return [
    "api.open-meteo.com",
    "air-quality-api.open-meteo.com",
    "geocoding-api.open-meteo.com"
  ].includes(url.hostname);
}


function isMapTileRequest(url) {
  return url.hostname.endsWith(
    "tile.openstreetmap.org"
  );
}


async function networkFirst(request) {
  const cache =
    await caches.open(DATA_CACHE);

  try {
    const response =
      await fetch(request);

    if (response.ok) {
      await cache.put(
        request,
        response.clone()
      );
    }

    return response;
  } catch (error) {
    const cachedResponse =
      await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}


async function cacheFirst(request) {
  const cachedResponse =
    await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response =
    await fetch(request);

  if (response.ok) {
    const cache =
      await caches.open(DATA_CACHE);

    await cache.put(
      request,
      response.clone()
    );
  }

  return response;
}


async function staleWhileRevalidate(
  request
) {
  const cache =
    await caches.open(STATIC_CACHE);

  const cachedResponse =
    await cache.match(request);

  const networkResponsePromise =
    fetch(request)
      .then(function (response) {
        if (response.ok) {
          cache.put(
            request,
            response.clone()
          );
        }

        return response;
      })
      .catch(function () {
        return null;
      });

  return (
    cachedResponse ||
    networkResponsePromise
  );
}


self.addEventListener(
  "fetch",
  function (event) {
    const request =
      event.request;

    if (request.method !== "GET") {
      return;
    }

    const url =
      new URL(request.url);

    if (
      request.mode === "navigate"
    ) {
      event.respondWith(
        networkFirst(request).catch(
          function () {
            return caches.match(
              "./offline.html"
            );
          }
        )
      );

      return;
    }

    if (isApiRequest(url)) {
      event.respondWith(
        networkFirst(request)
      );

      return;
    }

    if (isMapTileRequest(url)) {
      event.respondWith(
        cacheFirst(request)
      );

      return;
    }

    if (
      url.origin ===
        self.location.origin ||
      url.hostname === "unpkg.com"
    ) {
      event.respondWith(
        staleWhileRevalidate(request)
      );
    }
  }
);


self.addEventListener(
  "message",
  function (event) {
    if (
      event.data?.type ===
      "SKIP_WAITING"
    ) {
      self.skipWaiting();
    }
  }
);