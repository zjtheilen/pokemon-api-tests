# Changelog

All notable changes to this project will be documented in this file.

This project follows **Semantic Versioning**:  
`MAJOR.MINOR.PATCH`

- **MAJOR** – Breaking changes to structure or behavior
- **MINOR** – New features, expanded test coverage, or architectural improvements
- **PATCH** – Bug fixes, refactors, and non-breaking improvements

---

## [v1.1.0] – Phase 2

### Added
- Centralized API context creation (`apiConfig.js`)
- Data-driven Pokémon test data (`pokemonTestData.js`) for:
  - Valid Pokémon names (`validPokemon`)
  - Valid Pokémon IDs (`validPokemonIds`)
  - Type expectations (`validTypeExpectations`)
- Happy-path API tests (`tests/api/pokemon.happy.spec.js`)
- Integrity & relationship tests (`tests/api/pokemon.integrity.spec.js`)
- Negative & edge-case tests (`tests/api/pokemon.negative.spec.js`)
- End-to-end Pokémon lookup test (`tests/e2e/pikachu.full-lookup.spec.js`)
- Aggregated test summary reporting helper (`testSummaryHelper.js`)

### Updated
- Refactored tests to use centralized API contexts and data-driven inputs
- Improved error handling in integrity & E2E tests
- Cleaned commented-out code for clarity

---

## [v1.0.0] – Initial Stable Release

### Added
- API test automation framework using Playwright
- Happy-path Pokémon lookup tests (`@happy`)
- Negative and edge-case validation (`@negative`)
- Cross-endpoint data integrity validation (`@integrity`)
- End-to-end validation flow (`@e2e`)
- Domain-based test tagging and filtering
- Aggregated execution summary helper
- GitHub Actions CI integration with HTML reporting
- Clear README and roadmap documentation

### Notes
- This release represents a **stable, portfolio-ready baseline**
- Scope is intentionally frozen to preserve reproducibility
- Future changes will be versioned incrementally

---

## Versioning Policy

- All releases are tagged in Git
- README always reflects the **current stable version**
- Experimental or in-progress work is documented under **Unreleased**
- No scope creep outside the defined roadmap
