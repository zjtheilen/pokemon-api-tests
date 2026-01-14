const { test, expect, request } = require('@playwright/test');

test.describe('Pokemon API - Pokemon lookup', () => {
    let apiContext;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    // Happy path: valid Pokémon
    test('pokemon lookup test', async () => {
        const pokemon = ['squirtle', 'pidgey', 'pikachu', 'jigglypuff', 'snorlax', 'mewtwo', 'hoothoot'];

        for (const monster of pokemon) {
            const response = await apiContext.get(`https://pokeapi.co/api/v2/pokemon/${monster}`);
            expect(response.status()).toBe(200);

            const { name: pokeName, id: pokeId, abilities, stats, types } = await response.json();
            expect(pokeName).toBe(monster);

            console.log(`✔ Verified ${pokeName} (ID: ${pokeId})`);
        }

        console.log('Pokemon check complete\n');
    });

    // Phase 3: Negative & edge cases
    const invalidInputs = ['zach', 'notapokemon', '123abc', '!@#$%', -1, 0, 9999, 123456];

    test('invalid inputs return proper status codes', async () => {
        for (const input of invalidInputs) {
            const response = await apiContext.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
            const status = response.status();

            expect([400, 404]).toContain(status);
            console.log(`✔ Input "${input}" correctly returned status ${status}`);
        }
    });

    test('invalid inputs have consistent error structure', async () => {
        for (const input of invalidInputs) {
            const response = await apiContext.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
            const status = response.status();
            const body = await response.json().catch(() => null);

            if (body) {
                expect(body).toHaveProperty('detail');
                console.log(`✔ Input "${input}" returned status ${status} with detail: "${body.detail}"`);
            } else {
                console.log(`✔ Input "${input}" returned status ${status} with no JSON body`);
            }
        }
    });
});
