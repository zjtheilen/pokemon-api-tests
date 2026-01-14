const { test, expect, request } = require('@playwright/test');
const PokemonApiHelper = require('../../helpers/pokemonApiHelper');

test.describe('Pokemon API - Negative and Edge Cases', () => {
    let apiContext;
    let helper;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
        helper = new PokemonApiHelper(apiContext);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    const invalidInputs = ['zach', 'notapokemon', '123abc', '!@#$%', -1, 0, 9999, 123456];

    test('invalid pokemon identifiers return 400 or 404', async () => {
        for (const input of invalidInputs) {
            const { response } = await helper.getPokemon(input);
            expect([400, 404]).toContain(response.status());
        }
    });

    test('invalid inputs have consistent error structure', async () => {
        for (const input of invalidInputs) {
            const { response, data } = await helper.getPokemon(input);

            if (data) {
                expect(data).toHaveProperty('detail');
            }
        }
    });
});
