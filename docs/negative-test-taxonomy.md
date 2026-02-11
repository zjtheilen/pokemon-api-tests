# Negative Test Taxonomy

This project classifies negative API tests by **intent**, not just outcome.
Some invalid inputs are rejected, while others are coerced or silently accepted
by the Pokémon API. These behaviors are documented rather than treated as failures.

## 1. Malformed Inputs

Inputs that violate basic structural or type expectations.

Examples:
- Non-numeric Pokémon IDs ("abc")
- Negative numbers (-1)
- Decimal IDs (1.5)
- Empty strings

Expected Behavior:
- Ideally rejected with a 4xx response
- If accepted, behavior is documented as an API quirk

---

## 2. Coerced Inputs

Inputs that are invalid but automatically corrected by the API.

Examples:
- "001" → treated as ID 1
- Numeric strings with whitespace
- Float values coerced to integers

Observed Behavior:
- Request succeeds
- Response indicates coercion occurred

---

## 3. Silently Accepted Inputs

Inputs that are invalid but ignored or defaulted.

Examples:
- Extremely large IDs returning fallback Pokémon
- Extra or unused query parameters
- Null-like values mapped to defaults

Observed Behavior:
- 200 response
- Response content reveals silent fallback or ignore behavior

---

## Notes

Negative tests may intentionally pass while surfacing unexpected API behavior.
These cases are summarized in test output rather than failing the suite.
