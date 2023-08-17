import { html } from "lit";
import { PageTwo } from "./pageTwo";
import { customElement } from "lit/decorators.js";

@customElement("litpwaelementprefixplaceholder-page-three")
export class PageThree extends PageTwo {
  name = "three";

  render() {
    return html`${super.render()}
      <p>It supports these optional path parameters: foo, bar</p> `;
  }
}
