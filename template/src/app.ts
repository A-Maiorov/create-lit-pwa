import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { LocationController } from "./locationController";
import { IRouteMap, Router } from "./router";
import "./polyfills/polyfillsLoader"; //start dynamically laoding polyfills if they are needed
import "./components/nameEditor";
import "./components/name";
import "./components/pageOne";
import "./components/pageTwo";
import "./components/pageNotFound";
import "./components/pageThree";
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
  locationController: LocationController; // Triggers re-rendering when location changes
  router: Router; // Choses which page to render for current location

  constructor() {
    super();
    this.name = "Somebody!!!!";

    this.locationController = new LocationController(this);

    const routes: IRouteMap = {
      "page-one*": html`<litpwaelementprefixplaceholder-page-one></litpwaelementprefixplaceholder-page-one>`,
      "page-two?id=:id(\\d+)": (routeData) =>
        html`<litpwaelementprefixplaceholder-page-two
          .pageId=${routeData.search.groups.id}
        ></litpwaelementprefixplaceholder-page-two>`,
      "page-three(/)?:id(foo|bar)?": (routeData) =>
        html`<litpwaelementprefixplaceholder-page-three
          .pageId=${routeData.pathname.groups.id}
        ></litpwaelementprefixplaceholder-page-three>`,
    };
    this.router = new Router(
      routes,
      html`<litpwaelementprefixplaceholder-page-not-found></litpwaelementprefixplaceholder-page-not-found>`,
      html`<p>Loading...</p>`
    );
  }

  render() {
    const page = this.router.matchRoute();

    return html`
      <img alt="Lit PWA" src="/images/lit-pwa.webp" />
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
        <button @click=${this.goToPage3}>Page 3</button>
        <main>${page}</main>
      </section>
    `;
  }

  goToPage1() {
    this.locationController.goTo("/page-one");
  }
  goToPage2() {
    this.locationController.goTo("/page-two?id=1");
  }
  goToPage3() {
    this.locationController.goTo("/page-three/foo");
  }

  handleNameChange(e: CustomEvent<{ name: string }>) {
    this.name = e.detail.name;
  }
}

// define custom element
customElements.define("litpwaelementprefixplaceholder-app", App);
