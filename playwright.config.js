const { defineConfig } = require('@playwright/test');

const config = {
    testDir: './tests',
    timeout: 30000,
    workers: 1, // run everything in a single Node process
    reporter: [['list'], ['html']],
     use: {
        extraHTTPHeaders: {
            'Accept': 'application/json',
        },
    },
};

module.exports = config;
