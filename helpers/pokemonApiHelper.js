const { request } = require('@playwright/test');
const { baseUrl } = require('../config/apiConfig');

class PokemonApiHelper {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getPokemon(identifier) {
        const response = await this.apiContext.get(`${baseUrl}/pokemon/${identifier}`);
        const data = await response.json().catch(() => null);
        return { response, data };
    }

    async getPokemonSpecies(id) {
        const response = await this.apiContext.get(`${baseUrl}/pokemon/${id}`);
        const data = await response.json().catch(() => null);
        return { response, data };
    }
}

module.exports = PokemonApiHelper;