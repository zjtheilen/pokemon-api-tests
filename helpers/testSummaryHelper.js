const fs = require('fs');
const chalk = require('chalk');

const summary = {
    domains: {
        happy: { passed: 0, failed: 0 },
        negative: { passed: 0, failed: 0, sub: {} },
        integrity: { passed: 0, failed: 0 },
        e2e: { passed: 0, failed: 0 }
    },
    addResult: (domain, passed, subDomain) => {
        if (!summary.domains[domain]) summary.domains[domain] = { passed: 0, failed: 0, sub: {} };
        if (subDomain) {
            summary.domains[domain].sub[subDomain] = summary.domains[domain].sub[subDomain] || { passed: 0, failed: 0 };
            summary.domains[domain].sub[subDomain][passed ? 'passed' : 'failed']++;
        } else {
            summary.domains[domain][passed ? 'passed' : 'failed']++;
        }
    },
    printSummary: () => {
        const chalk = require('chalk');

        console.log(chalk.bold('\n--- TEST SUMMARY ---'));

        for (const [domain, results] of Object.entries(summary.domains)) {
            let passed = results.passed;
            let failed = results.failed;

            if (results.sub && Object.keys(results.sub).length > 0) {
                passed = 0;
                failed = 0;
                for (const subResults of Object.values(results.sub)) {
                    passed += subResults.passed;
                    failed += subResults.failed;
                }
            }

            const color = failed > 0 ? chalk.red : chalk.green;
            console.log(color(`${domain.toUpperCase()}: Passed: ${passed}, Failed: ${failed}`));

            if (results.sub && Object.keys(results.sub).length > 0) {
                for (const [sub, subResults] of Object.entries(results.sub)) {
                    const subColor = subResults.failed > 0 ? chalk.red : chalk.green;
                    console.log(`  ${sub}: Passed: ${subResults.passed}, Failed: ${subResults.failed}`);
                }
            }
        }
    },
    exportJson: (filePath = './test-results/summary.json') => {
        try {
            const fs = require('fs');

            if (!fs.existsSync('./test-results')) fs.mkdirSync('./test-results');

            const exportSummary = JSON.parse(JSON.stringify(summary));

            for (const [domain, results] of Object.entries(exportSummary.domains)) {
                if (results.sub && Object.keys(results.sub).length > 0) {
                    let totalPassed = 0;
                    let totalFailed = 0;
                    for (const subResults of Object.values(results.sub)) {
                        totalPassed += subResults.passed;
                        totalFailed += subResults.failed;
                    }
                    results.passed = totalPassed;
                    results.failed = totalFailed;

                    results.sub.Aggregate = { passed: totalPassed, failed: totalFailed };
                }
            }

            fs.writeFileSync(filePath, JSON.stringify(exportSummary, null, 2));
            console.log(`✅ Test summary exported to ${filePath}`);
        } catch (err) {
            console.error('❌ Failed to export test summary JSON:', err);
        }
    }

};

module.exports = summary;
