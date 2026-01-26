const { test } = require('@playwright/test');
const summary = require('../../helpers/testSummaryHelper');

test.describe('Pokemon E2E Test', () => {
    test.beforeAll(() => {
    })

    test.afterAll(() => {
        summary.printSummary();
    });

    test('print aggregated summary', () => { });
});
