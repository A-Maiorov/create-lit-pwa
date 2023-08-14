import { playwrightLauncher } from "@web/test-runner-playwright";
import { esbuildPlugin } from "@web/dev-server-esbuild";
export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  testFramework: {
    config: {
      timeout: 5000,
    },
  },
  nodeResolve: true,
  files: ["./src/**/*.spec.ts"],
  browsers: [playwrightLauncher({ product: "chromium" })],
  plugins: [
    esbuildPlugin({
      ts: true,
      json: true,
      target: "auto",
      sourceMap: true,
    }),
  ],
});
