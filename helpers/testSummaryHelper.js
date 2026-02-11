const summary = {
  domains: { happy: { passed: 0, failed: 0 }, negative: { passed: 0, failed: 0 }, integrity: { passed: 0, failed: 0 }, e2e: { passed: 0, failed: 0 } },

  addResult(domain, passed) {
    if (!this.domains[domain]) this.domains[domain] = { passed: 0, failed: 0 };
    passed ? this.domains[domain].passed++ : this.domains[domain].failed++;
  },

  printSummary() {
    console.log('--- TEST SUMMARY ---');
    for (const [domain, results] of Object.entries(this.domains)) {
      console.log(`${domain.toUpperCase()}: Passed: ${results.passed}, Failed: ${results.failed}`);
    }
  },
};

module.exports = summary;
