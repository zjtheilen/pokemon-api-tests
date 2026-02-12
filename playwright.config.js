const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [
    ['list'],
    ['html'],
    ['./color-summary-reporter.js'] // <- make sure path matches where you saved it
  ],
  use: {
    extraHTTPHeaders: { Accept: 'application/json' },
  },
});
