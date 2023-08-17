import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("litpwaelementprefixplaceholder-page-not-found")
export class PageNotFound extends LitElement {
  render() {
    return html`Oops, page not found!`;
  }
}
