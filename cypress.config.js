const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      USER_ID_2: process.env.USER_ID_2,
      USER_NAME_2: process.env.USER_NAME_2,
      USER_EMAIL_2: process.env.USER_EMAIL_2,
      USER_AVATAR_2: process.env.USER_AVATAR_2,
      USER_TOKEN_2: process.env.USER_TOKEN_2,
      USER_ID_1: process.env.USER_ID_1,
      USER_NAME_1: process.env.USER_NAME_1,
      USER_EMAIL_1: process.env.USER_EMAIL_1,
      USER_AVATAR_1: process.env.USER_AVATAR_1,
      USER_TOKEN_1: process.env.USER_TOKEN_1,
      WAS_ON_BOARDED: process.env.WAS_ON_BOARDED,
      IS_AUTHENTICATED: process.env.IS_AUTHENTICATED
    },
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
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
