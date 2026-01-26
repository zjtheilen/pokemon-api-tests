const { test, expect, request } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const { validateAbilities, validateTypes, validateStats } = require('../../helpers/validationHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');
const { validPokemonIds, typeExpectations } = require('../../config/pokemonTestData')

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
        let allPassed = true;
        for (const id of validPokemonIds) {
            const { data: pokemonData } = await helper.getPokemon(id);
            const { data: speciesData } = await helper.getPokemonSpecies(id);

            if (!pokemonData || !speciesData) {
                console.error(`Failed fetch for ${id}`);
                allPassed = false;
                continue;
            }

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

        let allPassed = true;
        for (const [name, expectedType] of Object.entries(typeExpectations)) {
            const { response, data } = await helper.getPokemon(name);

            if (response.status() !== 200 || !data) {
                console.error(`Failed fetch for ${name}: status ${response.status()}`);
                allPassed = false;
                continue;
            }

            const typeNames = data.types.map(t => t.type.name);

            try {
                expect(typeNames).toContain(expectedType);
            } catch (err) {
                console.error(`Failed for ${name}: expected ${expectedType}`);
                allPassed = false;
            }
        }
        summary.addResult('integrity', allPassed);
    });
});
