const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1440,
    viewportHeight: 850,
    baseUrl: 'https://qauto2.forstudy.space/',
  },
  env: {
    USER_EMAIL: 'Marcella_Skiles1@gmail.com',
    USER_PASSWORD: '12345Margo',
  },
});
