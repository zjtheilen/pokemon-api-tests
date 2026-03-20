const { test, expect } = require("@playwright/test");
const { PokemonApiHelper } = require("../.././helpers/pokemonApiHelper");
const { createPokemonApiContext } = require("../../config/apiConfig");
const summary = require("../.././helpers/testSummaryHelper"); // singleton

const {
  malformedInputs,
  silentlyAcceptedPokemonInputs,
  invalidPokemon,
  invalidPokemonIds,
} = require("../../config/pokemonTestData");

// Deduplicate arrays
const uniqueMalformedInputs = Array.from(new Set(malformedInputs));
const uniqueSilentInputs = Array.from(new Set(silentlyAcceptedPokemonInputs));
const uniqueInvalidEntityInputs = Array.from(new Set([...invalidPokemon, ...invalidPokemonIds]));

// ------------------------
// Malformed Inputs
// ------------------------
test.describe("@negative malformed inputs", () => {
  uniqueMalformedInputs.forEach((input, idx) => {
    test(`malformed input #${idx}: "${input}" returns 400/404`, async () => {
      const apiContext = await createPokemonApiContext();
      const helper = new PokemonApiHelper(apiContext);
      let passed = false;

      try {
        const { response } = await helper.getPokemon(input);
        passed = [400, 404].includes(response.status());
        expect(passed).toBeTruthy();
      } finally {
        summary.addResult("NEGATIVE", passed, "malformed");
        await apiContext.dispose();
      }
    });
  });
});

// ------------------------
// Silent Inputs
// ------------------------
test.describe("@negative silent inputs", () => {
  uniqueSilentInputs.forEach((input, idx) => {
    test(`silent input #${idx}: "${input}" returns base Pokemon list`, async () => {
      const apiContext = await createPokemonApiContext();
      const helper = new PokemonApiHelper(apiContext);
      let passed = false;

      try {
        const { response, data } = await helper.getPokemon(input);
        passed = response.status() === 200 && Array.isArray(data.results);
        expect(passed).toBeTruthy();
      } finally {
        summary.addResult("NEGATIVE", passed, "silent");
        await apiContext.dispose();
      }
    });
  });
});

// ------------------------
// Invalid Entity Inputs
// ------------------------
test.describe("@negative invalid entity inputs", () => {
  uniqueInvalidEntityInputs.forEach((input, idx) => {
    test(`invalid entity input #${idx}: "${input}" does not return valid Pokemon data`, async () => {
      const apiContext = await createPokemonApiContext();
      const helper = new PokemonApiHelper(apiContext);
      let passed = false;

      try {
        const { response, data } = await helper.getPokemon(input);
        passed = [400, 404].includes(response.status()) && (!data || !data.name);
        expect(passed).toBeTruthy();
      } finally {
        summary.addResult("NEGATIVE", passed, "invalidEntity");
        await apiContext.dispose();
      }
    });
  });
});

test.afterAll(() => {
  summary.exportJson();
});
