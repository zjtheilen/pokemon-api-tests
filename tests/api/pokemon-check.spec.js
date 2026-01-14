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

    test('invalid pokemon identifiers return 400 or 404', async () => {
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

    // Phase 4: Data Integrity & Relationships
    test('pokemon consistency across endpoints', async () => {
        const pokemonIds = [
            25,  // pikachu
            7,   // squirtle
            150, // mewtwo
            163, // hoothoot
            300, // skitty 
        ];

        for (const id of pokemonIds) {
            const pokemonResponse = await apiContext.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            expect(pokemonResponse.status()).toBe(200);
            const { name: pokemonName } = await pokemonResponse.json();

            const speciesResponse = await apiContext.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            expect(speciesResponse.status()).toBe(200);
            const { name: speciesName } = await speciesResponse.json();

            expect(pokemonName).toBeTruthy();
            expect(speciesName).toBeTruthy();
            expect(pokemonName).toBe(speciesName);


            console.log(`✔ ID ${id}: /pokemon and /pokemon-species agree on name "${pokemonName}"`);
        }
    });

    test('pokemon responses contain required abilities, types, and stats', async () => {
        const response = await apiContext.get(`https://pokeapi.co/api/v2/pokemon/squirtle`);
        expect(response.status()).toBe(200);
        
        const { abilities, types, stats } = await response.json();

        //  Abilities
        expect(Array.isArray(abilities)).toBe(true);
        expect(abilities.length).toBeGreaterThan(0);

        for (const ability of abilities) {
            expect(ability).toHaveProperty('ability');
            expect(ability.ability).toHaveProperty('name');
            expect(typeof ability.ability.name).toBe('string');
        }

        // Types
        expect(Array.isArray(types)).toBe(true);
        expect(types.length).toBeGreaterThan(0);

        for (const type of types) {
            expect(type).toHaveProperty('type');
            expect(type.type).toHaveProperty('name');
            expect(typeof type.type.name).toBe('string');
        }

        // Stats
        expect(Array.isArray(stats)).toBe(true);
        expect(stats.length).toBeGreaterThan(0);

        for (const stat of stats) {
            expect(stat).toHaveProperty('stat');
            expect(stat.stat).toHaveProperty('name');
            expect(stat).toHaveProperty('base_stat');
            expect(typeof stat.base_stat).toBe('number');
            expect(stat.base_stat).toBeGreaterThan(0);
        }

        console.log('✔ Abilities, types, and stats validated successfully');
    })

});
