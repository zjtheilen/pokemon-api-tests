const fetch = require('node-fetch');

const BASE_URL = 'https://pokeapi.co/api/v2';

async function getPokemon(idOrName) {
    const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    return await res.json();
}

async function getPokemonSpecies(idOrName) {
    const res = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
    return await res.json();
}

async function getEvolutionChain(id) {
    const res = await fetch(`${BASE_URL}/evolution-chain/${id}`);
    return await res.json();
}

module.exports = {
    getPokemon,
    getPokemonSpecies,
    getEvolutionChain
};