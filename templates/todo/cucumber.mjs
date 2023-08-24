const config = {
  paths: ["tests/features/**/*.feature"],
  //parallel: 2,
  require: ["tests/steps/**/*.ts"],
  requireModule: ["esbuild-register"],
  format: ["summary", "progress-bar"],
  formatOptions: { snippetInterface: "async-await" },

  //publishQuiet: true,
};
export default {
  ...config,
};

export const ci = {
  ...config,
  format: ["html:cucumber-report.html"],
  publish: true,
};
