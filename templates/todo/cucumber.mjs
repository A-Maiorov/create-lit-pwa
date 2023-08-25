const config = {
  paths: ["tests/features/**/*.feature"],
  //parallel: 8,
  require: ["tests/steps/**/*.ts"],
  requireModule: ["esbuild-register"],
  format: ["summary", "progress"],
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
