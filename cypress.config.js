const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1000,
  e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
      baseUrl: 'https://www.google.com/',
  },
    env: {
        currentStand: 'https://se.ifmo.ru',
        SCANNED_SPECS: 'cypress/e2e/custom-log-tests.js',
        LOCATORS: ['CLLoc.elem.task', 'CLLoc.elem.table']
    },
});
