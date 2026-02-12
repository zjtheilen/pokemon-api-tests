const { test, expect } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');

const malformedInputs = [
  '123abc',
  '!@#$%',
  ' hoot',
  'hoot hoot',
  -6,
  1.43
];

const silentInputs = [
  '',
  ' ',
  '        '
];

const invalidEntityInputs = [
  'notapokemon',
  'zach',
  '0',
  11111,
  9999,
  123456,
  999999999999,
  -999999999999
];

test.describe('@negative malformed inputs', () => {
  for (const input of malformedInputs) {
    test(`invalid input "${input}" returns 400/404`, async () => {
      const apiContext = await createPokemonApiContext();
      const helper = new PokemonApiHelper(apiContext);
      let passed = false;

      try {
        const { response } = await helper.getPokemon(input);
        const status = response.status();
        passed = status === 400 || status === 404;
        expect(passed).toBeTruthy();
      } finally {
        summary.addResult('negative', passed, 'malformed');
        await apiContext.dispose();
      }
    });
  }
});

test.describe('@negative silent inputs', () => {
  for (const input of silentInputs) {
    test(`silent input "${input}" returns base Pokemon list`, async () => {
      const apiContext = await createPokemonApiContext();
      const helper = new PokemonApiHelper(apiContext);
      let passed = false;

      try {
        const { response, data } = await helper.getPokemon(input);
        passed =
          response.status() === 200 &&
          Array.isArray(data.results);

        expect(passed).toBeTruthy();
      } finally {
        summary.addResult('negative', passed, 'silent');
        await apiContext.dispose();
      }
    });
  }
});

test.describe('@negative invalid entity inputs', () => {
  for (const input of invalidEntityInputs) {
    test(`invalid input "${input}" does not return valid Pokemon data`, async () => {
      const apiContext = await createPokemonApiContext();
      const helper = new PokemonApiHelper(apiContext);
      let passed = false;

      try {
        const { response, data } = await helper.getPokemon(input);
        passed =
          (response.status() === 400 || response.status() === 404) &&
          (!data || !data.name);

        expect(passed).toBeTruthy();
      } finally {
        summary.addResult('negative', passed, 'invalidEntity');
        await apiContext.dispose();
      }
    });
  }
});
