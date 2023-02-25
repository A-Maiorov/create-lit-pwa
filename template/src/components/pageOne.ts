import { html, LitElement } from "lit";

export class PageOne extends LitElement {
  render() {
    return html` <span>This is page one</span> `;
  }
}

customElements.define("{{pwa}}-page-one", PageOne);
