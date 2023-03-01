import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { PageTwo } from "./components/pageTwo";
import { LocationController } from "./locationController";
import "./components/nameEditor";
import "./components/name";
import "./components/pageOne";
import "./registerSW";

/**
 * Main application
 */
class App extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    section,
    main {
      margin: 15px 0;
    }

    p {
      color: blue;
    }
  `;

  // define 'name' property
  @property({ type: String })
  name: string;
  locationController: LocationController;

  constructor() {
    super();
    this.name = "Somebody";
    this.locationController = new LocationController(this);
  }

  render() {
    return html`
      <img width="35%" alt="Lit PWA" src="/images/manifest/lit-pwa.png" />
      <section>
        <p>
          Hello,
          <litpwaelementprefixplaceholder-name
            data-name=${this.name}
          ></litpwaelementprefixplaceholder-name>
        </p>
        <litpwaelementprefixplaceholder-name-editor
          data-placeholder="Somebody"
          @nameChanged=${this.handleNameChange}
        ></litpwaelementprefixplaceholder-name-editor>
      </section>
      <section>
        <button @click=${this.goToPage1}>Page 1</button>
        <button @click=${this.goToPage2}>Page 2</button>
        <main>${this.renderPage()}</main>
      </section>
    `;
  }

  renderPage() {
    switch (location.pathname) {
      case "/page-one":
      case "/":
      case "":
        return html`<litpwaelementprefixplaceholder-page-one></litpwaelementprefixplaceholder-page-one>`;
      case "/page-two":
        return new PageTwo();
      default:
        return html`Ooops, page not found!`;
    }
  }
  goToPage1() {
    this.locationController.goTo("/page-one");
  }
  goToPage2() {
    this.locationController.goTo("/page-two");
  }

  handleNameChange(e: CustomEvent<{ name: string }>) {
    this.name = e.detail.name;
  }
}

// define custom element
customElements.define("litpwaelementprefixplaceholder-app", App);
