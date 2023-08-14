import { readFileSync } from "fs";
import { gray, magenta } from "../util/colors.js";
import { rootDir } from "../util/dir.js";

const pack = JSON.parse(
  readFileSync(rootDir + "package.json")
);
export const title = `
${magenta}Create Lit PWA ${gray}${pack.version}
`;
