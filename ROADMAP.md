### ROADMAP.md

# 🧪 Pokémon API Test Automation Roadmap

This project demonstrates **API test automation** using the public Pokémon API, progressing from foundational requests to portfolio-ready automation.  
This file tracks **completed phases**, **current work**, and **future versions**.

**API:** https://pokeapi.co  
**Primary Tools:** JavaScript, Node.js, Playwright (API testing)  
**Goal:** Showcase robust test design, validation logic, reporting, maintainability, and CI integration.

---

## Phase 0 – Project Setup & Orientation ✅

**Goal:** Establish a clean foundation.

- Create GitHub repository  
- Initialize Node.js project  
- Add `.gitignore`, `README.md`, `ROADMAP.md`  
- Install dependencies (Playwright)  
- Verify basic GET request works  

**Done When:**  
Project initializes cleanly and a basic API request executes successfully

---

## Phase 1 – Multi-Step Postman Workflows ✅ (v1.2.0-dev)

**Goal:** Expand foundational API testing with chained requests and iteration

- Implement multi-step Pokémon → Species requests
- Add inline species fetching with automated assertions
- Enable environment-driven iteration across multiple Pokémon IDs
- Validate responses and log Pokémon ID + species URL
- Prepare Newman reports for JSON (HTML optional)

**Done When:**
- Multi-step Postman collection runs successfully for multiple Pokémon
- Each species request validates HTTP 200
- Environment variables control the iteration loop
- Console and summary outputs are clear for CI review

---

## Phase 2 – Advanced API Testing (Negative + Mocking + Concurrency)

**Goal:** Introduce edge case validation, mocking, and stress testing

- Negative test scenarios for malformed requests
- Postman Mock Servers for API failure simulation
- Concurrency/stress testing via Newman iteration
- Validate automated failure logging

**Done When:**  
Tests simulate errors and concurrency, producing meaningful pass/fail results

---

## Phase 3 – SQL Data Validation Layer

**Goal:** Cross-check API responses against database data

- Setup SQLite/Postgres schema
- Write SQL queries to validate Pokémon data
- Compare API vs DB consistency

**Done When:**  
API data matches DB data; discrepancies are flagged

---

## Phase 4 – Cross-Domain Integration Testing

- Combine API, DB, and UI (Playwright)
- Validate full Pokémon workflows end-to-end

---

## Phase 5 – Secondary Automation Framework

- Add Cypress or Selenium for additional tool coverage
- Build minimal test suites reusing Playwright scenarios

---

## Phase 6 – Reporting & CI Integration

- Newman JSON reporting
- GitHub Actions setup
- Aggregate test artifacts and logs

---

## Phase 7 – Parallelization & Optimization

- Playwright parallel workers
- CI job parallelization

---

## Phase 8 – Schema Validation Hardening

- Strict JSON schema validation across all test cases
- Optional Python validation layer