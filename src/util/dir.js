import { readdir } from "fs/promises";
import path from "path";
import { cwd } from "process";
import * as url from "url";

const _cwd = cwd();
export const currentDirName = url
  .parse(_cwd)
  .pathname.split("/")
  .pop();
export const getTemplateRoot = (name) =>
  path.join(
    url.fileURLToPath(new URL(".", import.meta.url)),
    "../../templates/" + name
  );

export const rootDir = path.join(
  url.fileURLToPath(new URL(".", import.meta.url)),
  "../../"
);

export const isCurrentDirEmpty =
  (await readdir(_cwd)).length === 0;
