#!/usr/bin/env node

import { spawn } from "child_process";
import { platform } from "os";
import * as url from "url";
import { createInterface } from "readline";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "\x1b[35m",
  `
Create Lit PWA
`
);

const readLineAsync = (msg, validationRegex, defaultResponse) => {
  return new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      if (defaultResponse && userRes === "") {
        resolve(defaultResponse);
        return;
      }
      if (!validationRegex) {
        resolve(userRes);
        return;
      }
      if (userRes.match(validationRegex)) {
        resolve(userRes);
        return;
      }
      readline.write(
        "\x1b[33m" +
          "Input does not match " +
          "\x1b[90m" +
          validationRegex +
          "\x1b[33m" +
          " try again \x1b[32m\n\r"
      );
      resolve(undefined);
    });
  });
};

const appTitleQ =
  "\x1b[36m" + "?: " + "\x1b[90m" + "Enter pwa title: " + "\x1b[32m";
const customElementPrefixQ =
  "\x1b[36m" +
  "?: " +
  "\x1b[90m" +
  "Enter custom element prefix (default: pwa): " +
  "\x1b[32m";

const pwaIdDefault = url
  .parse(process.cwd())
  .pathname.split("/")
  .pop()
  .toLocaleLowerCase();

const appIdQ =
  "\x1b[36m" +
  "?: " +
  "\x1b[90m" +
  `Enter pwa npm package name (default: ${pwaIdDefault}): ` +
  "\x1b[32m";

const templateRoot = __dirname;

const confirmQ =
  "\x1b[36m" +
  "?: " +
  "\x1b[90m" +
  "Lit PWA template will be installed in current directory (default: yes)" +
  "\x1b[32m";

const confirm = await readLineAsync(confirmQ, undefined, "yes");
if (confirm !== "yes") {
  console.log("\x1b[0m" + "Cancelling installation ...");
  process.exit();
}

const pwaIdRegexp = /^(?:@[a-z0-9-][a-z0-9-_]*\/)?[a-z0-9-][a-z0-9-_]*$/;
let pwaId = await readLineAsync(appIdQ, pwaIdRegexp, pwaIdDefault);
while (pwaId === undefined) {
  pwaId = await readLineAsync(appIdQ, pwaIdRegexp, pwaIdDefault);
}

const pwaTitleRegex = /.+/;
let pwaTitle = await readLineAsync(appTitleQ, pwaTitleRegex);
while (pwaTitle === undefined) {
  pwaTitle = await readLineAsync(appTitleQ, pwaTitleRegex);
}

const customElementPrefixRegex = /^[a-z]{0,10}$/;
let customElementPrefix = await readLineAsync(
  customElementPrefixQ,
  customElementPrefixRegex,
  "pwa"
);
while (customElementPrefix === undefined) {
  customElementPrefix = await readLineAsync(
    customElementPrefixQ,
    customElementPrefixRegex,
    "pwa"
  );
}

readline.close();

let args = [templateRoot, pwaTitle, customElementPrefix, pwaId];

let cmd = "";
if (/^win/.test(platform)) {
  cmd = `powershell`;
  args = [
    "-ExecutionPolicy",
    "bypass",
    "-File",
    `${__dirname}init.ps1`,
    ...args,
  ];
} else {
  cmd = `${__dirname}init.sh`;
}

spawn(cmd, args, { stdio: "inherit" }).on("exit", (code) => {
  if (!code) {
    console.log(
      "\x1b[0m" +
        "Success! Now you can start development server by typing: " +
        "\x1b[36m" +
        "npm start" +
        "\x1b[0m"
    );
  }
  process.exit(code);
});
