const chalk = require('chalk');

const domains = {
  happy: { passed: 0, failed: 0, sub: {} },
  negative: { passed: 0, failed: 0, sub: {} },
  integrity: { passed: 0, failed: 0, sub: {} },
  e2e: { passed: 0, failed: 0, sub: {} }
};

function addResult(domain, passed, subDomain) {
  if (!domains[domain]) {
    domains[domain] = { passed: 0, failed: 0, sub: {} };
  }

  if (subDomain) {
    if (!domains[domain].sub[subDomain]) {
      domains[domain].sub[subDomain] = { passed: 0, failed: 0 };
    }

    domains[domain].sub[subDomain][passed ? 'passed' : 'failed']++;
  } else {
    domains[domain][passed ? 'passed' : 'failed']++;
  }
}

function printSummary() {
  console.log(chalk.bold('\n--- TEST SUMMARY ---'));

  for (const [domain, results] of Object.entries(domains)) {
    let passed = results.passed;
    let failed = results.failed;

    if (Object.keys(results.sub).length > 0) {
      passed = 0;
      failed = 0;

      for (const subResults of Object.values(results.sub)) {
        passed += subResults.passed;
        failed += subResults.failed;
      }
    }

    const color = failed > 0 ? chalk.red : chalk.green;
    console.log(color(`${domain.toUpperCase()}: Passed: ${passed}, Failed: ${failed}`));

    for (const [sub, subResults] of Object.entries(results.sub)) {
      const subColor = subResults.failed > 0 ? chalk.red : chalk.green;
      console.log(`  ${sub}: Passed: ${subResults.passed}, Failed: ${subResults.failed}`);
    }
  }
}

function resetSummary() {
  for (const domain of Object.values(domains)) {
    domain.passed = 0;
    domain.failed = 0;
    domain.sub = {};
  }
}

module.exports = {
  addResult,
  printSummary,
  resetSummary
};
