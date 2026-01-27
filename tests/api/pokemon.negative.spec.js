const { test, expect } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');
const { invalidPokemon, invalidPokemonIds } = require('../../config/pokemonTestData');

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

    test('@negative invalid pokemon names return 400 or 404', async () => {
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

    test('@negative invalid pokemon IDs return 400 or 404', async () => {
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

    test('@negative invalid inputs have consistent error structure', async () => {
        let allPassed = true;
        const combinedInputs = [...invalidPokemon, ...invalidPokemonIds];

        for (const input of combinedInputs) {
            const { data } = await helper.getPokemon(input);

            if (data) {
                if (!data.hasOwnProperty('detail')) {
                    console.error(`Invalid structure for '${input}':`), {
                        name: data?.name,
                        id: data?.id,
                    }
                    allPassed = false;
                }
            }
        }
        summary.addResult('negative', allPassed);
    });
});
