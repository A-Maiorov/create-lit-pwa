import { Given, Then, When } from "@cucumber/cucumber";
import { TodoWorld } from "./world/world";
import { expect } from "@playwright/test";

Given("User visits TodoList page", async function (this: TodoWorld) {
  await this.pages.TodoList.goto();
  expect(this.pages.TodoList).toBeOpen();
});

When("User clicks Add button", async function (this: TodoWorld) {
  const addBtn = this.pages.TodoList.buttonAddTodo;
  await expect(addBtn).toBeVisible();
  await addBtn.click();
});

Then("User sees AddTodo page", async function (this: TodoWorld) {
  await expect(this.pages.AddTodo).toBeOpen();
});

Given(
  "TodoList contains {int} item with status: {string} And text: {string}",
  async function (
    this: TodoWorld,
    index: number,
    status: string,
    text: string
  ) {
    await this.setTodos([
      {
        id: new Date().getTime(),
        text,
        isDone: status === "done",
      },
    ]);
  }
);

Then(
  "{int} item has right arrow icon",
  async function (this: TodoWorld, index: number) {
    const todoItem = this.pages.TodoList.getTodoItem(index);
    await expect(todoItem.locator).toBeVisible();
    const icon = todoItem.arrowRight();
    await expect(icon).toBeVisible();
  }
);

Then(
  "{int} item has priority",
  async function (this: TodoWorld, index: number) {
    const todoItem = this.pages.TodoList.getTodoItem(index);
    const prio = todoItem.prio();
    await expect(prio).toBeVisible();
  }
);

Then(
  "{int} item's text is NOT line-through",
  async function (this: TodoWorld, index: number) {
    const todoItem = this.pages.TodoList.getTodoItem(index);
    await expect(todoItem.text()).toHaveCSS("textDecoration", "");
  }
);

Then(
  "{int} item has NO right arrow icon",
  async function (this: TodoWorld, index: number) {
    const todoItem = await this.pages.TodoList.getTodoItem(index);
    await expect(todoItem.arrowRight()).toHaveCount(0);
  }
);

Then(
  "{int} item has delete button",
  async function (this: TodoWorld, index: number) {
    const todoItem = this.pages.TodoList.getTodoItem(index);
    await expect(todoItem.deleteButton()).toBeVisible();
  }
);

Then(
  "{int} item has done icon",
  async function (this: TodoWorld, index: number) {
    const todoItem = this.pages.TodoList.getTodoItem(index);
    await expect(todoItem.doneIcon()).toBeVisible();
  }
);

Then(
  "Todo with {int} disappears",
  async function (this: TodoWorld, index: number) {
    const todoItem = this.pages.TodoList.getTodoItem(index);
    await expect(todoItem.locator).toHaveCount(0);
  }
);

When(
  "User clicks Delete button on todo with index {int}",
  async function (this: TodoWorld, index: number) {
    const todoItem = this.pages.TodoList.getTodoItem(index);
    await todoItem.deleteButton().click();
  }
);

When(
  "User clicks Todo item with index {int}",
  async function (this: TodoWorld, index: number) {
    const todoItem = this.pages.TodoList.getTodoItem(index);
    await todoItem.locator.click();
  }
);

Then("User sees EditTodo page", async function (this: TodoWorld) {
  await expect(this.pages.EditTodo).toBeOpen();
});
