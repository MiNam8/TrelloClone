import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Adjust if your dev server uses a different port
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    supportFile: 'cypress/support/e2e.ts',
  },
}); 