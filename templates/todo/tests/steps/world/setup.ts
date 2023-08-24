import {
  After,
  AfterAll,
  Before,
  setWorldConstructor,
} from "@cucumber/cucumber";
import { TodoWorld } from "./world";
import { browserProm, contextProm } from "./browser";

setWorldConstructor(TodoWorld);

Before(async function (
  this: TodoWorld
  //scenario: ITestCaseHookParameter
) {
  await this.init();
});
After(async function (
  this: TodoWorld
  // scenario: ITestCaseHookParameter
) {
  await this.dispose();
});

AfterAll(async () => {
  await (await contextProm).close();
  await (await browserProm).close();
});
