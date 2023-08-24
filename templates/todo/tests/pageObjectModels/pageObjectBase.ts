import { BrowserContext, Page } from "playwright";
import { expect } from "@playwright/test";
import { type Response } from "@playwright/test";

expect.extend({
  ToBeOpen(po: PageObjectBase) {
    return {
      message: po.isOpen() ? "passed" : `${po.constructor.name} is not open`,
      pass: po.isOpen(),
    };
  },
});

export abstract class PageObjectBase {
  context: BrowserContext;
  page: Page;

  baseUrl = "http://localhost:8000";

  constructor(context: BrowserContext, page: Page) {
    this.context = context;
    this.page = page;
  }

  abstract isOpen(): boolean;

  abstract url: string;

  abstract goto(queryParams?: Record<string, string>): Promise<Response>;
}
