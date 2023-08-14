import { consume } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { eventOptions, property, state } from "lit/decorators.js";

export class NameEditor extends LitElement {
  @property({ type: String, attribute: "data-placeholder" })
  declare dataPlaceholder: string | undefined;

  @state()
  @consume({ context: appCtx, subscribe: true })
  declare myData: ICtx;

  @consume({ context: appCtxActions, subscribe: true })
  actions: ICtxActions;

  render() {
    return html`
      <label for="name">Enter your name:</label>
      <input
        id="name"
        type="text"
        placeholder=${this.myData.name ?? this.dataPlaceholder}
        @change=${this.handleChange}
      />
    `;
  }

  @eventOptions({ passive: true })
  handleChange(e: Event & { target: HTMLInputElement }) {
    this.actions.updateName(e.target.value);
  }
}

customElements.define("litpwaelementprefixplaceholder-name-editor", NameEditor);
