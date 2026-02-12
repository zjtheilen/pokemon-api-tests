# Changelog

All notable changes are documented here. Follows Semantic Versioning (`MAJOR.MINOR.PATCH`).

---

## [v1.1.4] – CI Stabilization & Summary Alignment

### Fixed
- Resolved GitHub Actions workflow failure caused by summary schema mismatch
- Aligned CI failure gate logic with actual summary JSON structure
- Prevented `TypeError: Cannot convert undefined or null to object` in CI

### Improved
- Hardened domain-based failure detection logic
- Ensured workflow only fails on actual test failures
- Stabilized release pipeline behavior across Node 20 & 22 matrix runs

---

## [v1.1.0] – Phase 2

### Added
- Centralized API context (`apiConfig.js`)
- Data-driven test data (`pokemonTestData.js`)
- Happy-path tests (`tests/api/pokemon.happy.spec.js`)
- Integrity tests (`tests/api/pokemon.integrity.spec.js`)
- Negative tests (`tests/api/pokemon.negative.spec.js`)
- E2E tests (`tests/e2e/pikachu.full-lookup.spec.js`)
- Aggregated summary helper (`./helpers/testSummaryHelper.js`)

### Updated
- Refactored tests for consistency and readability
- Improved error handling
- Cleaned commented-out code

---

## [v1.0.0] – Initial Stable Release

### Added
- API test automation framework
- Happy-path, negative, integrity, and E2E tests
- Domain-based tags
- Aggregated summary reporting
- GitHub Actions CI integration
- Clear README and roadmap
