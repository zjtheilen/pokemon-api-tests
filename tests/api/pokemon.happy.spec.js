const { test, expect, request } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');
const { validPokemon } = require('../../config/pokemonTestData')

test.describe('Pokemon API - Happy Path', () => {
    let apiContext;
    let helper;

    test.beforeAll(async () => {
        apiContext = await createPokemonApiContext();

        helper = new PokemonApiHelper(apiContext);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('@happy pokemon lookup test', async () => {
        let allPassed = true;
        for (const monster of validPokemon) {
            const { response, data } = await helper.getPokemon(monster);
            expect(response.status()).toBe(200);

            if (!data) {
                console.error(`Failed for ${monster}: data is null`);
                allPassed = false;
                continue;
            }

            try {
                expect(data.name).toBe(monster);
            } catch (err) {
                console.error(`Failed for ${monster}: ${err.message}`);
                allPassed = false;
            }
        }
        summary.addResult('happy', allPassed)
    });
});
