import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { RouterController } from "./routerController";
import { IRoute } from "./router";

import "./polyfills/polyfillsLoader"; //start dynamically loading polyfills if they are needed
import "./registerSW";

import { darkThemeCss, iconCss, lightThemeCss } from "./sharedStyles";

import "./components/todoEditor";
import "./components/todoList";
import "./components/iconLink";
import "./components/switch";
import "./todoContext";
import "./components/header";

// UrlPattern Api: https://developer.mozilla.org/en-US/docs/Web/API/URLPattern
// Pattern syntax: https://github.com/pillarjs/path-to-regexp
const todoRoutes: IRoute[] = [
  {
    pattern: "(|/?)",
    name: "todoList",
  },
  {
    pattern: "(add-todo*|/?)",
    name: "addTodo",
  },

  {
    pattern: "edit-todo/:id(\\d+)",
    name: "editTodo",
  },
];

const routeTitles: Record<string, string> = {
  todoList: "Todo:",
  addTodo: "Add new todo",
  editTodo: "Edit todo",
  notFound: "Oops!",
};

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

  constructor() {
    super();
    const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    this.setAttribute("theme", defaultTheme);
    //Controllers automatically refresh host element,
    //subscribe and dispose subscription on disconnectedCallback
    //https://lit.dev/docs/composition/controllers/
    this.router = new RouterController(this, todoRoutes);
  }

  connectedCallback() {
    super.connectedCallback();
    this.#applyThemeHtmlBgColor();
  }

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
              .routeTitles=${routeTitles}
            ></litpwaelementprefixplaceholder-app-header>
          </header>
          <nav>
            <litpwaelementprefixplaceholder-icon-link
              icon="add"
              location="/add-todo"
            >
              Add
            </litpwaelementprefixplaceholder-icon-link>
            <litpwaelementprefixplaceholder-switch
              @switch=${this.#changeTheme}
              .text=${"Theme"}
              onIcon="dark_mode"
              offIcon="light_mode"
            ></litpwaelementprefixplaceholder-switch>
          </nav>

          <section>${this.#renderPage()}</section>
        </main>
      </litpwaelementprefixplaceholder-todo-ctx>
    `;
  }

  #changeTheme() {
    const theme = this.getAttribute("theme");
    this.setAttribute("theme", theme === "light" ? "dark" : "light");
    this.#applyThemeHtmlBgColor();
  }

  #applyThemeHtmlBgColor() {
    const bg = getComputedStyle(this).getPropertyValue("--main-bg");
    if (document.body.parentElement)
      document.body.parentElement.style.backgroundColor = bg;
  }

  #renderPage() {
    const ctx = this.router.currentContext;
    if (!ctx) return html`Loading...`;
    switch (ctx.activeRoute.name) {
      case "todoList":
        return html`<litpwaelementprefixplaceholder-todo-list></litpwaelementprefixplaceholder-todo-list>`;
      case "editTodo": {
        const id = parseInt(ctx.patternResult.pathname.groups.id);
        if (!isNaN(id))
          return html`<litpwaelementprefixplaceholder-todo-editor
            @todo-edit-cancelled=${this.#goToTodoList}
            .todoId=${id}
          ></litpwaelementprefixplaceholder-todo-editor>`;
        return this.#renderNotFound();
      }
      case "addTodo":
        return html`<litpwaelementprefixplaceholder-todo-editor
          @todo-edit-cancelled=${this.#goToTodoList}
        ></litpwaelementprefixplaceholder-todo-editor>`;
      default:
        return this.#renderNotFound();
    }
  }

  #renderNotFound() {
    return html` <h3>Oops, page not found!</h3> `;
  }
}
