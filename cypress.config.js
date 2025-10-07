const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
  embeddedScreenshots: true,
  video: false,
  reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportpagetitle: "Reporte",
      embeddedScreenshots: true,
      inlineAssets: true,
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: false,
    }
});
