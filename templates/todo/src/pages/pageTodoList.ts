import { TemplateResult, html } from "lit";
import { type IPage } from ".";
export const pageTodoListName = "todoList";
export const pageTodoList: IPage = {
  render: function (): TemplateResult {
    return html`<litpwaelementprefixplaceholder-todo-list></litpwaelementprefixplaceholder-todo-list>`;
  },
  getUrl: () => {
    return "/";
  },
  urlPattern: "(|/?)",
  title: "Todo:",
};
