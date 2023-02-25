import { html, LitElement } from "lit";

export class PageTwo extends LitElement {
  render() {
    return html` <span>This is page two</span> `;
  }
}

customElements.define("{{pwa}}-page-two", PageTwo);
