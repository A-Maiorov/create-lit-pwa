import { expect, fixture, html } from "@open-wc/testing";
import "./nameEditor";

describe("litpwaelementprefixplaceholder-name-editor", () => {
  it("should fire event when modified", async () => {
    let evHasBeenCalled = false;
    const evHandler = () => {
      evHasBeenCalled = true;
    };
    const el = await fixture(
      html`<litpwaelementprefixplaceholder-name-editor
        id="editor"
        @nameChanged=${evHandler}
      ></litpwaelementprefixplaceholder-name-editor>`
    );

    const input = el.shadowRoot.querySelector("input");

    simulateChange(input, "test");
    expect(evHasBeenCalled).to.be.true;
  });
});

function simulateChange(element: HTMLInputElement, charactersToAppend: string) {
  element.value += charactersToAppend;
  element.dispatchEvent(new Event("change"));
}
