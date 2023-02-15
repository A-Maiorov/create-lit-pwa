//@ts-check

import { context, build } from "esbuild";
import { exec } from "child_process";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-undef
var args = process.argv.slice(2);

const watch = args.includes("-w");
const open = args.includes("-o");

/**
 * @type import("esbuild").BuildOptions
 */
const options = {
  entryPoints: ["src/app.ts"],
  bundle: true,
  minify: true,
  minifyWhitespace: true,
  minifySyntax: true,
  sourcemap: true,
  outfile: `public/scripts/app.js`,
  target: "es2020",
  platform: "browser",
  format: "esm",
  plugins: [
    {
      name: "build-logger",
      setup(build) {
        build.onEnd((result) => {
          if (result.errors.length === 0) console.log("Success");
        });
      },
    },
  ],
};

if (!watch) {
  await build(options);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-undef
  process.exit();
}

let ctx = await context(options);

await ctx.watch();

let { host, port } = await ctx.serve({
  servedir: "public",
  host: "localhost",
});
console.log(`Listen on ${host}:${port}`);

if (open) {
  var start =
    process.platform == "darwin"
      ? "open"
      : process.platform == "win32"
      ? "start"
      : "xdg-open";
  exec(start + " " + `http://${host}:${port}`);
}
