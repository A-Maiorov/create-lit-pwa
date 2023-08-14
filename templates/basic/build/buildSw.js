//@ts-check
import { build } from "esbuild";
import { getCommonOptions } from "./commonOptions.js";
import { createHash } from "crypto";
import { PRECACHE_URLS } from "./precacheUrls.js";
import { readFileSync } from "fs";
import * as url from "url";
import * as path from "path";
// eslint-disable-next-line no-undef
const proc = process;

var xx = proc.cwd();

var args = proc.argv.slice(2);

const dev = args.includes("-dev");
const prod = !dev;

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const baseUrl = path.join(__dirname, "../public/");

function getHash(file) {
  const buff = readFileSync(path.join(baseUrl, file));
  return createHash("md5").update(buff).digest("hex");
}

const filesHashes = PRECACHE_URLS.map((url) => ({ url, hash: getHash(url) }));

/**
 * @type import("esbuild").BuildOptions
 */
const options = {
  ...getCommonOptions(!dev, true), //!prod),
  tsconfig: "src/service-worker/tsconfig.json",
  logLevel: "info",
  entryPoints: [
    prod
      ? "src/service-worker/serviceWorker.ts"
      : "src/service-worker/devWorker.ts",
  ],
  outfile: `public/service-worker.js`,
  banner: { js: `const filesHashes = ${JSON.stringify(filesHashes)};` },
};

await build(options);
