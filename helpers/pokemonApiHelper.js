class PokemonApiHelper {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getPokemon(id) {
        const response = await this.apiContext.get(`pokemon/${id}`);
        const data = await response.json().catch(() => null);
        return { response, data };
    }

    async getPokemonSpecies(id) {
        const response = await this.apiContext.get(`pokemon-species/${id}`);
        const data = await response.json().catch(() => null);
        return { response, data };
    }
}

module.exports = { PokemonApiHelper };
