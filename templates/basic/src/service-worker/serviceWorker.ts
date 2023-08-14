export {};
declare let self: ServiceWorkerGlobalScope;
declare let filesHashes: { url: string; hash: string }[];

const cache = "CACHE";
const cacheIndex = "cacheIndex";

function createNewCacheIndex(c: Cache) {
  const response = {
    body: filesHashes,
    init: {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };

  const mockResponse = new Response(
    JSON.stringify(response.body),
    response.init
  );

  c.put(cacheIndex, mockResponse);
}

async function getOldIndex(
  c: Cache,
  cachedRequests: readonly Request[]
): Promise<false | { url: string; hash: string }[]> {
  if (!cachedRequests.find((r) => r.url.endsWith(cacheIndex))) {
    for (const r of cachedRequests) {
      await c.delete(r);
    }
    return false;
  }

  const cacheIndexResp = await c.match(cacheIndex);
  return (await cacheIndexResp.json()) as {
    url: string;
    hash: string;
  }[];
}

async function precacheAll(c: Cache) {
  for (const newFile of filesHashes) {
    c.add(newFile.url);
  }
}

async function recacheChangedFiles(
  c: Cache,
  cachedRequests: readonly Request[],
  index: { url: string; hash: string }[]
) {
  for (const newFile of filesHashes) {
    const cachedFile = cachedRequests.find((x) => x.url.endsWith(newFile.url));
    const indexedFile = index.find((x) => x.url === newFile.url);

    if (cachedFile && indexedFile?.hash !== newFile.hash) {
      await c.delete(cachedFile);
      await c.add(newFile.url);
    }

    if (!cachedFile && !indexedFile) {
      await c.add(newFile.url);
    }
  }
}

async function updateCache() {
  const c = await caches.open(cache);

  const cachedRequests = await c.keys();
  const index = await getOldIndex(c, cachedRequests);

  if (!index) {
    await precacheAll(c);
  } else {
    await recacheChangedFiles(c, cachedRequests, index);
  }
  await createNewCacheIndex(c);
}

// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", async (event) => {
  event.waitUntil(updateCache());
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener("fetch", async (event) => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(cache).then((cache) => {
          return fetch(event.request).then((response) => {
            if (response.status === 404) {
              return caches.match("index.html");
            }
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        }) as Response | PromiseLike<Response>;
      })
    );
  }
});
