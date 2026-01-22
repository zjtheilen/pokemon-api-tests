# Changelog

All notable changes to this project will be documented in this file.

This project follows **Semantic Versioning**:  
`MAJOR.MINOR.PATCH`

- **MAJOR** – Breaking changes to structure or behavior
- **MINOR** – New features, expanded test coverage, or architectural improvements
- **PATCH** – Bug fixes, refactors, and non-breaking improvements

---

## [v1.1.0] – Unreleased

### Added
- Formal release management using `CHANGELOG.md`
- Clear separation between released and unreleased work
- Documentation of versioning strategy and release expectations

### Planned
- Minor test suite enhancements aligned with roadmap
- Non-breaking improvements to reporting or structure
- Additional documentation clarifying execution flow

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
- The README always reflects the **current stable version**
- Experimental or in-progress work is documented under **Unreleased**
- No scope creep outside the defined roadmap
