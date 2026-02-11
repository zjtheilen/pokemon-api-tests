# Changelog

All notable changes are documented here. Follows Semantic Versioning (`MAJOR.MINOR.PATCH`).

## [v1.1.0] – Phase 2

### Added
- Centralized API context (`apiConfig.js`)
- Data-driven test data (`pokemonTestData.js`)
- Happy-path tests (`tests/api/pokemon.happy.spec.js`)
- Integrity tests (`tests/api/pokemon.integrity.spec.js`)
- Negative tests (`tests/api/pokemon.negative.spec.js`)
- E2E tests (`tests/e2e/pikachu.full-lookup.spec.js`)
- Aggregated summary helper (`testSummaryHelper.js`)

### Updated
- Refactored tests for consistency and readability
- Improved error handling
- Cleaned commented-out code

## [v1.0.0] – Initial Stable Release
- API test automation framework
- Happy-path, negative, integrity, and E2E tests
- Domain-based tags
- Aggregated summary reporting
- GitHub Actions CI integration
- Clear README and roadmap