const fs = require('fs');
let chalk;
try { 
    chalk = require('chalk'); 
} catch { 
    chalk = null; 
}

const summary = {
    domains: {
        happy: { passed: 0, failed: 0 },
        negative: { passed: 0, failed: 0, sub: {} },
        integrity: { passed: 0, failed: 0 },
        e2e: { passed: 0, failed: 0 }
    },

    addResult: (domain, passed, subdomain) => {
        if (!summary.domains[domain]) summary.domains[domain] = { passed: 0, failed: 0, sub: {} };
        
        if (subdomain) {
            summary.domains[domain].sub[subdomain] = summary.domains[domain].sub[subdomain] || { passed: 0, failed: 0 };
            summary.domains[domain].sub[subdomain][passed ? 'passed' : 'failed']++;
        } else {
            summary.domains[domain][passed ? 'passed' : 'failed']++;
        }
    },

    printSummary: () => {
        const colorLog = (text, colorFn = 'green') => {
            if (chalk && chalk[colorFn]) {
                console.log(chalk[colorFn](text));
            } else {
                console.log(text);
            }
        };

        console.log('--- TEST SUMMARY ---');
        for (const [domain, results] of Object.entries(summary.domains)) {
            colorLog(`${domain.toUpperCase()}: Passed: ${results.passed}, Failed: ${results.failed}`);

            if (results.sub && Object.keys(results.sub).length > 0) {
                for (const [sub, subResults] of Object.entries(results.sub)) {
                    colorLog(`  ${sub}: Passed: ${subResults.passed}, Failed: ${subResults.failed}`);
                }
            }
        }
    },

    exportJson: (filePath = './test-results/summary.json') => {
        try {
            if (!fs.existsSync('./test-results')) fs.mkdirSync('./test-results');
            fs.writeFileSync(filePath, JSON.stringify(summary, null, 2));
            console.log(`✅ Test summary exported to ${filePath}`);
        } catch (err) {
            console.error('❌ Failed to export test summary JSON:', err);
        }
    }
};

module.exports = summary;
