const { test, expect } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');

test('E2E: Pikachu full lookup @e2e', async () => {
    const apiContext = await createPokemonApiContext();
    const helper = new PokemonApiHelper(apiContext);

    try {
        const { data: pokemon } = await helper.getPokemon('pikachu');
        const { data: species } = await helper.getPokemonSpecies(pokemon.id);

        expect(pokemon.name).toBe(species.name);
        expect(pokemon.types.map(t => t.type.name)).toContain('electric');

        summary.addResult('e2e', true);
    } catch (err) {
        summary.addResult('e2e', false);
        throw err;
    } finally {
        await apiContext.dispose();
    }
});
