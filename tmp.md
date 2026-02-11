# 🧪 Pokémon API Test Automation Roadmap

This project builds practical **API testing skills** using the public Pokémon API, progressing from basic requests to a polished, portfolio-ready automation project.

**API:** https://pokeapi.co  
**Primary Tools:** JavaScript, Node.js, Playwright (API testing)  
**Goal:** Demonstrate strong API test design, validation logic, reporting, maintainability, and CI integration.

---  

## Phase 0 – Project Setup & Orientation ✅
- GitHub repo initialized
- Node.js project setup
- Dependencies installed
- Basic GET request executes

## Phase 1 – API Fundamentals ✅
- Understand Pokémon API endpoints and response structures
- Inspect key fields: `id`, `name`, `types`, `abilities`, `stats`

## Phase 2 – API Test Suite Development ✅
- Implement central API contexts 
``` 
    apiConfig.js 
```
- Data-driven Pokémon test data
``` 
    pokemonTestData.js 
```
- Happy-path, integrity, negative, and E2E tests
- Aggregated summary reporting helper
``` 
    testSummaryHelper.js 
```

## Phase 4 – Data Integrity & Relationships ✅
- Cross-endpoint validation
- Nested schema verification
- Semantic correctness checks

## Phase 5 – Test Tagging & Filtering ✅
- Domain-based tags (`@happy`, `@negative`, `@integrity`, `@e2e`)
- Filter tests using Playwright `--grep` flag

## Phase 5.7 – Execution Summary & CI Reporting ✅
- Aggregated pass/fail counts
- GitHub Actions integration
``` yaml 
    main.yaml 
```

- HTML reporting

## Phase 5.8 – Documentation & Portfolio Polish ✅
- Update README and roadmap
- Ensure clarity for new reviewers

## Phase 6 – Versioning & Release Management 🚧
- Semantic versioning
- CHANGELOG.md updates
- Git release tags