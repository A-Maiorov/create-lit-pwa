// This module intended to be included in the main app bundle
// In case if browser does not need a polyfill, it will return a fulfilled promise

async function LoadPolyfillsIfNeeded() {
  if (!(globalThis && "URLPattern" in globalThis)) {
    const path = "/scripts/polyfills/urlpatternPolyfill.js";
    await import(path);
  }
}

export const polyfillsLoaded = LoadPolyfillsIfNeeded();
