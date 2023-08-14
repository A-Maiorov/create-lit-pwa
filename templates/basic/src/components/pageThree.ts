import { html } from "lit";
import { PageTwo } from "./pageTwo";

export class PageThree extends PageTwo {
  name = "three";

  render() {
    return html`${super.render()}
      <p>It supports these optional path parameters: foo, bar</p> `;
  }
}

customElements.define("litpwaelementprefixplaceholder-page-three", PageThree);
