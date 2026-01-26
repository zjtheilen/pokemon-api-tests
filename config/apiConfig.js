import { request } from '@playwright/test';

export async function createPokemonApiContext() {
  return await request.newContext({
    baseURL: 'https://pokeapi.co/api/v2/',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  });
}

export async function createJsonPlaceholderApiContext() {
  return await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  });
}
