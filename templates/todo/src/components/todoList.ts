import { css, html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { iconCss, roundedBlock } from "../sharedStyles";
import { customElement, state } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { ICtxRoute, routeCtx } from "../routerController";
import {
  ctxTodo,
  ctxTodoActions,
  ICtxTodo,
  ICtxTodoActions,
  ITodo,
} from "../todoContext";

@customElement("litpwaelementprefixplaceholder-todo-list")
export class TodoList extends LitElement {
  static styles = [
    iconCss,
    roundedBlock,
    css`
      :host {
        display: block;
        margin-top: 10px;
      }
      li {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      li[data-status="done"] .text {
        text-decoration: line-through;
      }

      li[data-status="done"].rounded-block {
        background-color: var(--third-bg);
      }

      menu {
        list-style: none;
        padding: 0px;
        margin: 0px;
      }
      .text {
        width: 100%;
      }
      .prio {
        font-size: 40px;
        padding-right: 10px;
      }

      .icon {
        color: var(--third-color);
      }
    `,
  ];

  @state()
  @consume({ context: routeCtx, subscribe: true })
  declare router: ICtxRoute;

  @state()
  @consume({ context: ctxTodo, subscribe: true })
  declare allTodos: ICtxTodo | undefined;

  @consume({ context: ctxTodoActions, subscribe: true })
  declare todoActions: ICtxTodoActions;

  protected render() {
    return html` <menu>
      ${repeat(
        this.allTodos || [],
        (t) => t.id,
        this.#renderTodoItem.bind(this)
      )}
    </menu>`;
  }

  #renderTodoItem(todo: ITodo, index: number) {
    if (todo.isDone) return this.#renderCompletedItem(todo, index);
    return this.#renderActiveItem(todo, index);
  }

  #renderCompletedItem(todo: ITodo, index: number) {
    const deleteClickHandler = () => this.todoActions.deleteTodo(todo.id);
    return html` <li
      class="rounded-block"
      role="link"
      tabindex="0"
      data-status="done"
    >
      <div class="prio" @click=${deleteClickHandler}>
        <i class="icon">delete</i>
      </div>
      <div class="text">${index + 1}. ${todo.text}</div>
      <i class="icon"> done</i>
    </li>`;
  }
  #renderActiveItem(todo: ITodo, index: number) {
    const itemClickHandler = () => {
      this.router.goTo(`/edit-todo/${todo.id}`);
    };

    const itemKeypressHandler = (e: KeyboardEvent) => {
      if (e.type === "click" || e.key === "Enter") itemClickHandler();
    };

    return html` <li
      class="rounded-block"
      role="link"
      tabindex="0"
      data-status="todo"
      @click=${itemClickHandler}
      @keypress=${itemKeypressHandler}
    >
      <div class="prio">${index + 1}</div>
      <div class="text">${todo.text}</div>
      <i class="icon">arrow_right</i>
    </li>`;
  }
}
