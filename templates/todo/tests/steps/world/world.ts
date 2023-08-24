import { IWorldOptions, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "playwright";
import { browserProm, contextProm } from "./browser";
import { TodoList } from "../../pageObjectModels/todoList";
import { AddTodo } from "../../pageObjectModels/addTodo";
import { ITodo } from "../../../src/context/todoContext";
import { EditTodo } from "../../pageObjectModels/editTodo";

export class TodoWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  pages: { TodoList: TodoList; AddTodo: AddTodo; EditTodo: EditTodo };

  #todos: ITodo[];
  get todos() {
    return this.#todos;
  }
  async setTodos(t: ITodo[]) {
    this.#todos = t;
    await this.page.addInitScript((todos: ITodo[]) => {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    }, this.todos);

    await this.page.reload();
  }

  constructor(options: IWorldOptions<unknown>) {
    super(options);
  }

  async init() {
    this.browser = await browserProm;
    this.context = await contextProm;
    this.page = await this.context.newPage();
    this.page.addInitScript(() => {
      navigator.serviceWorker.register("/service-worker.js");
    });

    this.pages = {
      TodoList: new TodoList(this.context, this.page),
      AddTodo: new AddTodo(this.context, this.page),
      EditTodo: new EditTodo(this.context, this.page),
    };

    await this.page.goto(this.pages.AddTodo.baseUrl);
  }
  async dispose() {
    this.page?.close();
  }
}
