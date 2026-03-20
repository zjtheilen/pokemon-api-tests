const { test, expect } = require('@playwright/test');
const { PokemonApiHelper } = require('../.././helpers/pokemonApiHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');
const summary = require('../.././helpers/testSummaryHelper');
const { validPokemon } = require('../../config/pokemonTestData');

test.describe('Pokemon API - Happy Path', () => {
  let apiContext;
  let helper;

  test.beforeAll(async () => {
    apiContext = await createPokemonApiContext();
    helper = new PokemonApiHelper(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
    summary.exportJson();
  });

  test('@happy pokemon lookup test', async () => {
    let allPassed = true;

    for (const monster of validPokemon) {
      try {
        const { response, data } = await helper.getPokemon(monster);
        if (response.status() !== 200 || !data) {
          console.error(`Failed for ${monster}`);
          allPassed = false;
          continue;
        }
        expect(data.name).toBe(monster);
      } catch (err) {
        console.error(err.message);
        allPassed = false;
      }
    }

    summary.addResult('HAPPY', allPassed);
  });
});
