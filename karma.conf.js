// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("karma-mocha-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {},
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/ng-testing-services"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
      check: {
        global: {
          statement: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
    reporters: ["mocha"],
    browsers: ["Chrome", "ChromeHeadless"],
    customLaunchers: {
      ChromeHeadLessCI: {
        base: "ChromeHeadLess",
        flags: ["--no-sandbox"],
      },
    },
    restartOnFileChange: true,
  });
};
