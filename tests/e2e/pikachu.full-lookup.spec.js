const { test, expect } = require("@playwright/test");
const { PokemonApiHelper } = require("../.././helpers/pokemonApiHelper");
const { createPokemonApiContext } = require("../../config/apiConfig");
const summary = require('../.././helpers/testSummaryHelper');


test("E2E: Pikachu full lookup @e2e", async () => {
  const apiContext = await createPokemonApiContext();
  const helper = new PokemonApiHelper(apiContext);

  let allPassed = true;

  try {
    const { data: pokemon } = await helper.getPokemon("pikachu");
    const { data: species } = await helper.getPokemonSpecies(pokemon.id);

    expect(pokemon.name).toBe(species.name);
    expect(pokemon.types.map(t => t.type.name)).toContain("electric");

  } catch (err) {
    allPassed = false;
    throw err;
  } finally {
    summary.addResult("E2E", allPassed);
    await apiContext.dispose();
  }
});

summary.exportJson();
