# Pokémon API Test Automation

[![Playwright Tests](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Current Stable Version:** `v1.0.0`  
See `CHANGELOG.md` for version history and planned releases.

---

## Overview

This project demonstrates **API test automation** using the public [Pokémon API](https://pokeapi.co/) and [Playwright Test](https://playwright.dev/docs/test-intro).  
Tests are organized into **phases** and **tags** to progressively validate functionality, error handling, data integrity, and release quality.

- **Tags for targeted tests:**
  - `@happy` – Positive test cases
  - `@negative` – Invalid inputs and edge cases
  - `@integrity` – Data consistency and nested schema validation
  - `@e2e` – End-to-end testing

| Domain | Tests | Purpose |
| ---------|-------|---------- |
| @happy | 7 | Positive lookups |
| @negative | 8 | Invalid inputs |
| @integrity | 5 | Cross-endpoint data integrity |
| @e2e | 1 | End-to-end validation |

---

## Project Goals

- Learn API test automation best practices
- Validate real data from a public API
- Produce readable, maintainable tests
- Build a portfolio showcasing QA + automation skills
- Demonstrate CI, reporting, and release discipline

---

## What This Project Demonstrates

- API test design using Playwright
- Positive, negative, and integrity validation strategies
- Domain-based test tagging and filtering
- Aggregated execution summaries
- CI-integrated reporting via GitHub Actions
- Semantic versioning and changelog-driven releases

---

## Explicit Test Architecture

- Helpers abstract API calls and reduce duplication
- Validation helpers keep assertions semantic
- A summary helper aggregates results across domains
- Version history is tracked in `CHANGELOG.md`
- Tests are organized by **domain**, not endpoint

---

## Running Tests by Tag

```bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
npx playwright test --grep "@e2e"
```

---

## Versioning Strategy

This project follows semantic versioning.

- "v1.0.0 represents a frozen, stable baseline of the test suite."
- "Subsequent versions introduce intentional, documented enhancements"
- See `CHANGELOG.md` for version history and details

---

## Status

- **Current Version:** `v1.0.0`
- **Active Phase:** Versioning & Release Management
- **Next Milestone:** `v1.1.0`
