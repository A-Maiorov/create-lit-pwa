import { PageObjectBase } from "./pageObjectBase";

export class EditTodo extends PageObjectBase {
  isOpen() {
    return this.page.url().includes(this.url) || false;
  }
  url = "/edit-todo/";
  async goto(params: { todoId: string }) {
    return this.page.goto(this.baseUrl + this.url + params.todoId);
  }

  saveButton() {
    return this.page.locator("button:text('save')");
  }
  cancelButton() {
    return this.page.locator("button:text('cancel')");
  }
  deleteButton() {
    return this.page.locator("button:text('delete')");
  }
  completeButton() {
    return this.page.locator("button:text('complete')");
  }
}
