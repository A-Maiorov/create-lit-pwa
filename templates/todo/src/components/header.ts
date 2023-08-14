import { consume } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { ICtxRoute, routeCtx } from "../routerController";
import { customElement, state } from "lit/decorators.js";

@customElement("litpwaelementprefixplaceholder-app-header")
export class TodoAppHeader extends LitElement {
  @consume({ context: routeCtx, subscribe: true })
  @state()
  router: ICtxRoute;

  routeTitles: Record<string, string> = {
    todoList: "Todo:",
    addTodo: "Add new todo",
    editTodo: "Edit todo",
    notFound: "Oops!",
  };

  protected render() {
    return html`<h1>${this.routeTitles[this.router?.activeRoute.name]}</h1>`;
  }
}
