import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { iconCss, roundedButton } from "../sharedStyles";
import { consume } from "@lit-labs/context";
import { ICtxRoute, routeCtx } from "../routerController";

@customElement("litpwaelementprefixplaceholder-icon-link")
export class IconLink extends LitElement {
  @property({ type: String })
  location: string | undefined;

  @property({ type: String })
  icon: string | undefined;

  @consume({ context: routeCtx, subscribe: true })
  router: ICtxRoute;

  static styles = [
    roundedButton,
    css`
      :host {
        display: inline-block;
        width: auto;
      }

      a.rounded-button {
        display: flex;
        color: inherit;
        text-decoration: none;
        align-items: center;
        padding-right: 10px;
      }
    `,
    iconCss,
  ];

  constructor() {
    super();
  }

  render() {
    return html`
      <a
        class="rounded-button"
        @click=${this.#handleClick}
        @keypress=${this.#handleKeypress}
        href=${this.location || window.location.pathname}
      >
        <i class="icon">${this.icon}</i>
        <slot></slot
      ></a>
    `;
  }
  #handleKeypress(e: KeyboardEvent) {
    e.preventDefault();
    if (e.type === "click" || e.key === "Enter") {
      if (window.location.pathname !== location.href) {
        this.router.goTo(this.location);
      }
    }
  }
  #handleClick(e: Event & { target: HTMLAnchorElement }) {
    e.preventDefault();
    if (window.location.pathname !== location.href) {
      this.router.goTo(this.location);
    }
  }
}
