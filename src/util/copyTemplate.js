import {
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "fs/promises";
import { resolve, sep } from "path";
import { getTemplateRoot } from "./dir.js";

const skip = [".DS_Store"];

async function* getFiles(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  for (const item of items) {
    if (skip.includes(item.name)) continue;
    const res = resolve(dir, item.name);
    if (item.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const appPath = process.cwd();
const titlePlaceholder = /litpwatitleplaceholder/gi;
const packageNamePlaceholder =
  /litpwapackagenameplaceholder/gi;
const elementPrefixPlaceholder =
  /litpwaelementprefixplaceholder/gi;

/**
 * Replace placeholders and copy template
 * @param {{ confirmCurrentDirectory: boolean, appId: string, appTitle: string, customElementPrefix: string, templateName: string }} answers
 */
export async function copyTemplate(answers) {
  const tplPath = getTemplateRoot(answers.templateName);

  const patchSettings = [
    {
      placeholder: titlePlaceholder,
      value: answers.appTitle,
    },
    {
      placeholder: packageNamePlaceholder,
      value: answers.appId,
    },
    {
      placeholder: elementPrefixPlaceholder,
      value: answers.customElementPrefix,
    },
  ];
  for await (const f of getFiles(tplPath)) {
    await patchAndCopy(f, patchSettings, tplPath);
  }
}

/**
 *
 * @param {string} file
 * @param {{placeholder: string, value: string}} patchSettings
 * @returns
 */
async function patchAndCopy(file, patchSettings, tplPath) {
  const newFilePath = file.replace(tplPath, appPath);
  const parts = newFilePath.split(sep);
  const fileName = parts.pop();
  const directory = parts.join(sep);

  const isText =
    file.endsWith("html") ||
    file.endsWith("js") ||
    file.endsWith("ts") ||
    file.endsWith("json") ||
    file.endsWith("md");

  let fileContent = await readFile(
    file,
    isText ? "utf-8" : undefined
  );

  if (isText)
    for (const patch of patchSettings)
      fileContent = fileContent.replace(
        patch.placeholder,
        patch.value
      );

  await mkdir(directory, { recursive: true });

  await writeFile(newFilePath, fileContent, {
    encoding: isText ? "utf-8" : undefined,
  });
  return newFilePath;
}
