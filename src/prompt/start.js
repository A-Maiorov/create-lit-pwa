import { title } from "./title.js";
import { blue, gray, green, magenta, reset } from "../util/colors.js";
import { isCurrentDirEmpty } from "../util/dir.js";
import { clearDirMsg, confirmQ } from "./confirmCurrentDirectory.js";
import { appIdDefault, appIdQ, appIdRegexp } from "./appId.js";
import { appTitleDefault, appTitleQ, appTitleRegex } from "./appTitle.js";
import { ask, endPrompt } from "../util/ask.js";
import {
  customElementPrefixQ,
  customElementPrefixRegex,
} from "./customElementPrefix.js";
import { startSelectTemplatePrompt } from "./selectTemplate.js";

export async function startPrompt() {
  console.log(title);

  const confirmCurrentDirectory = await ask(confirmQ, undefined, "yes");
  if (confirmCurrentDirectory !== "yes") {
    console.log(reset + "Cancelling installation ...");
    process.exit();
  }

  if (!isCurrentDirEmpty) {
    console.log(clearDirMsg);
    process.exit();
  }

  let appId = await ask(appIdQ, appIdRegexp, appIdDefault);

  let appTitle = await ask(appTitleQ, appTitleRegex, appTitleDefault);

  let customElementPrefix = await ask(
    customElementPrefixQ,
    customElementPrefixRegex,
    "pwa"
  );

  endPrompt();

  const italic = `\x1B[3m`;
  console.log(magenta + "Available templates: " + reset);
  console.log(
    green +
      "Basic" +
      gray +
      " - PWA, 3 pages, simple router based on UrlPattern, few example components. Follows properties down, events up model: " +
      italic +
      "https://lit.dev/docs/composition/component-composition/#passing-data-up-and-down-the-tree" +
      reset
  );
  console.log(
    blue +
      "Todo " +
      gray +
      "- PWA todo app. Fully functional TODO application with Light and Dark themes, uses Context to manage data as described here: " +
      italic +
      "https://lit.dev/docs/data/context/" +
      reset
  );

  const templateName = await startSelectTemplatePrompt();

  return {
    confirmCurrentDirectory,
    appId,
    appTitle,
    customElementPrefix,
    templateName,
  };
}
