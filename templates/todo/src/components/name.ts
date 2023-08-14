import { consume } from "@lit-labs/context";
import { css, html, LitElement } from "lit";
import { appCtx, ICtx } from "../ctx";
import { state } from "lit/decorators.js";

export class Name extends LitElement {
  static styles = css`
    span {
      color: var(--theme-color, purple);
      text-decoration: wavy;
    }
  `;

  @state()
  @consume({ context: appCtx, subscribe: true })
  declare appState: ICtx;

  declare name: string;
  static properties = {
    name: { type: String, attribute: "data-name" },
  };

  render() {
    return html` <span>${this.appState?.name || this.name}</span> `;
  }
}
customElements.define("litpwaelementprefixplaceholder-name", Name);
