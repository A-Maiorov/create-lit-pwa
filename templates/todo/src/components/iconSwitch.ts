import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { iconCss, roundedButton } from "../theme/sharedStyles";

@customElement("litpwaelementprefixplaceholder-icon-switch")
export class IconSwitch extends LitElement {
  @property({ type: String })
  declare text: string | undefined;

  @property({ type: String })
  declare onIcon: string | undefined;

  @property({ type: String })
  declare offIcon: string | undefined;

  @state()
  declare isOn;

  constructor() {
    super();
    this.isOn = false;
  }

  static styles = [
    roundedButton,
    css`
      .btn-holder {
        width: 56px;

        display: flex;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
      }
      .btn-circle {
        background-color: var(--third-bg);
        color: var(--third-color);
        transform: translateX(0px);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        transition: 300ms;
      }

      .btn-holder[active] > .btn-circle {
        transform: translateX(32px);
        transition: 300ms;
      }

      input[type="checkbox"] {
        display: none;
      }
    `,
    iconCss,
  ];

  render() {
    const icon = this.isOn ? this.onIcon : this.offIcon;
    return html`
      <div
        role="button"
        tabindex="0"
        class="btn-holder rounded-button"
        ?active=${this.isOn}
        @click=${this.#handleClick}
        @keypress=${this.#handleKeypress}
      >
        <div class="btn-circle">
          <i class="icon">${icon}</i>
        </div>
        <input type="checkbox" />
      </div>
    `;
  }

  #handleKeypress(e: KeyboardEvent) {
    if (e.type === "click" || e.key === "Enter") {
      this.#switchTheme();
    }
  }

  #handleClick() {
    this.#switchTheme();
  }

  #switchTheme() {
    this.isOn = !this.isOn;
    const ev = new CustomEvent("switch", { detail: { isOn: this.isOn } });
    this.dispatchEvent(ev);
  }
}
