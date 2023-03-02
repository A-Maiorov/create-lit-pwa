import { html } from "lit";
import { TemplateResult } from "lit-html";
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

  constructor(routes: IRouteMap, notFoundPage?: RouteHandler | undefined) {
    this.ready = this.init(routes, notFoundPage);
  }

  private async init(
    routes: IRouteMap,
    notFoundPage?: RouteHandler | undefined
  ) {
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
    await this.ready;

    const url = window.location.toString();
    for (const [pattern, handler] of this.routeMap) {
      const patternResult = pattern.exec(url);
      if (!patternResult) continue;

      return typeof handler === "function" ? handler(patternResult) : handler;
    }
  }

  matchRoute() {
    return until(this.matchWhenReady(), html`<span>Loading...</span>`);
  }
}
