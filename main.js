#!/usr/bin/env node
import { startPrompt } from "./src/prompt/start.js";
import { blue, gray, reset, yellow } from "./src/util/colors.js";
import { copyTemplate } from "./src/util/copyTemplate.js";

const answers = await startPrompt();

await copyTemplate(answers);

console.log(
  yellow +
    "Success! Use your package manager of choice to install dependencies: \n" +
    blue +
    "npm i \n" +
    gray +
    "or \n" +
    blue +
    "pnpm i" +
    gray +
    " (fastest) \n" +
    "or \n" +
    blue +
    "yarn \n"
);
console.log(
  yellow +
    "And then you can start development server using: \n" +
    blue +
    "npm start" +
    gray +
    " (for hot-reloading)\nor\n" +
    blue +
    "npm run serve" +
    gray +
    " (for offline testing, service worker testing and Lighthouse)" +
    reset
);
process.exit(0);
