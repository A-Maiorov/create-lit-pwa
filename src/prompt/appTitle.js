import { blue, gray, green } from "../util/colors.js";
import { currentDirName } from "../util/dir.js";

const cwd = currentDirName;
export const appTitleDefault = cwd;
export const appTitleQ = `${blue}?:${gray} Enter pwa title (default: ${cwd}): ${green}`;
export const appTitleRegex = /.+/;
