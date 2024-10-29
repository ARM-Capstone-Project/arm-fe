import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'rc6pr1',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
     
    },
    baseUrl: 'http://localhost:3000',  // Replace with the correct URL and port
  },
});
