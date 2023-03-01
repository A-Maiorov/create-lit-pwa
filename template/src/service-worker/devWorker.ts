declare let self: ServiceWorkerGlobalScope;
// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("fetch", async (event) => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (
    event.request.url.startsWith(self.location.origin) &&
    event.request.url !== "/esbuild" &&
    event.request.destination === "document"
  ) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response.status === 404) {
          return fetch("/index.html");
        } else {
          return response;
        }
      }) as Response | PromiseLike<Response>
    );
  }
});
self.addEventListener("activate", () => {
  self.clients.claim();
});
export {};
