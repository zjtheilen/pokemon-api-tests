const { test, expect, request } = require('@playwright/test');
const PokemonApiHelper = require('../../helpers/pokemonApiHelper');
const { validateAbilities, validateTypes, validateStats } = require('../../helpers/validationHelper');
const summary = require('../../helpers/testSummaryHelper');

test.describe('Pokemon API - Data Integrity & Relationships', () => {
    let apiContext;
    let helper;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
        helper = new PokemonApiHelper(apiContext);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('@integrity pokemon consistency across endpoints', async () => {
        const pokemonIds = [25, 7, 150, 163, 300];

        let allPassed = true;
        for (const id of pokemonIds) {
            const { data: pokemonData } = await helper.getPokemon(id);
            const { data: speciesData } = await helper.getPokemonSpecies(id);

            expect(pokemonData.name).toBe(speciesData.name);

            if (pokemonData.name !== speciesData.name) {
                let allPassed = false;
            }
        }
        summary.addResult(allPassed);
    });

    test('@integrity pokemon responses contain required abilities, types, and stats', async () => {
        const { data } = await helper.getPokemon('squirtle');

        validateAbilities(data);
        validateStats(data);
        validateTypes(data);

        summary.addResult(true);
    });

    test('@integrity known pokemon have expected primary types', async () => {
        const expectations = {
            pikachu: 'electric',
            squirtle: 'water',
            charizard: 'fire'
        };

        let allPassed = true;
        for (const [name, expectedType] of Object.entries(expectations)) {
            const { data } = await helper.getPokemon(name);
            const typeNames = data.types.map(t => t.type.name);

            expect(typeNames).toContain(expectedType);

            if (!typeNames.includes(expectedType)) {
                let allPassed = false;
            }
        }
        summary.addResult(allPassed);
    });
});
