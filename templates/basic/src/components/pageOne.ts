import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("litpwaelementprefixplaceholder-page-one")
export class PageOne extends LitElement {
  render() {
    return html` <span>This is page one</span> `;
  }
}
