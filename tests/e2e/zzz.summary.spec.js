const { test } = require('@playwright/test');
const summary = require('../../helpers/testSummaryHelper');

test('Print aggregated summary', async () => {
    summary.printSummary();
});
