import { playwrightLauncher } from "@web/test-runner-playwright";
import { esbuildPlugin } from "@web/dev-server-esbuild";
import { jasmineTestRunnerConfig } from "web-test-runner-jasmine";

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...jasmineTestRunnerConfig(),
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  nodeResolve: true,
  files: ["./src/**/*.spec.ts"],
  browsers: [playwrightLauncher({ product: "chromium" })],
  plugins: [
    esbuildPlugin({ ts: true, json: true, target: "auto", sourceMap: true }),
  ],
});
