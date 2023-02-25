//@ts-check
import { context, build } from "esbuild";
import { exec } from "child_process";

// eslint-disable-next-line no-undef
const proc = process;

var args = proc.argv.slice(2);

const watch = args.includes("-w");
const open = args.includes("-o");

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
  entryPoints: ["src/app.ts"],
  outfile: `public/scripts/app.js`,
  plugins: [
    {
      name: "pwa-sw-builder",
      setup(currentBuild) {
        currentBuild.onEnd((result) => {
          if (result.errors.length === 0) {
            build(swOptions);
          }
        });
      },
    },
  ],
};

/**
 * @type import("esbuild").BuildOptions
 */
const swOptions = {
  ...commonOptions,
  tsconfig: "src/service-worker/tsconfig.json",
  entryPoints: ["src/service-worker/serviceWorker.ts"],
  outfile: `public/service-worker.js`,
  plugins: [
    {
      name: "env",
      setup(build) {
        const timestamp = new Date().getTime();
        // https://esbuild.github.io/plugins/#using-plugins
        build.onResolve({ filter: /^build$/ }, (args) => ({
          path: args.path,
          namespace: "build-ns",
        }));
        build.onLoad({ filter: /.*/, namespace: "build-ns" }, () => ({
          contents: JSON.stringify({ timestamp }),
          loader: "json",
        }));
        build.onEnd((result) => {
          if (result.errors.length === 0) {
            console.log("SW generated, timestamp: " + timestamp);
          }
        });
      },
    },
  ],
};

if (!watch) {
  await build(appOptions);
  proc.exit();
}

let buildCtx = await context(appOptions);

await buildCtx.watch();

// Create separate context to avoid rebuilding SW on each page refresh
// SW should be rebuilt only when source code is changed
//https://esbuild.github.io/api/#serve:~:text=But%20that%20means%20reloading%20after%20an%20edit%20may%20reload%20the%20old%20output%20files%20if%20the%20rebuild%20hasn%27t%20finished%20yet.
let serveCtx = await context({ ...appOptions, plugins: [] });
let { host, port } = await serveCtx.serve({
  servedir: "public",
  host: "localhost",
});

if (open) {
  const start =
    proc.platform == "darwin"
      ? "open"
      : proc.platform == "win32"
      ? "start"
      : "xdg-open";
  exec(start + " " + `http://${host}:${port}`);
}
