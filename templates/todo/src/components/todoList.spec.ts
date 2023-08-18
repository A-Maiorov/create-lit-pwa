import { expect, html } from "@open-wc/testing";
import "./todoList";
import { ctxFixture } from "../../tests/helpers/ctxFixture";
import { ctxTodo } from "../context/todoContext";

describe("litpwaelementprefixplaceholder-todo-list", () => {
  it("should show active route title", async () => {
    const todoList = await ctxFixture(
      html`
        <litpwaelementprefixplaceholder-todo-list
          .routeTitles=${{ test: "Test" }}
        ></litpwaelementprefixplaceholder-todo-list>
      `,
      [
        {
          ctx: ctxTodo,
          value: [{ text: "test todo", id: new Date().getTime, isDone: false }],
        },
      ]
    );

    const li = todoList.shadowRoot.querySelector("li");
    const prio = li.querySelector(".prio") as HTMLDivElement;
    const text = li.querySelector(".text") as HTMLDivElement;
    const icon = li.querySelector("i.icon") as HTMLElement;

    expect(li).to.be.not.undefined;
    expect(prio).to.be.not.undefined;
    expect(text).to.be.not.undefined;
    expect(icon).to.be.not.undefined;
    expect(prio.innerText).to.be.equal("1");
    expect(text.innerText).to.be.equal("test todo");
    expect(icon.innerText).to.be.equal("arrow_right");
  });
});
