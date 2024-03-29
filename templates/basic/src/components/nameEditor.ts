import { LitElement, html } from "lit";
import { eventOptions, property, customElement } from "lit/decorators.js";

@customElement("litpwaelementprefixplaceholder-name-editor")
export class NameEditor extends LitElement {
  @property({ type: String, attribute: "data-placeholder" })
  declare placeholder: string | undefined;

  render() {
    return html`
      <label for="name">Enter your name:</label>
      <input
        id="name"
        type="text"
        placeholder=${this.placeholder ?? ""}
        @change=${this.handleChange}
      />
    `;
  }

  @eventOptions({ passive: true })
  handleChange(e: Event & { target: HTMLInputElement }) {
    const nameChanged = new CustomEvent("nameChanged", {
      detail: { name: e.target.value },
      composed: true,
      bubbles: true,
    });
    this.dispatchEvent(nameChanged);
  }
}
