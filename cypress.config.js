const { defineConfig } = require("cypress");
const {runPlugin} = require("./src/index.js");

module.exports = defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1000,
    e2e: {
      setupNodeEvents(on, _) {
          on('before:run', (_) => {
              runPlugin();
          });
      },
      specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    },
    env: {
        CURRENT_STAND: 'https://se.ifmo.ru/',
        TESTS_DIRECTORY_PATH: 'C:/Users/Diosa/IdeaProjects/cypress-timeout-plugin/cypress/e2e',
        LOC_DIRECTORY_PATH: 'C:/Users/Diosa/IdeaProjects/cypress-timeout-plugin/cypress/spec',
    },
});
