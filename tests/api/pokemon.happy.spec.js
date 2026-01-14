const { test, expect, request } = require('@playwright/test');
const PokemonApiHelper = require('../../helpers/pokemonApiHelper');

test.describe('Pokemon API - Happy Path', () => {
    let apiContext;
    let helper;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
        helper = new PokemonApiHelper(apiContext);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('@happy pokemon lookup test', async () => {
        const pokemon = ['squirtle', 'pidgey', 'pikachu', 'jigglypuff', 'snorlax', 'mewtwo', 'hoothoot'];

        for (const monster of pokemon) {
            const { response, data } = await helper.getPokemon(monster);
            expect(response.status()).toBe(200);
            expect(data.name).toBe(monster);

            console.log(`✔ Verified ${data.name} (ID: ${data.id})`);
        }

        console.log('Pokemon check complete\n');
    }); 
});
