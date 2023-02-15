import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import "./nameEditor";
import "./name";
class App extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  @property({ type: String })
  name: string;

  constructor() {
    super();
    this.name = "Somebody";
  }

  render() {
    return html`
      <p>Hello, <{{pwa}}-name data-name=${this.name}></{{pwa}}-name></p>
      <{{pwa}}-name-editor
        data-placeholder="Somebody"
        @nameChanged=${this.handleNameChange}
      ></{{pwa}}-name-editor>
    `;
  }

  handleNameChange(e: CustomEvent<{ name: string }>) {
    this.name = e.detail.name;
  }
}

customElements.define("{{pwa}}-app", App);
