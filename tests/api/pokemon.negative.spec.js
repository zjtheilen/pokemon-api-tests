const { test, expect, request } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');

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

    const invalidInputs = ['zach', 'notapokemon', '123abc', '!@#$%', -1, 0, 9999, 123456];

    test('@negative invalid pokemon identifiers return 400 or 404', async () => {
        let allPassed = true;
        for (const input of invalidInputs) {
            const { response } = await helper.getPokemon(input);
            try {
                expect([400, 404]).toContain(response.status());
            } catch (err) {
                console.error(`Failure for ${input}: ${err.message}`);
                allPassed = false;
            }
        }
        summary.addResult('negative', allPassed);
    });

    test('@negative invalid inputs have consistent error structure', async () => {
        let allPassed = true;
        for (const input of invalidInputs) {
            const { data } = await helper.getPokemon(input);

            if (data) {
                try {
                    expect(data).toHaveProperty('detail');
                } catch (err) {
                    console.error(`Failure for ${data}: ${err.message}`)
                    allPassed = false;
                }
            }
        }
        summary.addResult('negative', allPassed);
    });
});
