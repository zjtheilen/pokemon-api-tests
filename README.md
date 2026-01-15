# Pokémon API Test Automation

[![Playwright Tests](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/zjtheilen/pokemon-api-tests/actions/workflows/playwright.yml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Overview

This project demonstrates **API test automation** using the public [Pokémon API](https://pokeapi.co/) and [Playwright Test](https://playwright.dev/docs/test-intro).  
Tests are organized into **phases** and **tags** to progressively validate functionality, error handling, and data integrity.

- **Tags for targeted tests:**
  - `@happy` – Positive test cases
  - `@negative` – Invalid inputs and edge cases
  - `@integrity` – Data consistency and nested schema validation
  - `@e2e` - End-to-end testing

| Domain | Tests | Purpose |
| ---------|-------|---------- |
| @happy | 7 | Positive lookups |
| @negative | 8 | Invalid inputs |
| @integrity | 5 | Cross-endpoint @ data integrity |
| @e2e | 1 | End-to-end testing |

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
- CI-integrated reporting via GitHub Actions

---

## Explicit Test Architecture

- Helpers abstract API calls and reduce duplication
- Validation helpers keep assertions semantic, not repetitive
- A summary helper demonstrates cross-test result aggregation
- Tests are intentionally split by **domain**, not by endpoint

---

## Intentional Non-Features (Out of Scope)

- Load testing
- Contract testing against mocked schemas
- Extensive performance benchmarking

This project prioritizes correctness, clarity, and maintainability over volume.

---

## Running Tests by Tag

You can filter and run specific subsets of tests using the `--grep` flag:

```bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
npx playwright test --grep "@e2e"
```

This enables faster iteration and debugging by domain.

---

## Test Phases

### Phase 1 – Basic GET Requests ✅

- Set up API context using `request.newContext()`
- Validated multiple Pokémon responses
- Checked status, `id`, `name`, `abilities`, `types`, and `stats`
- Console output is readable and structured

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

- Loop-based validation across multiple Pokémon
- Assertions expanded across multiple response keys
- Output consistency maintained for readability

---

### Phase 3 – Negative & Edge Cases ✅

- Tested invalid Pokémon names and IDs:
  - `zach`, `notapokemon`, `123abc`, `!@#$%`, `-1`, `0`, `9999`, `123456`
- Verified correct error status codes (`400` or `404`)
- Validated consistent error response structure

```
✔ Input "zach" correctly returned 404
✔ Input "!@#$%" correctly returned 400
✔ Input "-1" returned status 404 with no JSON body
```

Example negative response:

```json
Input: "zach"
Status: 404
Body: { "detail": "Not Found" }
```

---

### Phase 4 – Data Integrity & Relationships ✅

- Verified cross-endpoint consistency (`/pokemon/{id}` vs `/pokemon-species/{id}`)
- Nested schema validation for `abilities`, `types`, and `stats`
- Semantic validation for known Pokémon

```
✔ ID 25: /pokemon and /pokemon-species agree on name "pikachu"
✔ Abilities, types, and stats validated successfully
✔ pikachu has expected type "electric"
```

---

### Phase 5 – Test Tagging & Filtering ✅

- Added domain-based tags: `@happy`, `@negative`, `@integrity`, `@e2e`
- Verified filtering works consistently across platforms
- Console output clearly identifies test domains

```bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
```

---

### Phase 5.7 – Execution Summary & Reporting ✅

- Test results are aggregated using a custom summary helper
- GitHub Actions executes the full test suite on every push and pull request
- CI status is visible via the badge at the top of this README
- Failures are observable in console output, CI logs, and HTML reports

```
--- TEST SUMMARY ---
Passed: 6
Failed: 0
Total: 7
```

---

### Phase 5.8 – Documentation & Portfolio Polish ⏳

- README and Roadmap updated to reflect current architecture
- Reporting and execution flow clearly documented
- Project prepared for external review

---

## Status Tracking

- **Current Phase**: 5.8 – Optional Enhancements / Portfolio Polish  
- **Last Completed Phase**: 5.7 – Execution Summary & Reporting  
- **Next Phase**: 5.9 – Final Review & Freeze
