import { html, LitElement, render } from "lit";
import "./name";

describe("litpwaelementprefixplaceholder-name", () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement("div");
    document.body.appendChild(root);
  });

  afterEach(() => {
    root.remove();
  });

  it("should create element", async () => {
    const name = "It's me";
    render(
      html`<litpwaelementprefixplaceholder-name
        data-name=${name}
      ></litpwaelementprefixplaceholder-name>`,
      root
    );
    const nameElement = document.querySelector(
      "litpwaelementprefixplaceholder-name"
    ) as LitElement;

    await nameElement.updateComplete;

    const span = nameElement.shadowRoot.querySelector("span");

    expect(span).toBeInstanceOf(HTMLSpanElement);
    expect(span.innerText).toBe(name);
  });
});
