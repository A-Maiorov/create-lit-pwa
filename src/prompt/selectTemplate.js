import * as readline from "readline";
import { blue, gray, green, magenta, reset } from "../util/colors.js";
const input = process.stdin;
const output = process.stdout;

export const templates = [
  { name: "Basic", color: green },
  { name: "Todo", color: blue },
];

const selectOption = {};

selectOption.selectIndex = 0;
selectOption.options = templates;
selectOption.selector = magenta + "=>" + reset;
selectOption.isFirstTimeShowMenu = true;

let resolveSelectPromptPromise = undefined;
const selectPromptPromise = new Promise((res) => {
  resolveSelectPromptPromise = res;
});

const keyPressedHandler = (_, key) => {
  if (key) {
    const optionLength = selectOption.options.length - 1;
    if (key.name === "down" && selectOption.selectIndex < optionLength) {
      selectOption.selectIndex += 1;
      selectOption.createOptionMenu();
    } else if (key.name === "up" && selectOption.selectIndex > 0) {
      selectOption.selectIndex -= 1;
      selectOption.createOptionMenu();
    } else if (key.name === "escape" || (key.name === "c" && key.ctrl)) {
      selectOption.close();
    } else if (key.name === "return") {
      selectOption.stop();
      resolveSelectPromptPromise(
        selectOption.options[selectOption.selectIndex].name.toLowerCase()
      );
    }
  }
};

const ansiEraseLines = (count) => {
  const ESC = "\u001B[";
  const eraseLine = ESC + "2K";
  const cursorUp = (count = 1) => ESC + count + "A";
  const cursorLeft = ESC + "G";

  let clear = "";

  for (let i = 0; i < count; i++) {
    clear += eraseLine + (i < count - 1 ? cursorUp() : "");
  }

  if (count) {
    clear += cursorLeft;
  }

  return clear;
};

export const startSelectTemplatePrompt = () => {
  const question = gray + "\nSelect template:" + reset;
  console.log(question);

  readline.emitKeypressEvents(input);
  selectOption.start();
  return selectPromptPromise;
};

selectOption.start = () => {
  input.setRawMode(true);
  input.resume();
  input.addListener("keypress", keyPressedHandler);

  if (selectOption.selectIndex >= 0) {
    selectOption.createOptionMenu();
  }
};

selectOption.close = () => {
  input.setRawMode(false);
  input.pause();
  process.exit(0);
};

selectOption.stop = () => {
  input.removeListener("keypress", keyPressedHandler);
};

selectOption.createOptionMenu = () => {
  const optionLength = selectOption.options.length;
  if (selectOption.isFirstTimeShowMenu) {
    selectOption.isFirstTimeShowMenu = false;
  } else {
    output.write(ansiEraseLines(optionLength + 1));
  }
  const paddingDeselected = "   ";
  const paddingSelected = "";
  const cursorColor = green + selectOption.selector + reset;

  for (let i = 0; i < optionLength; i++) {
    const selectedOption =
      i === selectOption.selectIndex
        ? `${paddingSelected}${cursorColor} ${writeOption(i)}`
        : paddingDeselected + writeOption(i);
    const ending = i !== optionLength - 1 ? "\n" : "";
    output.write(selectedOption + ending);
  }
  output.write("\n");
};

const writeOption = (i) => {
  return `${selectOption.options[i].color}${selectOption.options[i].name}${reset}`;
};
