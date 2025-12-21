const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1440,
    viewportHeight: 850,
    baseUrl: 'https://qauto.forstudy.space/',
  },
  env: {
    USER_EMAIL: 'Marcella_Skiles@gmail.com',
    USER_PASSWORD: '12345Margo',
  },
});
