const { test, expect, request } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');

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
        const pokemon = ['squirtle', 'pidgey', 'pikachu', 'jigglypuff', 'snorlax', 'mewtwo', 'hoothoot'];

        let allPassed = true;
        for (const monster of pokemon) {
            const { response, data } = await helper.getPokemon(monster);
            try {
                expect(response.status()).toBe(200);
            } catch (err) {
                console.error(`Failed for ${monster}: ${err.message}`);
                allPassed = false;
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
