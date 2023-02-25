#!/usr/bin/env node

import { spawn } from "child_process";
import { platform } from "os";
import * as url from "url";
import { createInterface } from "readline";
import { readFileSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const pack = JSON.parse(readFileSync(__dirname + "package.json"));
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cwd = process.cwd();

console.log(
  "\x1b[35m",
  `
Create Lit PWA \x1b[90m${pack.version}
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

const customElementPrefixQ =
  "\x1b[36m" +
  "?: " +
  "\x1b[90m" +
  "Enter custom element prefix (default: pwa): " +
  "\x1b[32m";

const pwaTitleDefault = url.parse(cwd).pathname.split("/").pop();
const appTitleQ =
  "\x1b[36m" +
  "?: " +
  "\x1b[90m" +
  `Enter pwa title (default: ${pwaTitleDefault}): ` +
  "\x1b[32m";
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
const pwaIdDefault = toKebabCase(pwaTitleDefault);

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

const clearDirMsg =
  "\x1b[36m" +
  "?: " +
  "\x1b[90m" +
  "Current directory is not empty, please clear it and try again";

const confirm = await readLineAsync(confirmQ, undefined, "yes");
if (confirm !== "yes") {
  console.log("\x1b[0m" + "Cancelling installation ...");
  process.exit();
}

const dir = await readdir(cwd);
if (dir.length > 0) {
  console.log(clearDirMsg);
  process.exit();
}

const pwaIdRegexp = /^(?:@[a-z0-9-][a-z0-9-_]*\/)?[a-z0-9-][a-z0-9-_]*$/;
let pwaId = await readLineAsync(appIdQ, pwaIdRegexp, pwaIdDefault);
while (pwaId === undefined) {
  pwaId = await readLineAsync(appIdQ, pwaIdRegexp, pwaIdDefault);
}

const pwaTitleRegex = /.+/;
let pwaTitle = await readLineAsync(appTitleQ, pwaTitleRegex, pwaTitleDefault);
while (pwaTitle === undefined) {
  pwaTitle = await readLineAsync(appTitleQ, pwaTitleRegex, pwaTitleDefault);
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
