const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    reporter: [['list'], ['html']],
    use: {
        extraHTTPHeaders: {
            'Accept': 'application/json',
        },
    },
    workers: 1
});
