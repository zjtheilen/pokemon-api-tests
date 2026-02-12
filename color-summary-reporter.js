const chalk = require('chalk');

class ColorSummaryReporter {
  constructor() {
    this.stats = {}; // accumulate results per category/tag
  }

  // called for each finished test
  onTestEnd(test, result) {
    const tagMatch = test.title.match(/@(\w+)/);
    const category = tagMatch ? tagMatch[1].toUpperCase() : 'OTHER';

    if (!this.stats[category]) this.stats[category] = { passed: 0, failed: 0 };

    if (result.status === 'passed') this.stats[category].passed += 1;
    else if (result.status === 'failed') this.stats[category].failed += 1;
  }

  // called once after all tests finish
  onEnd() {
    console.log('\n' + chalk.bold.cyan('--- TEST SUMMARY ---'));

    for (const [category, counts] of Object.entries(this.stats)) {
      const passed = counts.passed ? chalk.green(`Passed: ${counts.passed}`) : '';
      const failed = counts.failed ? chalk.red(`Failed: ${counts.failed}`) : '';
      const line = [passed, failed].filter(Boolean).join(', ');
      console.log(`${chalk.bold(category)}: ${line || chalk.yellow('No tests run')}`);
    }

    const totalPassed = Object.values(this.stats).reduce((sum, c) => sum + c.passed, 0);
    const totalFailed = Object.values(this.stats).reduce((sum, c) => sum + c.failed, 0);

    console.log(chalk.bold.cyan('--------------------'));
    console.log(
      chalk.bold.green(`✅ ${totalPassed} passed`) +
      (totalFailed ? `, ${chalk.red(`❌ ${totalFailed} failed`)}` : '') + '\n'
    );
  }
}

module.exports = ColorSummaryReporter;
