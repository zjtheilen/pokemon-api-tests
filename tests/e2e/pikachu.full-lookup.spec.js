const { test, expect } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');

test('E2E: Pikachu full lookup', async () => {
    let apiContext;
    apiContext = await createPokemonApiContext();
    const helper = new PokemonApiHelper(apiContext);

    const { data: pokemon } = await helper.getPokemon('pikachu');
    const { data: species } = await helper.getPokemonSpecies(pokemon.id);

    let allPassed = true;

    expect(pokemon.name).toBe(species.name);
    expect(pokemon.types.map(t => t.type.name)).toContain('electric');

    summary.addResult('e2e', allPassed);

    await apiContext.dispose();
});
