import { blue, gray, green } from "../util/colors.js";
import { currentDirName } from "../util/dir.js";
import { toKebabCase } from "../util/toKebabCase.js";

export const appIdDefault = toKebabCase(currentDirName);
export const appIdQ = `${blue}?:${gray} Enter pwa npm package name (default: ${appIdDefault}): ${green}`;
export const appIdRegexp = /^(?:@[a-z0-9-][a-z0-9-_]*\/)?[a-z0-9-][a-z0-9-_]*$/;
