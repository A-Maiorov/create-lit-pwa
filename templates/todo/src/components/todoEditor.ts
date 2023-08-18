import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { roundedBlock, roundedButton } from "../theme/sharedStyles";
import {
  ctxTodo,
  ctxTodoActions,
  ICtxTodoActions,
  ITodo,
} from "../context/todoContext";
import { consume } from "@lit-labs/context";

@customElement("litpwaelementprefixplaceholder-todo-editor")
export class TodoEditor extends LitElement {
  @query("form[name=todo]")
  declare todoForm: HTMLFormElement | undefined;

  @property({ type: Number })
  declare todoId: number | undefined;

  @state()
  @consume({ context: ctxTodo, subscribe: true })
  private declare todos: ITodo[];

  @state()
  private declare todo: ITodo;

  @consume({ context: ctxTodoActions, subscribe: true })
  private declare todoActions: ICtxTodoActions;

  static styles = [
    roundedBlock,
    roundedButton,
    css`
      :host {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      .buttons {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
      .buttons > div {
        display: inline-flex;
      }
      .buttons > div > * {
        margin: 3px;
      }

      button.rounded-button {
        border: none;
        font-size: inherit;
        align-items: center;
        color: var(--main-color);
        padding: 10px;
        cursor: pointer;
      }
    `,
  ];

  protected render() {
    this.todo = this.todos?.find((x) => x.id === this.todoId) || {
      id: undefined,
      isDone: false,
      text: "",
    };
    return html`
      <form action="#" name="todo">
        <textarea
          class="rounded-block"
          name="text"
          rows="5"
          .value=${this.todo?.text || ""}
        >
        </textarea>
        <section class="buttons">
          <div>
            <button class="rounded-button" @click=${this.#saveTodo}>
              Save
            </button>
            <button class="rounded-button" @click=${this.#cancel}>
              Cancel
            </button>
          </div>
          <div>
            <button
              class="rounded-button"
              ?disabled=${!this.#canDelete}
              @click=${this.#deleteTodo}
            >
              Delete
            </button>

            <button
              class="rounded-button"
              ?disabled=${!this.#canComplete}
              @click=${this.#completeTodo}
            >
              Complete
            </button>
          </div>
        </section>
      </form>
    `;
  }
  get #canComplete() {
    return this.todo.id !== undefined && !this.todo.isDone;
  }

  get #canDelete() {
    return this.todo.id !== undefined;
  }

  #completeTodo(e: Event) {
    e.preventDefault();
    if (!this.todo) return;
    this.todo.isDone = true;
    this.todo.text = this.#getTodoText();
    this.todoActions.updateTodo(this.todo);
  }

  #getTodoText() {
    return new FormData(this.todoForm).get("text")?.toString().trim() || "";
  }

  #saveTodo(e: Event) {
    e.preventDefault();
    const text = this.#getTodoText();
    if (this.todo.id !== undefined) {
      this.todo.text = text;
      this.todoActions.updateTodo(this.todo);
    } else {
      this.todoActions.addTodo(text);
    }
  }

  #deleteTodo(e: Event) {
    e.preventDefault();
    this.todoActions.deleteTodo(this.todo.id);
  }

  #cancel(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("todo-edit-cancelled"));
  }
}
