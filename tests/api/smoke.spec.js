const { test, expect, request } = require('@playwright/test');

test.describe('Pokemon API basic tests', () => {
    let apiContext;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('pikachu test', async () => {    
        const response = await apiContext.get('https://pokeapi.co/api/v2/pokemon/pikachu');
        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(data.name).toBe('pikachu');
        console.log('Pokemon name:', data.name);

        console.log('\n--- Pikachu Test Complete ---\n');
    });

    test('squirtle test', async () => {
        const response = await apiContext.get('https://pokeapi.co/api/v2/pokemon/squirtle');
        expect(response.status()).toBe(200);

        const data = await response.json();

        const { 
            name: pokeName, 
            id: pokeId, 
            abilities: pokeAbilities, 
            stats: pokeStats, 
            types: pokeTypes 
        } = data;

        console.log("Pokemon name:", pokeName);
        console.log("Pokemon ID:", pokeId);

        console.log('Pokemon abilities:')
        for (const ability of pokeAbilities) {
            console.log('-- ability:', ability.ability.name)
        }

        console.log('Pokemon stats:')
        for (const stat of pokeStats) {
            console.log('-- stat:', stat.stat.name)
        }

        console.log('Pokemon types:');
        for (const type of pokeTypes) {
            console.log('-- type:', type.type.name);
        }

        console.log('\n--- Squirtle Test Complete ---\n');
    });
})
