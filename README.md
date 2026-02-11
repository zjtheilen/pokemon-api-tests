# Pokémon API Test Automation

[![Playwright Tests](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Current Stable Version:** `v1.1.0`  
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
| -------|-------|---------|
| @happy | 7 | Positive lookups |
| @negative | 8 | Invalid inputs |
| @integrity | 5 | Cross-endpoint data integrity |
| @e2e | 1 | End-to-end validation |

---

## Running Tests by Tag

``` bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
npx playwright test --grep "@e2e"
```