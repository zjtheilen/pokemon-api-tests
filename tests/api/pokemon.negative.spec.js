const { test, expect, request } = require('@playwright/test');
const PokemonApiHelper = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');

test.describe('Pokemon API - Negative and Edge Cases', () => {
    let apiContext;
    let helper;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
        helper = new PokemonApiHelper(apiContext);
    });

    test.afterAll(async () => {
        // summary.printSummary();
        await apiContext.dispose();
    });

    const invalidInputs = ['zach', 'notapokemon', '123abc', '!@#$%', -1, 0, 9999, 123456];

    test('@negative invalid pokemon identifiers return 400 or 404', async () => {
        const allPassed = true;
        for (const input of invalidInputs) {
            const { response } = await helper.getPokemon(input);
            expect([400, 404]).toContain(response.status());

            if (![400, 404].includes(response.status())) {
                let allPassed = false;
            }
        }
        summary.addResult(allPassed);
    });

    test('@negative invalid inputs have consistent error structure', async () => {
        const allPassed = true;
        for (const input of invalidInputs) {
            const { response, data } = await helper.getPokemon(input);

            if (data) {
                expect(data).toHaveProperty('detail');

                if (!'detail' in data) {
                    let allPassed = false;
                }
            }
        }
        summary.addResult(allPassed);
    });
});
