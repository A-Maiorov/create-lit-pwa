import { type TemplateResult } from "lit";
import { type ICtxRoute } from "../context/routerContext";
import { pageTodoListName, pageTodoList } from "./pageTodoList";
import { pageAddTodo, pageAddTodoName } from "./pageAddTodo";
import { pageEditTodo, pageEditTodoName } from "./pageEditTodo";
import { pageNotFound, pageNotFoundName } from "./pageNotFound";

export interface IPage {
  render: (tplRes: URLPatternResult) => TemplateResult;
  getUrl(...args: unknown[]): string;
  /**
   * UrlPattern Api: https://developer.mozilla.org/en-US/docs/Web/API/URLPattern
   * Pattern syntax: https://github.com/pillarjs/path-to-regexp
   */
  urlPattern: string;
  title: string;
}

export const pages = {
  [pageTodoListName]: pageTodoList,
  [pageAddTodoName]: pageAddTodo,
  [pageEditTodoName]: pageEditTodo,
  [pageNotFoundName]: pageNotFound,
};

export const pagePatterns = Object.entries(pages).map((e) => ({
  name: e[0],
  pattern: e[1].urlPattern,
}));

const _pageTitles: Record<string, string> = {};
for (const key in pages) _pageTitles[key] = pages[key as PageName].title;
export const pageTitles = _pageTitles;

export type PageName = keyof typeof pages;

export function renderCurrentPage(ctx: ICtxRoute | undefined) {
  return ctx === undefined
    ? ""
    : (pages[ctx.activeRoute.name as PageName] ?? pageNotFound).render(
        ctx.patternResult
      );
}
