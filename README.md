# Pokémon API Test Automation

[![Playwright Tests](https://img.shields.io/badge/Playwright-API%20Tests-blue)](https://playwright.dev/)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Overview

This project demonstrates **API test automation** using the public [Pokémon API](https://pokeapi.co/) and [Playwright Test](https://playwright.dev/docs/test-intro).  
It is structured in **phases** to gradually build skills in API validation, negative testing, and RESTful behavior verification.

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

## Phase 2 – Extended Validation ✅

**Completed:** ✅

- Multiple Pokémon validated via array-driven tests
- Loop-based assertions for consistent validation
- Negative test verifying 404 for invalid Pokémon
- Explicit response validation and readable console output

## Phase 3 – API Contract & Behavior Validation ✅

**Completed:** ✅

- Negative & edge case tests for:
    - Invalid Pokémon names (zach, notapokemon, 123abc, !@#$%)
    - Invalid Pokémon IDs (-1, 0, 9999, 123456)
- Verified proper status codes are returned (400 or 404)
- Checked for consistent error response structure (JSON body with detail property or no body)
- Console output clearly documents expected vs actual behavior

Example console output:

```bash
✔ Input "zach" correctly returned 404
✔ Input "notapokemon" correctly returned 404
✔ Input "123abc" correctly returned 404
✔ Input "!@#$%" correctly returned 400
✔ Input "-1" correctly returned 404
✔ Input "0" correctly returned 404
✔ Input "9999" correctly returned 404
✔ Input "123456" correctly returned 404
✔ Input "zach" returned status 404 with no JSON body
✔ Input "123abc" returned status 404 with no JSON body
✔ Input "-1" returned status 404 with no JSON body
```

## Setup

# Install dependencies
npm install

# Run tests
npm test

Project Structure

```bash
pokemon-api-tests/
├─ tests/
│ └─ api/
│   └─ pokemon-check.spec.js
├─ package.json
├─ package-lock.json
└─ README.md
```

## License

MIT License

---

### **Updated Roadmap.md Status Tracking**

## Status Tracking

- **Current Phase:** Phase 3
- **Last Completed Phase:** Phase 3 - Negative & Edge Case Testing
- **Next Phase:** Phase 4 - Data Integrity & Relationships
