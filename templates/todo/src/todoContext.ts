import { createContext, provide } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const storageKey = "todos";

function save(todos: ITodo[]) {
  localStorage.setItem(storageKey, JSON.stringify(todos));
}
function load() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]") as ITodo[];
}

export interface ITodo {
  id: number;
  isDone: boolean;
  text: string;
}

export type ICtxTodo = ITodo[];
export interface ICtxTodoActions {
  addTodo(todoText: string): void;
  deleteTodo(id: number): void;
  updateTodo(todo: ITodo): void;
}

export const ctxTodoActions = createContext<ICtxTodoActions>(
  Symbol("ctxTodoActions")
);
export const ctxTodo = createContext<ICtxTodo>(Symbol("ctxTodo"));

@customElement("litpwaelementprefixplaceholder-todo-ctx")
export class TodoContext extends LitElement {
  constructor() {
    super();
    this.todos = load();
    this.todoActions = {
      addTodo: (text) => {
        const id = new Date().getTime();
        this.todos.push({
          id,
          text,
          isDone: false,
        });
        save(this.todos);
        // In order to trigger an update we need either reassign property or use requestUpdate()
        // this.todos = [
        //   ...this.todos,
        //   {
        //     id,
        //     text,
        //     isDone: false,
        //   },
        // ];
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent("todo-added", { detail: { id } }));
      },
      deleteTodo: (id) => {
        const index = this.todos.findIndex((x) => x.id === id);
        this.todos.splice(index, 1);
        save(this.todos);
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent("todo-deleted", { detail: { id } }));
      },
      updateTodo: (todo) => {
        this.todos[todo.id] = todo;
        save(this.todos);
        this.requestUpdate();
        this.dispatchEvent(
          new CustomEvent("todo-updated", { detail: { id: todo.id } })
        );
      },
    };
  }
  @provide({ context: ctxTodo })
  @property({ attribute: false })
  declare todos: ICtxTodo;

  @provide({ context: ctxTodoActions })
  declare todoActions: ICtxTodoActions;

  render() {
    return html`<slot></slot>`;
  }
}
