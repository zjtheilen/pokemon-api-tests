export function logPokemonData(input, data) {
    if (!data || !data.name || !data.id) {
        console.warn(`⚠️ Invalid structure for '${input}':`, {
            name: data?.name,
            id: data?.id
        });
        return false;
    }

    console.log(`✅ Fetched '${data.name}' (ID: ${data.id})`);
    return true;
}