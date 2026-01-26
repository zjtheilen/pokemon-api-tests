const { test, expect, request } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const { validateAbilities, validateTypes, validateStats } = require('../../helpers/validationHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');

test.describe('Pokemon API - Data Integrity & Relationships', () => {
    let apiContext;
    let helper;

    test.beforeAll(async () => {
        apiContext = await createPokemonApiContext();

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

            try {
                expect(pokemonData.name).toBe(speciesData.name);
            } catch (err) {
                console.error(`Failed for ${id}: ${err.message}`);
                allPassed = false;
            }
        }
        summary.addResult('integrity', allPassed);
    });

    test('@integrity pokemon responses contain required abilities, types, and stats', async () => {
        const { data } = await helper.getPokemon('squirtle');

        let allPassed = true;
        try {
            validateAbilities(data);
            validateStats(data);
            validateTypes(data);
        } catch (err) {
            console.error(`Validation failed for squirtle: ${err.message}`);
            allPassed = false;
        }

        summary.addResult('integrity', allPassed);
    });

    test('@integrity known pokemon have expected primary types', async () => {
        const expectations = {
            pikachu: 'electric',
            squirtle: 'water',
            charizard: 'fire'
        };

        let allPassed = true;
        for (const [name, expectedType] of Object.entries(expectations)) {
            const { response, data } = await helper.getPokemon(name);
            expect(response.status()).toBe(200);
            expect(data).not.toBeNull();

            const typeNames = data.types.map(t => t.type.name);
            expect(typeNames).toContain(expectedType);

            try {
                expect(typeNames).toContain(expectedType);
            } catch (err) {
                console.error(`Failed for ${name} / ${expectedType}: ${err.message}`)
                allPassed = false;
            }
        }
        summary.addResult('integrity', allPassed);
    });
});
