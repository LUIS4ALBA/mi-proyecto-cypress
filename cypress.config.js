const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results', // Donde se guardarán los JSON temporales
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    experimentalSessionAndOrigin: true,
  },
  reporter:'mochawesome',//reporte html por defecto
  projectId: "xau8u2",
  // ...rest of the Cypress project config
})
