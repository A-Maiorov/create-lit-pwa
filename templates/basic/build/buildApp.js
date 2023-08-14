//@ts-check
import { context, build } from "esbuild";
import { exec } from "child_process";
import { getCommonOptions } from "./commonOptions.js";

// eslint-disable-next-line no-undef
const proc = process;

var args = proc.argv.slice(2);

const dev = args.includes("-dev");
const prod = !dev;
const serve = args.includes("-serve");

const regHotReload = () => {
  new EventSource("/esbuild").addEventListener("change", () => {
    location.reload();
  });
};

/**
 * @type import("esbuild").BuildOptions
 */
const appOptions = {
  ...getCommonOptions(!dev, !prod),
  logLevel: "info",
  outdir: "public/scripts",
  entryPoints: ["src/app.ts", "src/polyfills/urlpatternPolyfill.ts"], //Create separate bundles for polyfills
  external: ["/scripts/polyfills/urlpatternPolyfill.js"], //Make sure that polyfills are not bundled with app.js (see: /src/polyfills/polyfillsLoader.ts)
  footer: { js: dev ? `(${regHotReload.toString()})();` : "" },
};

if (!serve) {
  await build(appOptions);
  proc.exit(0);
}

const serveOptions = {
  servedir: "public",
  host: "localhost",
};
let buildCtx = await context(appOptions);
if (dev) {
  await buildCtx.watch();
}
let serveResult = await buildCtx.serve(serveOptions);

const start =
  proc.platform == "darwin"
    ? "open"
    : proc.platform == "win32"
    ? "start"
    : "xdg-open";
exec(start + " " + `http://${serveResult.host}:${serveResult.port}`);
