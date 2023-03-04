import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class PageTwo extends LitElement {
  name = "two";

  @property({ type: String })
  pageId: string | undefined;
  render() {
    return html` <span>This is page ${this.name}. Id: ${this.pageId}</span> `;
  }
}

customElements.define("litpwaelementprefixplaceholder-page-two", PageTwo);
