const { test, expect } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');
const { invalidPokemon, invalidPokemonIds, silentlyAcceptedPokemonInputs } = require('../../config/pokemonTestData');
const { validatePokemonErrorStructure } = require('../../helpers/validationHelper');

test.describe('Pokemon API - Negative and Edge Cases', () => {
    let apiContext;
    let helper;

    test.beforeAll(async () => {
        apiContext = await createPokemonApiContext();
        helper = new PokemonApiHelper(apiContext);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test.describe('@negative malformed inputs', () => {

        test('invalid pokemon names return 400 or 404', async () => {
            let allPassed = true;

            for (const name of invalidPokemon) {
                const { response } = await helper.getPokemon(name);

                if (![400, 404].includes(response.status())) {
                    console.error(`Unexpected status for '${name}': ${response.status()}`);
                    allPassed = false;
                }
            }

            summary.addResult('negative', allPassed);
        });

        test('invalid pokemon IDs return 400 or 404', async () => {
            let allPassed = true;

            for (const id of invalidPokemonIds) {
                const { response } = await helper.getPokemon(id);

                if (![400, 404].includes(response.status())) {
                    console.error(`Unexpected status for ID '${id}': ${response.status()}`);
                    allPassed = false;
                }
            }

            summary.addResult('negative', allPassed);
        });

    });

    test.describe('@negative error structure consistency', () => {

        test('invalid inputs have consistent error structure', async () => {
            let allPassed = true;
            const combinedInputs = [...invalidPokemon, ...invalidPokemonIds];

            for (const input of combinedInputs) {
                const { response, data } = await helper.getPokemon(input);

                if ([400, 404].includes(response.status())) {
                    if (data && (data.name || data.id || data.abilities)) {
                        console.error(`Unexpected pokemon structure returned for '${input}'`);
                        allPassed = false;
                    }

                }
            }

            summary.addResult('negative', allPassed);
        });

    });

    test.describe('@negative silently accepted inputs', () => {

        test('empty inputs return base pokemon list', async () => {
            let allPassed = true;

            for (const input of silentlyAcceptedPokemonInputs) {
                const { response, data } = await helper.getPokemon(input);

                if (response.status() !== 200) {
                    console.error(`Expected 200 for '${input}', got ${response.status()}`);
                    allPassed = false;
                    continue;
                }

                if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
                    console.error(`Expected list response for '${input}'`);
                    allPassed = false;
                }
            }

            summary.addResult('negative', allPassed);
        });

    });

});

