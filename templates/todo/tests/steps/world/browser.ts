import { expect } from "@playwright/test";
import { chromium } from "playwright";
import { PageObjectBase } from "../../pageObjectModels/pageObjectBase";

expect.extend({
  toBeOpen(po: PageObjectBase) {
    const isOpen = po.isOpen();
    return {
      message: () => (isOpen ? "passed" : `${po.constructor.name} is not open`),
      pass: isOpen,
    };
  },
});

const envBrowserHeadless = process.env.BROWSER_HEADLESS;
export const browserProm = chromium.launch({
  headless: envBrowserHeadless !== "false",
});
export const contextProm = browserProm.then((b) => b.newContext());
