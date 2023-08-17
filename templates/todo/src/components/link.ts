import { consume } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ICtxRoute, routeCtx } from "../routerController";

@customElement("litpwaelementprefixplaceholder-link")
export class Link extends LitElement {
  @property({ type: String })
  location: string | undefined;

  @consume({ context: routeCtx, subscribe: true })
  router: ICtxRoute;

  constructor() {
    super();
  }

  render() {
    return html`
      <a
        @click=${this.#handleClick}
        href=${this.location || window.location.pathname}
        ><slot></slot
      ></a>
    `;
  }

  #handleClick(e: Event & { target: HTMLAnchorElement }) {
    e.preventDefault();
    if (window.location.pathname !== location.href) {
      this.router.goTo(this.location);
    }
  }
}
