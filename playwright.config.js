const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [
    ['list'],
    ['html'],
    ['./helpers/color-summary-reporter.js']
  ],
  use: {
    extraHTTPHeaders: { Accept: 'application/json' },
  },
});
