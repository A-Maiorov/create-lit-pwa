import { readFileSync } from "fs";
import { gray, magenta } from "../util/colors.js";
import { templateRoot } from "../util/dir.js";

const pack = JSON.parse(readFileSync(templateRoot + "package.json"));
export const title = `
${magenta}Create Lit PWA ${gray}${pack.version}
`;
