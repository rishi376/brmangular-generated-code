import { defineConfig } from 'cypress';

export const defaultConfig = {
  video: false,
  fixturesFolder: 'src/test/javascript/cypress/fixtures',
  screenshotsFolder: 'target/cypress/screenshots',
  downloadsFolder: 'target/cypress/downloads',
  videosFolder: 'target/cypress/videos',
  chromeWebSecurity: false,
  viewportWidth: 1200,
  viewportHeight: 720,
  retries: 2,
  env: {
    authenticationUrl: '/api/authenticate',
    jwtStorageName: 'jhi-authenticationToken'
  },
  e2e: {
    baseUrl: 'http://localhost:4200/',
    async setupNodeEvents(on, config) {
      return (await import('./src/test/javascript/cypress/plugins/index')).default(on, config);
    },
    supportFile: 'src/test/javascript/cypress/support/index.ts',
    specPattern: 'src/test/javascript/cypress/integration/**/*.cy.ts'
  }
};

export default defineConfig(defaultConfig);
