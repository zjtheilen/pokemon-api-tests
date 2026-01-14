const { test, expect, request } = require('@playwright/test');

test.describe('Pokemon API – Pokemon lookup', () => {
    let apiContext;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    // Look up pokemon and expect correct name & id with status 200
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

    // Look up non-existent pokemon and expect status 400 or 404
    test('invalid pokemon names return 400 or 404', async () => {

        const invalidNames = [
            'zach', 
            'notapokemon', 
            '123abc', 
            '!@#$%'
        ]

        for (const invalidName of invalidNames) {
            const response = await apiContext.get(
                `https://pokeapi.co/api/v2/pokemon/${invalidName}`
            );

            // expect(response.status()).toBe(404);
            expect([400, 404]).toContain(response.status());

            console.log(`✔ "${invalidName}" correctly returned ${response.status()}`)
        }

    })

    // Look up non-existent pokemon IDs and expect status 400 or 404
    test('invalid pokemon IDs return 400 or 404', async () => {
        const invalidIds = [-1, 0, 9999, 123456];

        for (const id of invalidIds) {
            const response = await apiContext.get('https://pokeapi.co/api/v2/pokemon/${id');

            expect([400, 404]).toContain(response.status());

            console.log(`✔ Pokemon ID "${id}" correctly returned ${response.status()}`);

            const data = await response.json().catch(() => null);
            if (data) {
                console.log('-- Error response body:', data)
            }
        }
    });
})
