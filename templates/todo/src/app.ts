import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { RouterController } from "./context/routerContext";

import "./polyfills/polyfillsLoader"; //start dynamically loading polyfills if they are needed
import "./utils/registerSW";

import { darkThemeCss, iconCss, lightThemeCss } from "./theme/sharedStyles";

import "./components/todoEditor";
import "./components/todoList";
import "./components/iconLink";
import "./components/iconSwitch";
import "./context/todoContext";
import "./components/header";
import { Theme, getCurrentTheme, savePreferredTheme } from "./theme/theme";
import { pagePatterns, pageTitles, renderCurrentPage } from "./pages";
import { pageAddTodo } from "./pages/pageAddTodo";

const themePromise = getCurrentTheme();

/**
 * Main application
 */
@customElement("litpwaelementprefixplaceholder-app")
export class App extends LitElement {
  static styles = [
    lightThemeCss,
    darkThemeCss,
    css`
      :host {
        background-color: var(--main-bg);
        color: var(--main-color);
      }
      .main-container {
        display: flex;
        width: 100vw;
        justify-content: center;
      }

      main {
        width: 40%;
      }
      nav {
        display: flex;
        justify-content: space-between;
      }

      @media only screen and (max-width: 992px) {
        main {
          width: 60%;
        }
      }

      @media only screen and (max-width: 768px) {
        main {
          width: 70%;
        }
      }
      @media only screen and (max-width: 576px) {
        main {
          width: 100%;
          margin: 10px;
        }
      }
    `,
    iconCss,
  ];

  router: RouterController;

  @state()
  declare themeSwitchOn: boolean;

  constructor() {
    super();

    themePromise.then(this.#initTheme);

    //Controllers automatically refresh host element,
    //subscribe and dispose subscription on disconnectedCallback
    //https://lit.dev/docs/composition/controllers/
    this.router = new RouterController(this, pagePatterns);
  }
  #initTheme = (theme: Theme) => {
    this.setAttribute("theme", theme);
    this.#applyThemeHtmlBgColor();
    this.themeSwitchOn = theme === "light";
  };

  #goToTodoList() {
    this.router.goTo("/");
  }

  render() {
    return html`
      <litpwaelementprefixplaceholder-todo-ctx
        class="main-container"
        @todo-updated=${this.#goToTodoList}
        @todo-added=${this.#goToTodoList}
        @todo-deleted=${this.#goToTodoList}
      >
        <main>
          <header>
            <litpwaelementprefixplaceholder-app-header
              .routeTitles=${pageTitles}
            ></litpwaelementprefixplaceholder-app-header>
          </header>
          <nav>
            <litpwaelementprefixplaceholder-icon-link
              icon="add"
              location=${pageAddTodo.getUrl()}
            >
              Add
            </litpwaelementprefixplaceholder-icon-link>
            <litpwaelementprefixplaceholder-icon-switch
              id="themeSwitch"
              @switch=${this.#changeTheme}
              .text=${"Theme"}
              offIcon="dark_mode"
              onIcon="light_mode"
              .isOn=${this.themeSwitchOn}
            ></litpwaelementprefixplaceholder-icon-switch>
          </nav>

          <section>${renderCurrentPage(this.router.currentContext)}</section>
        </main>
      </litpwaelementprefixplaceholder-todo-ctx>
    `;
  }

  #changeTheme() {
    let theme = this.getAttribute("theme") as Theme;
    theme = theme === "light" ? "dark" : "light";
    this.setAttribute("theme", theme);
    this.#applyThemeHtmlBgColor();
    savePreferredTheme(theme);
  }

  #applyThemeHtmlBgColor() {
    const bg = getComputedStyle(this).getPropertyValue("--main-bg");
    if (document.body.parentElement)
      document.body.parentElement.style.backgroundColor = bg;
  }
}
