# 🧪 Pokémon API Test Automation Roadmap

This project builds practical **API testing skills** using the public Pokémon API, progressing from basic requests to a polished, portfolio-ready automation project.

**API:** https://pokeapi.co  
**Primary Tools:** JavaScript, Node.js, Playwright (API testing)  
**Goal:** Demonstrate strong API test design, validation logic, reporting, and maintainability.

---

## Phase 0 – Project Setup & Orientation

**Goal:** Establish a clean foundation.

- Create GitHub repo  
- Initialize Node.js project  
- Add `.gitignore`, `README.md`, `roadmap.md`  
- Install dependencies: Playwright (optional: dotenv, jest)  
- Verify basic GET request works  

**Done When:** Simple API request runs successfully, project structure documented

---

## Phase 1 – API Fundamentals (Read + Observe)

**Goal:** Understand the Pokémon API behavior

- Explore endpoints: `/pokemon/{name or id}`, `/pokemon-species/{id}`, `/type/{id}`  
- Observe status codes, response structures, nested objects  
- Manually inspect responses via browser or curl  

**Done When:** Able to explain structure and key fields (`id`, `name`, `types`, `abilities`)

---

## Phase 2 – Basic API Tests (Happy Path)

**Goal:** Write reliable tests for valid requests

- Test valid Pokémon by name and ID  
- Assert status = 200, body keys exist, name matches request  
- Keep tests readable and commented  

**Done When:** Tests consistently pass with explicit assertions

---

## Phase 3 – Negative & Edge Cases ✅

**Goal:** Verify API handles invalid inputs correctly

- Test invalid names: `zach`, `notapokemon`, `123abc`, `!@#$%`  
- Test invalid IDs: `-1`, `0`, `9999`, `123456`  
- Assert correct status codes (400/404)  
- Validate consistent error structure (JSON with `detail` or no body)  
- Document expected vs actual behavior  

**Done When:** Failures and status codes clearly understandable

---

## Phase 4 – Data Integrity & Relationships ⚙️

**Goal:** Validate correctness and nested schema

- Verify ID consistency across `/pokemon/{id}` and `/pokemon-species/{id}`  
- Validate nested fields:
  - `abilities.ability.name`  
  - `types.type.name`  
  - `stats.stat.name`  
- Confirm semantic correctness:
  - Pikachu → `electric`  
  - Squirtle → `water`  
  - Charizard → `fire`  
- Use helper functions to reduce repetition  

**Done When:** Relationships and nested data verified, failures informative

---

## Phase 5 – Test Tagging & Filtering ✅

**Goal:** Organize tests by domain for targeted execution

- Add tags: `@happy`, `@negative`, `@integrity`  
- Ensure filtering works on all platforms  

```bash
npx playwright test --grep "@happy"
npx playwright test --grep "@negative"
npx playwright test --grep "@integrity"
```

**Done When:** Tests can be run selectively using tags

---

## Phase 5.7 – Execution Summary & Reporting ✅

**Goal:** Provide aggregated test summaries and CI-ready reporting

- Custom summary helper records pass/fail per test domain  
- CI workflow automatically runs all tests and produces HTML report  
- Failures visible in console, CI logs, and HTML report  

```
--- TEST SUMMARY ---
Passed: 6
Failed: 0
Total: 7
```

**Done When:** Workflow automatically produces reports for each run; failures clearly documented; README and Roadmap reflect reporting setup

---

## Phase 6 – Documentation & Reporting ⏳

**Goal:** Make test results clear and reproducible

- Update README & Roadmap  
- Include console outputs and example commands  
- Ensure all tests reproducible  

---

## Phase 7 – Portfolio Polish

**Goal:** Prepare project for public portfolio

- Ensure code is readable, commented, and structured  
- Update README with goal, tools, how to run, and example output  
- Sanity check from fresh clone  

**Done When:** Repo is recruiter-ready

---

## Optional Extensions

- Rate limit / performance checks  
- Schema validation  
- CI integration (GitHub Actions)  
- Data-driven test generation  
- Comparison against cached expected data  

---

## Status Tracking

- **Current Phase:** 5.7 – Execution Summary & Reporting  
- **Last Completed Phase:** 5.6 – CI Integration & Advanced Reporting  
- **Next Phase:** 5.8 – Optional Enhancements / Portfolio Polish
