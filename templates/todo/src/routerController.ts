import { ContextProvider, createContext } from "@lit-labs/context";
import { ReactiveController, ReactiveElement } from "lit";
import { IRoute, Router } from "./router";

export const goTo = (path: string | URL) => {
  const state = {};
  window.history.pushState(state, "", path);
  const e = new PopStateEvent("popstate", { state });
  window.dispatchEvent(e);
};

export interface ICtxRoute {
  activeRoute: IRoute;
  patternResult: URLPatternResult;
  goTo: (path: string) => void;
}

export const routeCtx = createContext<ICtxRoute>(Symbol("routeCtx"));

export class RouterController implements ReactiveController {
  host: ReactiveElement;
  handler: ((location: Location, state: unknown) => void) | undefined;

  routeContext: ContextProvider<typeof routeCtx>;

  private router: Router;
  private ready: Promise<void>;

  constructor(host: ReactiveElement, routes: IRoute[]) {
    this.host = host;
    host.addController(this);

    this.routeContext = new ContextProvider(host, { context: routeCtx });

    this.router = new Router(routes);
    this.ready = this.#updateRoute();

    window.addEventListener("popstate", this.#listener);
  }

  async hostConnected() {
    await this.ready;
    this.host.requestUpdate();
  }

  #listener = async (e: PopStateEvent) => {
    this.handler?.(location, e.state);
    await this.#updateRoute();
    this.host.requestUpdate();
  };

  async #updateRoute() {
    const result = await this.router.matchRoute();
    this.routeContext.setValue({
      activeRoute: result.route,
      patternResult: result.patternResult,
      goTo,
    });
  }

  get currentContext() {
    return this.routeContext.value;
  }

  public hostDisconnected() {
    window.removeEventListener("popstate", this.#listener);
  }

  goTo(path: string) {
    goTo(path);
  }
}
