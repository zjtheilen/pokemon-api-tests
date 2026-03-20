### README.md

# Pokémon API Test Automation

[![Playwright Tests](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Current Stable Version:** `v1.2.0-dev`  
See `CHANGELOG.md` for full version history.

---

## Overview

This project demonstrates **API test automation** using the public Pokémon API (https://pokeapi.co/) and Playwright Test (https://playwright.dev/docs/test-intro).

Tests are organized by domain tags to validate functionality, error handling, data integrity, and release stability.

---

## Test Domains

- `@happy` – Positive test cases  
- `@negative` – Invalid inputs and documented API quirks  
- `@integrity` – Cross-endpoint data validation  
- `@e2e` – End-to-end workflow validation  
- `@crud` – Lifecycle validation using JSONPlaceholder (auxiliary validation)

| Domain     | Purpose |
|------------|----------|
| @happy     | Positive lookups |
| @negative  | Invalid inputs & API behavior documentation |
| @integrity | Cross-endpoint data consistency |
| @e2e       | End-to-end validation |
| @crud      | API lifecycle validation (POST/PUT/DELETE) |

---

## Running Tests by Tag

```bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
npx playwright test --grep "@e2e"
npx playwright test --grep "@crud"
```

---

## Run Entire Suite

```bash
npx playwright test
```

---

---

## Running Postman / Newman Tests

This project includes a multi-step Postman collection (`pokemon-multistep-fixed.postman_collection.json`) that iterates through Pokémon IDs and fetches their species data. You can run it in Postman manually or via Newman in CI/CD.

---

### 1. Using Postman

1. Open Postman.
2. Import the collection: `postman/collections/pokemon-multistep-fixed.postman_collection.json`.
3. Import the environment: `postman/environments/dev.postman_environment.json`.
4. Set your Pokémon IDs in the environment variable `pokemon_ids` as a JSON array (e.g., `[1, 25, 150]`).
5. Start the collection run. Each Pokémon will be fetched, and the species request will run inline automatically.

### 2. Using Newman (CLI)

Ensure you have Newman installed globally or locally:

```bash
npm install -g newman newman-reporter-html
```

Run the collection:

```bash
newman run postman/collections/pokemon-multistep-fixed.postman_collection.json \
  -e postman/environments/dev.postman_environment.json \
  -r json \
  -r html
```

- `-r json` outputs a machine-readable summary (`newman-run-report.json` by default).
- `-r html` outputs a human-readable HTML report (`newman-run-report.html` by default).
- No `-r` tag will yield a command line output.

### Notes

- Make sure your `pokemon_ids` environment variable is set before running.
- Newman HTML reporting requires `newman-reporter-html` (see above install).
- You can integrate this into CI/CD pipelines to generate automated test reports.

---

## CI/CD

- GitHub Actions matrix testing (Node 20 & 22)
- HTML Playwright reports generated per run
- Domain-based summary aggregation
- Workflow fails only when actual test domains fail
- Versioned releases using Semantic Versioning (`MAJOR.MINOR.PATCH`)

---

## Project Goals

- Demonstrate structured API test design
- Showcase domain-based test organization
- Validate cross-endpoint data integrity
- Provide professional CI reporting
- Maintain semantic versioned releases
- Present a stable, recruiter-ready automation artifact

---

### Phase 1 Update (v1.2.0-dev)

- Multi-step Pokémon → Species requests in Postman
- Environment-driven iteration with `pokemon_ids`
- Inline species validations with automated assertions
- Logging Pokémon ID and species URL per iteration
- Ready for Newman JSON export