const { test, expect, request } = require('@playwright/test');

test.describe('Pokemon API – Pokemon lookup', () => {
    let apiContext;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('pokemon lookup test', async () => {

        const pokemon = ['squirtle', 'pidgey', 'pikachu', 'jigglypuff', 'snorlax', 'mewtwo', 'hoothoot'];

        for (const monster of pokemon) {
            const response = await apiContext.get(
                `https://pokeapi.co/api/v2/pokemon/${monster}`
            );

            expect(response.status()).toBe(200);

            const { 
                name: pokeName, 
                id: pokeId, 
                abilities: pokeAbilities, 
                stats: pokeStats, 
                types: pokeTypes 
            } = await response.json();

            expect(pokeName).toBe(monster);

            console.log(`✔ Verified ${pokeName} (ID: ${pokeId})`);
        }

        console.log('Pokemon check complete')

    });

    test('lookup bogus pokemon', async () => {
        const notPokemon = 'zach';

        console.log(`Ensuring ${notPokemon} pokemon does not exist...`)

        const response = await apiContext.get(
            `https://pokeapi.co/api/v2/pokemon/${notPokemon}`
        );

        expect(response.status()).toBe(404);

        console.log(`✔ Confirmed ${notPokemon} is not a valid Pokemon name - response status: ${response.status()}`);

    })
})
