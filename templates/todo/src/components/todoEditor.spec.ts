import { expect, html } from "@open-wc/testing";
import "./todoEditor";

import { ctxFixture } from "../../tests/helpers/ctxFixture";
import { ICtxTodoActions, ctxTodo, ctxTodoActions } from "../todoContext";
import { ReactiveElement } from "lit";

const arrangeEditor = async (todoId: number | undefined) => {
  const actionSpies = {
    addTodoHasBeenCalled: false,
    deleteTodoHasBeenCalled: false,
    updateTodoHasBeenCalled: false,
  };
  const actions: ICtxTodoActions = {
    addTodo: () => {
      actionSpies.addTodoHasBeenCalled = true;
    },
    deleteTodo: () => {
      actionSpies.deleteTodoHasBeenCalled = true;
    },
    updateTodo: () => {
      actionSpies.updateTodoHasBeenCalled = true;
    },
  };
  const eventSpies = {
    cancelHasBeenTriggered: false,
  };
  const evHandler = () => (eventSpies.cancelHasBeenTriggered = true);
  const todoEditor = await ctxFixture(
    html`
      <litpwaelementprefixplaceholder-todo-editor
        .todoId=${todoId}
        @todo-edit-cancelled=${evHandler}
      ></litpwaelementprefixplaceholder-todo-editor>
    `,
    [
      {
        ctx: ctxTodo,
        value: [{ text: "test todo", id: 1, isDone: false }],
      },
      { ctx: ctxTodoActions, value: actions },
    ]
  );
  return { todoEditor, actionSpies, eventSpies };
};

const getButton = (todoEditor: ReactiveElement, text: string) => {
  return Array.from(todoEditor.shadowRoot.querySelectorAll("button")).find(
    (x) => (x as HTMLButtonElement).innerText === text
  );
};

describe("litpwaelementprefixplaceholder-todo-editor", () => {
  describe("Add new ToDo", async () => {
    it("should show 'save' and 'cancel' buttons", async () => {
      const { todoEditor } = await arrangeEditor(undefined);
      const enabledButtons = Array.from(
        todoEditor.shadowRoot.querySelectorAll("button:not([disabled])")
      ).map((x) => (x as HTMLButtonElement).innerText);

      expect(enabledButtons).to.include.all.members(["Save", "Cancel"]);
    });

    it("should show 'delete' and 'complete' buttons as disabled", async () => {
      const { todoEditor } = await arrangeEditor(undefined);

      const enabledButtons = Array.from(
        todoEditor.shadowRoot.querySelectorAll("button[disabled]")
      ).map((x) => (x as HTMLButtonElement).innerText);

      expect(enabledButtons).to.include.all.members(["Delete", "Complete"]);
    });

    it("should trigger event when 'cancel' button is pressed"),
      async () => {
        const { todoEditor, eventSpies } = await arrangeEditor(1);

        const cancelButton = getButton(todoEditor, "Cancel");
        cancelButton.click();

        expect(eventSpies.cancelHasBeenTriggered).to.be.true;
      };

    it("should call 'addTodo' action when 'save' button is pressed"),
      async () => {
        const { todoEditor, actionSpies } = await arrangeEditor(1);

        const saveButton = getButton(todoEditor, "Save");
        saveButton.click();

        expect(actionSpies.addTodoHasBeenCalled).to.be.true;
      };
  });

  describe("Edit existing ToDo", async () => {
    it("should show 'save', 'cancel', 'delete' and 'complete' buttons", async () => {
      const { todoEditor } = await arrangeEditor(1);
      const enabledButtons = Array.from(
        todoEditor.shadowRoot.querySelectorAll("button:not([disabled])")
      ).map((x) => (x as HTMLButtonElement).innerText);

      expect(enabledButtons).to.include.all.members([
        "Save",
        "Cancel",
        "Delete",
        "Complete",
      ]);
    });

    it("should call 'updateTodo' action when 'save' button is pressed", async () => {
      const { todoEditor, actionSpies } = await arrangeEditor(1);

      const saveButton = getButton(todoEditor, "Save");
      saveButton.click();

      expect(actionSpies.updateTodoHasBeenCalled).to.be.true;
    });

    it("should call 'updateTodo' action when 'complete' button is pressed", async () => {
      const { todoEditor, actionSpies } = await arrangeEditor(1);

      const saveButton = getButton(todoEditor, "Complete");
      saveButton.click();

      expect(actionSpies.updateTodoHasBeenCalled).to.be.true;
    });
  });
});
