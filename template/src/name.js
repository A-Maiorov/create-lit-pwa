import { css, html, LitElement } from "lit";

export class Name extends LitElement {
  static styles = css`
    span {
      color: purple;
      text-decoration: wavy;
    }
  `;

  static properties = {
    name: { type: String, attribute: "data-name" },
  };

  constructor() {
    super();
    this.name = "";
  }

  render() {
    return html` <span>${this.name}</span> `;
  }
}
customElements.define("{{pwa}}-name", Name);
