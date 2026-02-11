const { test } = require('@playwright/test');
const summary = require('../../helpers/testSummaryHelper');

test.describe('Pokemon E2E Test', () => {
    test.afterAll(() => {
        summary.printSummary();
        summary.exportJson();
    });

    test('print aggregated summary', () => { });
});
