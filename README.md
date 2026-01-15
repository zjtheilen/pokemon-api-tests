# Pokémon API Test Automation

[![Playwright Tests](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Overview

This project demonstrates **API test automation** using the public [Pokémon API](https://pokeapi.co/) and [Playwright Test](https://playwright.dev/docs/test-intro).  
Tests are organized into **phases** and **tags** to progressively validate functionality, error handling, and data integrity.

- **Tags for targeted tests:**
  - `@happy` – Positive test cases
  - `@negative` – Invalid inputs / edge cases
  - `@integrity` – Data consistency and nested schema validation

---

## Project Goals

- Learn API test automation best practices
- Validate real data from a public API
- Produce readable, maintainable tests
- Build a portfolio showcasing coding and QA skills
- Demonstrate CI integration and reporting

---

## What This Project Demonstrates

- API test design using Playwright
- Positive, negative, and data-integrity validation
- Domain-based test tagging
- Aggregated execution summaries
- CI-ready reporting

---

## Explicit Test Architecture

- Helpers abstract API calls and reduce duplication
- Validation helpers keep assertions semantic, not repetitive
- Summary helper demonstrates cross-test aggregation
- Tests are intentionally split by domain, not endpoint

---

## Intentional Non-Features (Out of Scope)

- Load testing
- Contract testing against mocked schemas
- Extensive performance benchmarking

This project focuses on correctness, clarity, and maintainablitiy over volume.

---

## Running Tests by Tag

You can filter and run specific subsets of tests using the `--grep` flag:

```bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
```

This enables faster iteration and debugging by domain.

---

## Test Phases

### Phase 1 – Basic GET Requests ✅

- Setup API context with `request.newContext()`  
- Validated multiple Pokémon responses  
- Checked status, `id`, `name`, `abilities`, `types`, and `stats`  
- Console output readable and structured  

```
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
Pokemon types:
-- type: water
--- Squirtle Test Complete ---
```

---

### Phase 2 – Extended Validation ✅

- Loop-based validation for multiple Pokémon  
- Checked multiple keys in each response  
- Maintained readable console output  

---

### Phase 3 – Negative & Edge Cases ✅

- Tested invalid Pokémon names and IDs:
  - Examples: `zach`, `notapokemon`, `123abc`, `!@#$%`, `-1`, `0`, `9999`, `123456`  
- Verified correct status codes (`400` or `404`)  
- Checked consistent error structure: JSON with `detail` or no body  

```
✔ Input "zach" correctly returned 404
✔ Input "!@#$%" correctly returned 400
✔ Input "-1" returned status 404 with no JSON body
```

---

### Phase 4 – Data Integrity & Relationships ✅

- Verified cross-endpoint consistency (`/pokemon/{id}` vs `/pokemon-species/{id}`)  
- Nested schema validation for `abilities`, `types`, `stats`  
- Checked semantic correctness for known Pokémon:
  - Pikachu → `electric`
  - Squirtle → `water`
  - Charizard → `fire`  

```
✔ ID 25: /pokemon and /pokemon-species agree on name "pikachu"
✔ Abilities, types, and stats validated successfully
✔ pikachu has expected type "electric"
```

---

### Phase 5 – Test Tagging & Filtering ✅

- Added tags `@happy`, `@negative`, `@integrity`  
- Verified filtering works on Windows and other platforms  
- Console clearly documents which domain each test belongs to  

```bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
```

---

### Phase 5.7 – Execution Summary & Reporting ✅

- Playwright tests automatically record results per domain using a custom summary helper
- CI Workflow executes the full Playwright API test suite on every push and pull request
- Pass/fail status is visible via GitHub Actions and CI badge
- Failures are visible in console, CI logs, and HTML reports
- README and Roadmap reflect reporting setup

```
--- TEST SUMMARY ---
Passed: 6
Failed: 0
Total: 7
```

---

### Phase 6 – Documentation & Reporting ⏳

- Updated README and Roadmap to reflect tags and filtered execution  
- Added example outputs for clarity  
- Ensured all tests can be reproduced consistently  

---

## Status Tracking

- **Current Phase:** 5.7 – Execution Summary & Reporting  
- **Last Completed Phase:** 5.6 – CI Integration & Advanced Reporting  
- **Next Phase:** 5.8 – Optional Enhancements / Portfolio Polish
