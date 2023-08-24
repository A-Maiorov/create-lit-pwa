import { Locator } from "playwright";
import { PageObjectBase } from "./pageObjectBase";

export class TodoList extends PageObjectBase {
  isOpen(): boolean {
    const currentUtl = this.page.url();
    return currentUtl === this.baseUrl + this.url;
  }
  url = "/";

  get buttonAddTodo(): Locator {
    return this.page.getByText("Add");
  }

  getTodoItem(i: number): TodoItem {
    const item = this.page.locator(`li:nth-child(${i})`).first();
    return new TodoItem(item);
  }

  async goto() {
    return this.page.goto(this.baseUrl + this.url);
  }
}

export class TodoItem {
  locator: Locator;
  constructor(item: Locator) {
    this.locator = item;
  }
  text() {
    return this.locator.locator(".text");
  }
  prio() {
    return this.locator.locator(`.prio`);
  }
  arrowRight() {
    return this.locator.locator("i:text('arrow_right')");
  }
  deleteButton() {
    return this.locator.locator("i:text('delete')");
  }
  doneIcon() {
    return this.locator.locator("i:text('done')");
  }
}
