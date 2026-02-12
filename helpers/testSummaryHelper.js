const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

class Summary {
  constructor() {
    if (Summary.instance) return Summary.instance;

    this.results = {
      HAPPY: [],
      INTEGRITY: [],
      NEGATIVE: [],
      E2E: [],
      CRUD: [],
    };

    Summary.instance = this;
    return this;
  }

  addResult(category, passed, subcategory) {
    const key = category.toUpperCase();
    if (!this.results[key]) this.results[key] = [];

    this.results[key].push({ passed, subcategory: subcategory || "default" });
  }

  exportJson() {
    const outputPath = path.join(__dirname, "../test-summary.json");
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    console.log(chalk.green("✅ Test summary exported to"), outputPath);

    console.log("\n--- TEST SUMMARY ---");
    for (const [category, entries] of Object.entries(this.results)) {
      if (!entries.length) continue;

      const passedCount = entries.filter((e) => e.passed).length;
      const totalCount = entries.length;
      const categoryColor =
        passedCount === totalCount ? chalk.green : chalk.red;

      console.log(
        categoryColor(`${category}: ${passedCount} / ${totalCount} passed`),
      );

      const subcategories = {};
      for (const e of entries) {
        const subcat = e.subcategory || "default";
        if (!subcategories[subcat])
          subcategories[subcat] = { passed: 0, total: 0 };
        subcategories[subcat].total++;
        if (e.passed) subcategories[subcat].passed++;
      }

      for (const [subcat, counts] of Object.entries(subcategories)) {
        const subColor =
          counts.passed === counts.total ? chalk.green : chalk.red;
        console.log(
          `  ${subColor(`${subcat}: ${counts.passed} / ${counts.total} passed`)}`,
        );
      }

      console.log("--------------------");
    }
  }
}

module.exports = new Summary();
