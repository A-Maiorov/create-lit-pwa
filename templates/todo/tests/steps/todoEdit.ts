import { Then, When } from "@cucumber/cucumber";
import { TodoWorld } from "./world/world";
import { expect } from "@playwright/test";

When("User opens TodoEdit page", async function (this: TodoWorld) {
  await this.pages.EditTodo.goto({ todoId: this.todos[0].id.toString() });
  await expect(this.pages.EditTodo).toBeOpen();
});

Then("Save button is visible", async function (this: TodoWorld) {
  await expect(this.pages.EditTodo.saveButton()).toBeVisible();
});

Then("Cancel button is visible", async function (this: TodoWorld) {
  await expect(this.pages.EditTodo.cancelButton()).toBeVisible();
});

Then("Complete button is visible", async function (this: TodoWorld) {
  await expect(this.pages.EditTodo.completeButton()).toBeVisible();
});

Then("Delete button is visible", async function (this: TodoWorld) {
  await expect(this.pages.EditTodo.deleteButton()).toBeVisible();
});
