const { test, expect, request } = require('@playwright/test');

test('basic GET request to Pokemon API', async () => {
    const apiContext = await request.newContext();
    
    const response = await apiContext.get('https://pokeapi.co/api/v2/pokemon/pikachu');
    
    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.name).toBe('pikachu');

    console.log('Pokemon name:', data.name);

    await apiContext.dispose();
});