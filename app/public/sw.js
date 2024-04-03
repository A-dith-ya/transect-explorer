importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "http://localhost:8080",
  new workbox.strategies.NetworkFirst({
    cacheName: "api-cache",
  })
);
