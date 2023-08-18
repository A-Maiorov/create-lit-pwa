import { polyfillsLoaded } from "../polyfills/polyfillsLoader";
import { URLPatternInput } from "urlpattern-polyfill/dist/types";

export interface IRoute {
  pattern: URLPatternInput;
  name: string;
}

export class Router {
  routeMap: Map<URLPattern, IRoute> = new Map();
  ready: Promise<void>;

  constructor(routes: IRoute[]) {
    this.ready = this.init(routes); // Compile url patterns
  }

  private async init(routes: IRoute[]) {
    //Make sure that polyfills are loaded before using URLPattern API
    //https://developer.chrome.com/articles/urlpattern/
    //https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
    await polyfillsLoaded;
    if (routes)
      for (const r of routes) {
        this.routeMap.set(new URLPattern(r.pattern, window.location.origin), r);
      }

    const notFoundRoute: IRoute = {
      pattern: {
        pathname: "*",
        search: "*",
        baseURL: location.origin,
      },
      name: "notFound",
    };
    this.routeMap.set(new URLPattern(notFoundRoute.pattern), notFoundRoute);
  }

  public async matchRoute() {
    await this.ready; // Wait for compiled patterns and polyfills (if needed)

    const url = window.location.toString();
    for (const [pattern, route] of this.routeMap) {
      const patternResult = pattern.exec(url);
      if (!patternResult) continue;

      return { route, patternResult };
    }
  }
}
