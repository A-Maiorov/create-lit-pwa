import { consume } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { ICtxRoute, routeCtx } from "../routerController";
import { customElement, property, state } from "lit/decorators.js";

@customElement("litpwaelementprefixplaceholder-app-header")
export class TodoAppHeader extends LitElement {
  @consume({ context: routeCtx, subscribe: true })
  @state()
  declare router: ICtxRoute;

  @property({ type: Object, attribute: false })
  declare routeTitles: Record<string, string>;

  constructor() {
    super();
    this.routeTitles = {
      notFound: "Oops!",
    };
  }

  protected render() {
    return html`<h1>
      ${this.routeTitles[this.router?.activeRoute.name] ||
      this.router?.activeRoute.name}
    </h1>`;
  }
}
