const summary = {
    passed: 0,
    failed: 0,
    addResult: (passed) => {
        if (passed) summary.passed++;
        else summary.failed++;
    },
    printSummary: () => {
        console.log('--- TEST SUMMARY ---');
        console.log(`Passed: ${summary.passed}`);
        console.log(`Failed: ${summary.failed}`);
    }
};

module.exports = summary;
