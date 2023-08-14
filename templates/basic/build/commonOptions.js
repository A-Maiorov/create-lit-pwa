/**
 *
 * @param {boolean} minify
 * @param {boolean} sourcemap
 * @returns {import("esbuild").BuildOptions}
 */
export function getCommonOptions(minify, sourcemap) {
  return {
    bundle: true,
    minify,
    minifyWhitespace: minify,
    minifySyntax: minify,
    sourcemap,
    target: ["es2020", "chrome89", "firefox90", "safari14"],
    platform: "browser",
    format: "esm",
  };
}
