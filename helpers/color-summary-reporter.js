const chalk = require("chalk");

class ColorSummaryReporter {
  constructor() {
    this.stats = {};
  }

  onTestEnd(test, result) {
    // Combine all levels of titles (describe blocks + test name)
    const fullTitle = test.titlePath().join(" ");

    // Match first @tag
    const tagMatch = fullTitle.match(/@([A-Za-z0-9_]+)/);
    const category = tagMatch ? tagMatch[1].toUpperCase() : "OTHER";

    if (!this.stats[category]) this.stats[category] = { passed: 0, failed: 0 };

    if (result.status === "passed") this.stats[category].passed += 1;
    else if (result.status === "failed") this.stats[category].failed += 1;
  }

  onEnd() {
    console.log("\n--- TEST SUMMARY ---");

    // Sort categories for consistent output
    const categories = Object.keys(this.stats).sort();
    for (const category of categories) {
      const counts = this.stats[category];
      const passed = chalk.green(`${counts.passed} passed`);
      const failed =
        counts.failed > 0 ? chalk.red(`${counts.failed} failed`) : null;
      console.log(
        `${chalk.cyan(category)}: ${[passed, failed].filter(Boolean).join(", ")}`,
      );
    }

    console.log("--------------------\n");
  }
}

module.exports = ColorSummaryReporter;
