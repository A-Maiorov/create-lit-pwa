import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import "./nameEditor";
import "./name";

/**
 * Main application
 */
class App extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  // define 'name' property
  @property({ type: String })
  name: string;

  constructor() {
    super();
    this.name = "Somebody";
  }

  render() {
    return html`
      <p>Hello, <df-name data-name=${this.name}></df-name></p>
      <df-name-editor
        data-placeholder="Somebody"
        @nameChanged=${this.handleNameChange}
      ></df-name-editor>
    `;
  }

  handleNameChange(e: CustomEvent<{ name: string }>) {
    this.name = e.detail.name;
  }
}

// define custom element
customElements.define("df-app", App);
