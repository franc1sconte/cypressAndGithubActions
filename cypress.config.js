const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Determine the environment to load: use CYPRESS_ENV or default to 'staging'
      const envName = (process.env.CYPRESS_ENV || 'staging').toLowerCase();
      const envFile = path.join(__dirname, 'env', `${envName}.json`);

      if (fs.existsSync(envFile)) {
        try {
          const envData = JSON.parse(fs.readFileSync(envFile, 'utf8'));
          // Merge file variables into config.env
          config.env = Object.assign({}, config.env || {}, envData);

          // If baseUrl is present in env file, set Cypress baseUrl
          if (envData.baseUrl) {
            config.baseUrl = envData.baseUrl;
          }
        } catch (err) {
          // if parsing fails, log and continue with default config
          // eslint-disable-next-line no-console
          console.error(`Failed to parse environment file ${envFile}:`, err);
        }
      } else {
        // eslint-disable-next-line no-console
        console.warn(`Environment file not found: ${envFile}. Using default config.`);
      }

      return config;
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
