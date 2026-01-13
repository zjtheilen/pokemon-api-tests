# Pokémon API Test Automation

[![Playwright Tests](https://img.shields.io/badge/Playwright-API%20Tests-blue)](https://playwright.dev/)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Overview

This project demonstrates **API test automation** using the public [Pokémon API](https://pokeapi.co/) and [Playwright Test](https://playwright.dev/docs/test-intro).  
It is structured in **phases** to gradually build skills in automated testing, API validation, and test organization.

---

## Project Goals

- Learn API test automation best practices.
- Validate real data from a public API.
- Produce readable, maintainable tests that demonstrate test engineering skills.
- Build a portfolio of tests that highlight both coding and QA practices.

---

## Phase 1 – Basic GET Requests ✅

**Completed:** ✅

- Setup a shared API context using `request.newContext()` with Playwright Test.
- Implemented GET requests for multiple Pokémon:
  - **Pikachu**
  - **Squirtle**
- Verified response status is `200`.
- Extracted and validated key Pokémon fields:
  - `name`
  - `id`
  - `abilities`
  - `stats`
  - `types`
- Output is structured and readable in console.
- Managed API context lifecycle using `beforeAll` and `afterAll` hooks.

**Example console output:**

```bash
Pokemon name: pikachu
--- Pikachu Test Complete ---
Pokemon name: squirtle
Pokemon ID: 7
Pokemon abilities:
-- ability: torrent
-- ability: rain-dish
Pokemon stats:
-- stat: hp
-- stat: attack
...
Pokemon types:
-- type: water
--- Squirtle Test Complete ---
```

---

## Phase 2 – Extended Validation 🔜

**Next steps:**

- Validate multiple Pokémon properties programmatically using loops and assertions.
- Explore additional API endpoints (e.g., abilities, moves, evolution chains).
- Implement structured tests for lists of Pokémon and error scenarios.
- Generate test reports summarizing results for review or CI pipelines.

---

## Setup

```bash
# Install dependencies
npm install

# Run tests
npm test
```

## Project Structure

pokemon-api-tests/
├─ tests/
│  └─ api/
│     ├─ smoke.spec.js      # Phase 1: Basic GET requests
├─ package.json
├─ package-lock.json
└─ README.md

## License

MIT License