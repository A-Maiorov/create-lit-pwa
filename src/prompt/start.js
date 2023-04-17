import { title } from "./title.js";
import { reset } from "../util/colors.js";
import { isCurrentDirEmpty } from "../util/dir.js";
import { clearDirMsg, confirmQ } from "./confirmCurrentDirectory.js";
import { appIdDefault, appIdQ, appIdRegexp } from "./appId.js";
import { appTitleDefault, appTitleQ, appTitleRegex } from "./appTitle.js";
import { ask, endPrompt } from "../util/ask.js";
import {
  customElementPrefixQ,
  customElementPrefixRegex,
} from "./customElementPrefix.js";

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

  return {
    confirmCurrentDirectory,
    appId,
    appTitle,
    customElementPrefix,
  };
}
