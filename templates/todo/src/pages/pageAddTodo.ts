import { TemplateResult, html } from "lit";
import { type IPage } from ".";
import { goTo } from "../context/routerContext";
import { pageTodoList } from "./pageTodoList";

export const pageAddTodoName = "addTodo";
export const pageAddTodo: IPage = {
  render: function (): TemplateResult {
    const goToList = () => goTo(pageTodoList.getUrl());

    return html`<litpwaelementprefixplaceholder-todo-editor
      @todo-edit-cancelled=${goToList}
    ></litpwaelementprefixplaceholder-todo-editor>`;
  },

  getUrl: () => {
    return "/add-todo";
  },
  urlPattern: "(add-todo*|/?)",
  title: "Add new todo",
};
