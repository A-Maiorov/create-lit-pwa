async function LoadPolyfillsIfNeeded() {
  if (!(globalThis && "URLPattern" in globalThis)) {
    const path = "/scripts/polyfills/urlpatternPolyfill.js";
    await import(path);
  }
}

export const polyfillsLoaded = LoadPolyfillsIfNeeded();
