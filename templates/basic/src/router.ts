import { html, TemplateResult } from "lit";
import { polyfillsLoaded } from "./polyfills/polyfillsLoader";
import { until } from "lit/directives/until.js";

export type RouteHandler =
  | ((routeData: URLPatternResult) => TemplateResult | (new () => HTMLElement))
  | TemplateResult;

export interface IRouteMap {
  [s: string]: RouteHandler;
}

export class Router {
  routeMap: Map<URLPattern, RouteHandler> = new Map();
  ready: Promise<void>;
  loadingPage: RouteHandler;

  constructor(
    routes: IRouteMap,
    notFoundPage?: RouteHandler | undefined,
    loadingPage?: RouteHandler | undefined
  ) {
    this.loadingPage = loadingPage || html`<span>Loading...</span>`;
    this.ready = this.init(routes, notFoundPage); // Compile url patterns
  }

  private async init(
    routes: IRouteMap,
    notFoundPage?: RouteHandler | undefined
  ) {
    //Make sure that polyfills are loaded before using URLPattern API
    //https://developer.chrome.com/articles/urlpattern/
    //https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
    await polyfillsLoaded;
    if (routes)
      for (const r in routes) {
        this.routeMap.set(new URLPattern(r, window.location.origin), routes[r]);
      }

    this.routeMap.set(
      new URLPattern({
        pathname: "*",
        search: "*",
        baseURL: location.origin,
      }),
      notFoundPage || html``
    );
  }

  private async matchWhenReady() {
    await this.ready; // Wait for compiled patterns and polyfills (if needed)

    const url = window.location.toString();
    for (const [pattern, handler] of this.routeMap) {
      const patternResult = pattern.exec(url);
      if (!patternResult) continue;

      return typeof handler === "function" ? handler(patternResult) : handler;
    }
  }

  matchRoute() {
    // Use until directive to show "Loading..." message while polyfills are being loaded.
    // https://lit.dev/docs/templates/directives/#until
    return until(this.matchWhenReady(), this.loadingPage);
  }
}
