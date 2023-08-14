import { html, LitElement } from "lit";

export class PageNotFound extends LitElement {
  render() {
    return html`Ooops, page not found!`;
  }
}

customElements.define(
  "litpwaelementprefixplaceholder-page-not-found",
  PageNotFound
);
