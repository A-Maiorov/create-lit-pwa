import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("test-container")
export class TestContainer extends LitElement {
  styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  protected render() {
    return html`<slot></slot>
      Test: `;
  }
}
