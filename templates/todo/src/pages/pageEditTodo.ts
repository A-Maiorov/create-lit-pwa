import { TemplateResult, html } from "lit";
import { type IPage } from ".";
import { goTo } from "../context/routerContext";
import { pageTodoList } from "./pageTodoList";
import { pageNotFound } from "./pageNotFound";
export const pageEditTodoName = "editTodo";
export const pageEditTodo: IPage = {
  render: function (pattern): TemplateResult {
    const goToList = () => goTo(pageTodoList.getUrl());
    const id = parseInt(pattern.pathname.groups.id);

    if (!isNaN(id))
      return html`<litpwaelementprefixplaceholder-todo-editor
        @todo-edit-cancelled=${goToList}
        .todoId=${id}
      ></litpwaelementprefixplaceholder-todo-editor>`;

    return pageNotFound.render(pattern);
  },

  getUrl: (id: number) => {
    return "/edit-todo/" + id;
  },
  urlPattern: "edit-todo/:id(\\d+)",
  title: "Edit todo",
};
