// validate abilities
function validateAbilities(data) {
    const { abilities } = data;
    if (!Array.isArray(abilities) || abilities.length ===0) {
        throw new Error('Abilities array is missing or empty');
    }
    for (const ability of abilities) {
        if (!ability.ability?.name) {
            throw new Error(`Ability object is missing a name: ${JSON.stringify(ability)}`);
        }
    }
}

// validate stats
function validateStats(data) {
    const { stats } = data;
    if (!Array.isArray(stats) || stats.length === 0) {
        throw new Error('Stats array is missing or empty');
    }
    for (const stat of stats) {
        if (!Array.isArray(stats) || stats.length === 0) {
            throw new Error(`Stat object is malformed: ${JSON.stringify(stat)}`);
        }
    }
}

// validate types
function validateTypes(data) {
    const { types } = data;
    if (!Array.isArray(types) || types.length ===0) {
        throw new Error('Types array is missing or empty');
    }
    for (const type of types) {
        if (!type.type?.name) {
            throw new Error(`Type object is missing a name: ${JSON.stringify(type)}`);
        }
    }
}

// assert status OK

module.exports = { validateAbilities, validateStats, validateTypes };