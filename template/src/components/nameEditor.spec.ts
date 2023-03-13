import { html, LitElement, render } from "lit";
import "./nameEditor";

describe("litpwaelementprefixplaceholder-name-editor", () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement("div");
    document.body.appendChild(root);
  });

  afterEach(() => {
    root.remove();
  });

  it("should fire event when modified", async () => {
    const evSpy = jasmine.createSpy() as () => void;
    render(
      html`<litpwaelementprefixplaceholder-name-editor
        id="editor"
        @nameChanged=${evSpy}
      ></litpwaelementprefixplaceholder-name-editor>`,
      root
    );

    const el = document.getElementById("editor") as LitElement;
    await el.updateComplete;

    const input = el.shadowRoot.querySelector("input");

    simulateChange(input, "test");

    expect(evSpy).toHaveBeenCalled();
  });
});

function simulateChange(element: HTMLInputElement, charactersToAppend: string) {
  element.value += charactersToAppend;
  element.dispatchEvent(new Event("change"));
}
