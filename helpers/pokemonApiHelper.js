const { request } = require('@playwright/test');

class PokemonApiHelper {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    // fetch /pokemon/{id or name}
    async getPokemon(identifier) {
        const response = await this.apiContext.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
        const data = await response.json().catch(() => null);
        return { response, data };
    }

    // fetch /pokemon-species/{id}
    async getPokemonSpecies(id) {
        const response = await this.apiContext.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const data = await response.json().catch(() => null);
        return { response, data };
    }
}

module.exports = PokemonApiHelper;