# 🧪 Pokémon API Test Automation Roadmap

This project builds practical **API testing skills** using the public Pokémon API, progressing from basic requests to a polished, portfolio-ready automation project.

**API:** https://pokeapi.co  
**Primary Tools:** JavaScript, Node.js, Playwright (API testing)  
**Goal:** Demonstrate strong API test design, validation logic, reporting, maintainability, and CI integration.

---

## Phase 0 – Project Setup & Orientation ✅

**Goal:** Establish a clean foundation.

- Create GitHub repository  
- Initialize Node.js project  
- Add `.gitignore`, `README.md`, `roadmap.md`  
- Install dependencies (Playwright)  
- Verify basic GET request works  

**Done When:**  
Project initializes cleanly and a basic API request executes successfully

---

## Phase 1 – API Fundamentals (Read + Observe) ✅

**Goal:** Understand Pokémon API behavior and structure

- Explore endpoints:
  - `/pokemon/{name or id}`
  - `/pokemon-species/{id}`
  - `/type/{id}`
- Observe status codes, nested objects, and response shape  
- Inspect responses via browser and manual requests  

**Done When:**  
Able to explain key response fields (`id`, `name`, `types`, `abilities`, `stats`)

---

## Phase 2 – API Test Suite Development ✅

**Goal:** Write reliable, structured tests for valid requests

- Implement central API contexts (`apiConfig.js`)  
- Data-driven test inputs (`pokemonTestData.js`)  
- Happy-path Pokémon lookup tests (`@happy`)  
- Cross-endpoint integrity tests (`@integrity`)  
- Negative / edge-case validation (`@negative`)  
- End-to-end validation flow (`@e2e`)  
- Aggregated execution summary helper (`testSummaryHelper.js`)  

**Done When:**  
All Phase 2 tests run consistently, with explicit assertions and meaningful failure messages

---

## Phase 3 – Advanced Negative & Edge Cases 🔜

**Goal:** Verify API behavior for invalid inputs

- Test invalid Pokémon names:
  - `zach`, `notapokemon`, `123abc`, `!@#$%`
- Test invalid Pokémon IDs:
  - `-1`, `0`, `9999`, `123456`
- Assert correct status codes (`400` or `404`)
- Validate error response behavior (JSON body or empty response)
- Document expected vs actual behavior  

**Done When:**  
Failures are predictable, readable, and correctly asserted

---

## Phase 4 – Data Integrity & Relationships ✅

**Goal:** Validate correctness and cross-endpoint consistency

- Verify ID and name consistency across:
  - `/pokemon/{id}`
  - `/pokemon-species/{id}`
- Validate nested schema fields:
  - `abilities.ability.name`
  - `types.type.name`
  - `stats.stat.name`
- Confirm semantic correctness:
  - Pikachu → `electric`
  - Squirtle → `water`
  - Charizard → `fire`
- Introduce helper functions to reduce duplication  

**Done When:**  
Nested data and relationships are validated with meaningful failure messages

---

## Phase 5 – Test Tagging & Filtering ✅

**Goal:** Organize tests by domain for targeted execution

- Apply domain-based tags:
  - `@happy`
  - `@negative`
  - `@integrity`
  - `@e2e`
- Ensure filtering works consistently across environments  

```bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
npx playwright test --grep "@e2e"
```

**Done When:**  
Test subsets can be executed independently and reliably

---

## Phase 5.7 – Execution Summary & CI Reporting ✅

**Goal:** Provide aggregated results and CI visibility

- Implement custom summary helper to aggregate pass/fail counts
- Configure GitHub Actions workflow (`playwright.yml`)
- Generate HTML reports automatically
- Surface failures in:
  - Console output
  - CI logs
  - HTML reports
- Expose CI status via README badge  

```
--- TEST SUMMARY ---
Passed: 6
Failed: 0
Total: 7
```

**Done When:**  
Every CI run produces clear results and reporting artifacts

---

## Phase 5.8 – Documentation & Portfolio Polish ✅

**Goal:** Make the project reviewer- and recruiter-friendly

- Align README with actual architecture and behavior
- Clearly explain:
  - Test domains
  - Tagging strategy
  - Execution flow
  - CI integration
- Update Roadmap to reflect completed phases
- Remove ambiguity or placeholder language  

**Done When:**  
A new reviewer can understand, run, and evaluate the project without guidance

---

## Phase 6 – Versioning & Release Management 🚧

**Goal:** Introduce professional release discipline and reproducibility

- Introduce `CHANGELOG.md` as the single source of truth for versions
- Adopt Semantic Versioning (`v1.0.0`, `v1.1.0`, etc.)
- Document released vs unreleased changes
- Tag repository releases in Git
- Ensure README references current stable version only

**Done When:**  
A reviewer can clearly identify:
- What version is current
- What changed between versions
- When features were introduced

---

## Phase 7 – Final Review & Freeze ⏳

**Goal:** Lock the project as a finished portfolio artifact

- Sanity-check from a fresh clone
- Verify:
  - Install
  - Test execution
  - CI badge accuracy
  - Version tags
- Freeze scope and avoid feature creep  

**Done When:**  
Project is stable, intentional, and presentation-ready

---

## Status Tracking

- **Current Phase:** 6 – Versioning & Release Management  
- **Last Completed Phase:** 2 – API Test Suite Development  
- **Next Phase:** 3 – Advanced Negative & Edge Cases
