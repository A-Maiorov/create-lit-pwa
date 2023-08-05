import { expect, fixture, html } from "@open-wc/testing";
import "./name";

describe("pwa-name", () => {
  it("should create element", async () => {
    const name = "It's me";
    const nameElement = await fixture(
      html`<litpwaelementprefixplaceholder-name
        data-name=${name}
      ></litpwaelementprefixplaceholder-name>`
    );

    const span = nameElement.shadowRoot.querySelector("span");

    expect(span).to.be.instanceOf(HTMLSpanElement);
    expect(span.innerText).to.be.eq(name);
  });
});
