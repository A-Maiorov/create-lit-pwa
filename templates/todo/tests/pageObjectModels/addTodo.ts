import { PageObjectBase } from "./pageObjectBase";

export class AddTodo extends PageObjectBase {
  isOpen() {
    return this.page.url().endsWith(this.url) || false;
  }

  url = "/add-todo";

  async goto() {
    return this.page.goto(this.url);
  }
}
