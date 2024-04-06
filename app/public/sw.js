importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "http://localhost:8080",
  new workbox.strategies.NetworkFirst({
    cacheName: "api-cache",
  })
);

workbox.routing.registerRoute(
  ({ url }) =>
    url.origin === "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  new workbox.strategies.CacheFirst({
    cacheName: "map-cache",
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js",
  new workbox.strategies.CacheFirst({
    cacheName: "map-cache",
  })
);

workbox.routing.registerRoute(
  ({ url }) =>
    url.origin ===
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  new workbox.strategies.CacheFirst({
    cacheName: "map-cache",
  })
);
