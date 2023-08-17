import { expect, html } from "@open-wc/testing";
import "./header";

import { ICtxRoute, routeCtx } from "../routerController";
import { ctxFixture } from "../../tests/helpers/ctxFixture";

describe("litpwaelementprefixplaceholder-header", () => {
  it("should show active route title", async () => {
    const testRouteCtx: ICtxRoute = {
      goTo: () => {},
      patternResult: null,
      activeRoute: {
        name: "test",
        pattern: null,
      },
    };

    const appHeader = await ctxFixture(
      html`
        <litpwaelementprefixplaceholder-app-header
          .routeTitles=${{ test: "Test" }}
        ></litpwaelementprefixplaceholder-app-header>
      `,
      [{ ctx: routeCtx, value: testRouteCtx }]
    );

    const h1 = appHeader.shadowRoot.querySelector("h1");

    expect(h1.innerText).to.be.eq("Test");
  });
});
