# 🧪 Pokémon API Test Automation Roadmap

This project is designed to build foundational and practical **API testing skills** using the public Pokémon API, progressing from basic requests to a polished, portfolio-ready automation project.

**API:** https://pokeapi.co  
**Primary Tools:** JavaScript, Node.js, Playwright (API testing), optional Jest / Supertest  
**Goal:** Demonstrate strong API test design, validation logic, reporting, and maintainability.

---

## Phase 0 – Project Setup & Orientation

**Goal:** Establish a clean, intentional foundation.

### Steps
- Create a new GitHub repository
- Initialize Node.js project
- Add `.gitignore`, `README.md`, and this `roadmap.md`
- Install dependencies:
  - Playwright
  - Optional: dotenv, jest
- Verify basic API connectivity with a simple GET request

**Done When**
- Repo runs a simple API request successfully
- Project structure is clean and documented

---

## Phase 1 – API Fundamentals (Read + Observe)

**Goal:** Understand how the Pokémon API behaves.

### Steps
- Explore core endpoints:
  - `/pokemon/{name or id}`
  - `/pokemon-species/{id}`
  - `/type/{id}`
- Observe:
  - Status codes
  - Response structure
  - Nested objects
- Manually inspect responses using browser or curl

**Done When**
- You can explain the structure of a Pokémon response
- You know where key fields live (id, name, types, abilities)

---

## Phase 2 – Basic API Tests (Happy Path)

**Goal:** Write clear, reliable tests for valid requests.

### Steps
- Create tests for:
  - Valid Pokémon by name
  - Valid Pokémon by ID
- Assert:
  - Status code = 200
  - Response body contains expected keys
  - Name matches request
- Keep tests readable and well-commented

**Done When**
- Tests consistently pass
- Assertions are explicit and intentional

---

## Phase 3 – API Contract & Behavior Validation ✅

**Goal:** Prove the API handles bad input correctly.

### Steps
- Test invalid Pokémon names:
  - Examples: `zach`, `notapokemon`, `123abc`, `!@#$%`
- Test invalid Pokémon IDs:
  - Examples: `-1`, `0`, `9999`, `123456`
- Assert:
  - Proper status codes (400 or 404) are returned
  - Error response structure is consistent:
    - Either a JSON body with a `detail` property
    - Or no body at all
- Document expected vs actual behavior via console output

**Done When**
- Tests clearly demonstrate failure handling for both names and IDs
- Error response consistency is checked
- Failures and status codes are easy to understand from output

---

## Phase 4 – Data Integrity & Relationships

**Goal:** Validate correctness, not just availability.

### Steps
- Verify:
  - Pokémon ID is consistent across endpoints
  - Types match known expectations
  - Abilities array is non-empty
- Cross-check:
  - `/pokemon` vs `/pokemon-species`
- Add helper functions for shared logic

**Done When**
- Tests validate relationships, not just fields
- Code reuse is visible and intentional

---

## Phase 5 – Test Structure & Maintainability

**Goal:** Make the project feel production-quality.

### Steps
- Refactor repeated logic
- Introduce test utilities/helpers
- Group tests logically
- Improve naming and comments
- Add environment configuration if useful

**Done When**
- Code is easy to navigate
- Adding a new test feels trivial

---

## Phase 6 – Reporting & Output

**Goal:** Make results easy to understand for non-engineers.

### Steps
- Add:
  - Console summaries
  - Optional HTML or JSON report
- Highlight:
  - Pass/fail counts
  - Clear failure messages
- Ensure output is readable and useful

**Done When**
- A reviewer can quickly understand test results
- Failures explain *why*, not just *that*

---

## Phase 7 – Portfolio Polish

**Goal:** Make this a strong public artifact.

### Steps
- Update `README.md` with:
  - Project goal
  - Tools used
  - How to run tests
  - Example output
- Add comments explaining design decisions
- Sanity check everything from a fresh clone

**Done When**
- Repo is recruiter-ready
- You’d feel confident walking through it in an interview

---

## Optional Extensions (If Time Allows)

- Rate limit / performance checks
- Schema validation
- CI integration (GitHub Actions)
- Data-driven test generation
- Comparison against cached expected data

---

## Status Tracking

- **Current Phase:** Phase 3
- **Last Completed Phase:** Phase 3 - Negative & Edge Case Testing
- **Next Phase:** Phase 4 - Data Integrity & Relationships