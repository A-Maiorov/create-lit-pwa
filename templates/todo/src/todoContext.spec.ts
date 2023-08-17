import { expect, fixture, html } from "@open-wc/testing";
import "./todoContext";
import { LitElement } from "lit";
import { ContextRoot, consume } from "@lit-labs/context";
import { ICtxTodoActions, TodoContext, ctxTodoActions } from "./todoContext";
import { customElement } from "lit/decorators.js";

@customElement("litpwaelementprefixplaceholder-test-consumer")
export class TestCtxConsumer extends LitElement {
  @consume({ context: ctxTodoActions, subscribe: true })
  declare actions: ICtxTodoActions;
}

describe("litpwaelementprefixplaceholder-todo-list", async () => {
  it("should trigger corresponding event if action was called by some consumer", async () => {
    new ContextRoot().attach(document.documentElement);

    let todoAddedHasBeenTriggered = false;
    const todoAddedHandler = () => {
      todoAddedHasBeenTriggered = true;
    };

    let todoDeletedHasBeenTriggered = false;
    const todoDeletedHandler = () => {
      todoDeletedHasBeenTriggered = true;
    };

    let todoUpdatedHasBeenTriggered = false;
    const todoUpdatedHandler = () => {
      todoUpdatedHasBeenTriggered = true;
    };
    const todoCtxElement = (await fixture(
      html`
        <litpwaelementprefixplaceholder-todo-ctx
          @todo-added=${todoAddedHandler}
          @todo-deleted=${todoDeletedHandler}
          @todo-updated=${todoUpdatedHandler}
        >
          <litpwaelementprefixplaceholder-test-consumer
            id="actionsConsumer"
          ></litpwaelementprefixplaceholder-test-consumer>
        </litpwaelementprefixplaceholder-todo-ctx>
      `
    )) as TodoContext;

    const actionsConsumer = document.getElementById(
      "actionsConsumer"
    ) as TestCtxConsumer;

    actionsConsumer.actions.addTodo("initial text");
    actionsConsumer.actions.updateTodo({
      id: todoCtxElement.todos[0].id,
      text: "new text",
      isDone: false,
    });
    actionsConsumer.actions.deleteTodo(todoCtxElement.todos[0].id);
    expect(todoAddedHasBeenTriggered).to.be.true;
    expect(todoDeletedHasBeenTriggered).to.be.true;
    expect(todoUpdatedHasBeenTriggered).to.be.true;
  });
});
