import { Given, When } from "@cucumber/cucumber";
import { TodoWorld } from "./world/world";

Given("todoList is empty", async function (this: TodoWorld) {
  await this.setTodos([]);
});

When("User opens TodoAdd page", async function (this: TodoWorld) {
  await this.pages.AddTodo.goto();
});
