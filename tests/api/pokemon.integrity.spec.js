const { test, expect } = require('@playwright/test');
const { PokemonApiHelper } = require('../.././helpers/pokemonApiHelper');
const { validateAbilities, validateTypes, validateStats } = require('../.././helpers/validationHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');
const { validPokemonIds, validTypeExpectations } = require('../../config/pokemonTestData');
const summary = require('../.././helpers/testSummaryHelper');

test.describe('Pokemon API - Data Integrity & Relationships', () => {
  let apiContext;
  let helper;

  test.beforeAll(async () => {
    apiContext = await createPokemonApiContext();
    helper = new PokemonApiHelper(apiContext);
  });

  test.afterAll(async () => {
    summary.exportJson();
    await apiContext.dispose();
  });

  test('@integrity pokemon consistency across endpoints', async () => {
    let allPassed = true;

    for (const id of validPokemonIds) {
      try {
        const { data: pokemonData } = await helper.getPokemon(id);
        const { data: speciesData } = await helper.getPokemonSpecies(id);

        if (!pokemonData || !speciesData) {
          console.error(`Failed fetch for ${id}`);
          allPassed = false;
          continue;
        }

        expect(pokemonData.name).toBe(speciesData.name);
      } catch (err) {
        console.error(err.message);
        allPassed = false;
      }
    }

    summary.addResult('INTEGRITY', allPassed, 'crossEndpoint');
  });

  test('@integrity pokemon responses contain required abilities, types, and stats', async () => {
    let allPassed = true;

    try {
      const { data } = await helper.getPokemon('squirtle');
      validateAbilities(data);
      validateStats(data);
      validateTypes(data);
    } catch (err) {
      console.error(err.message);
      allPassed = false;
    }

    summary.addResult('INTEGRITY', allPassed, 'schemaValidation');
  });

  test('@integrity known pokemon have expected primary types', async () => {
    let allPassed = true;

    for (const [name, expectedType] of Object.entries(validTypeExpectations)) {
      try {
        const { response, data } = await helper.getPokemon(name);
        if (response.status() !== 200 || !data) {
          console.error(`Failed fetch for ${name}`);
          allPassed = false;
          continue;
        }
        const typeNames = data.types.map(t => t.type.name);
        expect(typeNames).toContain(expectedType);
      } catch (err) {
        console.error(err.message);
        allPassed = false;
      }
    }

    summary.addResult('INTEGRITY', allPassed, 'typeCheck');
  });
});
