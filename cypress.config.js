const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 60000,
  viewportWidth: 1728,
  viewportHeight: 912,
  apiLoginUrl: 'http://dew1lxmttdev02.dni.dev.internal:8443/swing/login',
  createPostAPIUrl:
    'http://dew1lxmttdev02.dni.dev.internal:8443/swing/api/rest/v3/object/story/from/template/path?path=/SysConfig/Common/Templates/General/Story.xml&token=',
  updatePostAPIUrl:
    'http://dew1lxmttdev02.dni.dev.internal:8443/swing/api/rest/object/story?token=',
  chromeWebSecurity: false,
  modifyObstructiveCode: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://dew1lxmttdev02.dni.dev.internal:8443/swing/app/swing.html',
    excludeSpecPattern: ['*.js', '*.md'],
    specPattern: 'cypress/integration/**/*.{feature,features}',
  },
})
