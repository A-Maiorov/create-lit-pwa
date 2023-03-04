import { LitElement, ReactiveController } from "lit";

export const goTo = (path: string | URL) => {
  const state = {};
  window.history.pushState(state, "", path);
  const e = new PopStateEvent("popstate", { state });
  window.dispatchEvent(e);
};

export class LocationController implements ReactiveController {
  host: LitElement;
  handler: ((location: Location, state: any) => void) | undefined;

  constructor(host: LitElement) {
    this.host = host;
    host.addController(this);
    window.addEventListener("popstate", this.listener);
  }

  setLocationChangeHandler(handler?: (location: Location, state: any) => void) {
    this.handler = handler?.bind(this.host);
  }

  private listener = (e: PopStateEvent) => {
    this.handler?.(location, e.state);
    this.host.requestUpdate();
  };

  goTo(path: string) {
    goTo(path);
  }

  public hostDisconnected() {
    window.removeEventListener("popstate", this.listener);
  }
}
