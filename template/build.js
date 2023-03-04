//@ts-check
import { context, build } from "esbuild";
import { exec } from "child_process";

// eslint-disable-next-line no-undef
const proc = process;

var args = proc.argv.slice(2);

const watch = args.includes("-w");
const open = args.includes("-o");
const serviceWorker = args.includes("-sw");
const hotReload = watch && !serviceWorker;

if (serviceWorker && watch) {
  console.warn("Hot reload is disabled due to service worker");
}

const regHotReload = () => {
  new EventSource("/esbuild").addEventListener("change", () => {
    location.reload();
  });
};

/**
 * @type import("esbuild").BuildOptions
 */
const commonOptions = {
  bundle: true,
  minify: !watch,
  minifyWhitespace: !watch,
  minifySyntax: !watch,
  sourcemap: watch,
  target: ["es2020", "chrome89", "firefox90", "safari14"],
  platform: "browser",
  format: "esm",
};
/**
 * @type import("esbuild").BuildOptions
 */
const appOptions = {
  ...commonOptions,
  logLevel: "info",
  outdir: "public/scripts",
  entryPoints: ["src/app.ts", "src/polyfills/urlpatternPolyfill.ts"], //Create separate bundles for polyfills
  external: ["/scripts/polyfills/urlpatternPolyfill.js"], //Make sure that polyfills are not bundled with app.js (see: /src/polyfills/polyfillsLoader.ts)
  footer: { js: hotReload ? `(${regHotReload.toString()})();` : "" },
  plugins: serviceWorker
    ? [
        {
          name: "pwa-sw-builder",
          setup(currentBuild) {
            currentBuild.onEnd((result) => {
              if (result.errors.length === 0) {
                const swTimestamp = new Date().getTime();
                build(getSwBuildOptions(swTimestamp)).then(() => {
                  console.log("SW generated, timestamp: " + swTimestamp);
                });
              }
            });
          },
        },
      ]
    : [],
};

function getSwBuildOptions(timestamp) {
  /**
   * @type import("esbuild").BuildOptions
   */
  return {
    ...commonOptions,
    tsconfig: "src/service-worker/tsconfig.json",
    entryPoints: [
      serviceWorker
        ? "src/service-worker/serviceWorker.ts"
        : "src/service-worker/devWorker.ts",
    ],
    outfile: `public/service-worker.js`,
    banner: { js: `const timestamp = ${timestamp};` },
  };
}

if (!watch) {
  await build(appOptions);
  proc.exit();
}

let buildCtx = await context(appOptions);

await buildCtx.watch();

const serveOptions = {
  servedir: "public",
  host: "localhost",
};
let serveResult;

if (!hotReload && serviceWorker) {
  // Create separate context to avoid rebuilding SW on each page refresh
  // SW should be rebuilt only when source code is changed
  let serveCtx = await context({ ...appOptions, plugins: [] });
  serveResult = await serveCtx.serve(serveOptions);
} else {
  build(getSwBuildOptions()); // in this case we just need to replace existing SW with Dev SW
  serveResult = await buildCtx.serve(serveOptions);
}

if (open) {
  const start =
    proc.platform == "darwin"
      ? "open"
      : proc.platform == "win32"
      ? "start"
      : "xdg-open";
  exec(start + " " + `http://${serveResult.host}:${serveResult.port}`);
}
