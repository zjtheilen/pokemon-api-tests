# Pokémon API Test Automation

[![Playwright Tests](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Current Stable Version:** `v1.1.4`  
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
