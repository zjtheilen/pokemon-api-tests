# Pokémon API Test Automation

[![Playwright Tests](https://img.shields.io/badge/Playwright-API%20Tests-blue)](https://playwright.dev/)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Overview

This project demonstrates **API test automation** using the public [Pokémon API](https://pokeapi.co/) and [Playwright Test](https://playwright.dev/docs/test-intro).  
It is structured in **phases** to progressively demonstrate API validation, negative testing, data integrity checks, and RESTful behavior verification.

---

## Project Goals

- Learn API test automation best practices.
- Validate real data from a public API.
- Produce readable, maintainable tests that demonstrate test engineering skills.
- Build a portfolio of tests that highlight both coding and QA practices.

---

## Phase 1 - Basic GET Requests ✅

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

## Phase 2 - Extended Validation ✅

**Completed:** ✅

- Multiple Pokémon validated via array-driven tests
- Loop-based assertions for consistent validation
- Negative test verifying 404 for invalid Pokémon
- Explicit response validation and readable console output

---

## Phase 3 - API Contract & Behavior Validation ✅

**Completed:** ✅

- Negative & edge case tests for:
  - Invalid Pokémon names (`zach`, `notapokemon`, `123abc`, `!@#$%`)
  - Invalid Pokémon IDs (`-1`, `0`, `9999`, `123456`)
- Verified proper status codes are returned (`400` or `404`)
- Checked for consistent error response behavior:
  - JSON error body with `detail` property **or**
  - No response body
- Console output clearly documents expected vs actual behavior

**Example console output:**

```bash
✔ Input "zach" correctly returned 404
✔ Input "notapokemon" correctly returned 404
✔ Input "!@#$%" correctly returned 400
✔ Input "-1" returned status 404 with no JSON body
✔ Input "123456" returned status 404 with no JSON body
```

---

## Phase 4 - Data Integrity & Relationships ✅

**Goal:** Validate correctness, not just availability.

**Completed:** ✅

### What We Tested
- Cross-endpoint consistency between:
  - `/pokemon/{id}`
  - `/pokemon-species/{id}`
- Pokémon names match across related endpoints
- Internal data integrity for:
  - `abilities`
  - `types`
  - `stats`
- Correct nested schema structure and data types
- Semantic correctness for known Pokémon:
  - Pikachu → `electric`
  - Squirtle → `water`
  - Charizard → `fire`
- Console output is readable and highlights failures

### Example Console Output

```bash
✔ ID 25: /pokemon and /pokemon-species agree on name "pikachu"
✔ ID 7: /pokemon and /pokemon-species agree on name "squirtle"
✔ Abilities, types, and stats validated successfully
✔ pikachu has expected type "electric"
✔ squirtle has expected type "water"
```

