function validateAbilities(data) {
    const { abilities } = data;
    if (!Array.isArray(abilities) || abilities.length === 0) {
        throw new Error('Abilities array is missing or empty');
    }
    for (const ability of abilities) {
        if (!ability.ability?.name) {
            throw new Error(`Ability object is missing a name: ${JSON.stringify(ability)}`);
        }
    }
}

function validateStats(data) {
    const { stats } = data;
    if (!Array.isArray(stats) || stats.length === 0) {
        throw new Error('Stats array is missing or empty');
    }
    for (const stat of stats) {
        if (!stat.stat?.name || stat.base_stat === undefined) {
            throw new Error(`Stat object is malformed: ${JSON.stringify(stat)}`);
        }
    }
}

function validateTypes(data) {
    const { types } = data;
    if (!Array.isArray(types) || types.length === 0) {
        throw new Error('Types array is missing or empty');
    }
    for (const type of types) {
        if (!type.type?.name) {
            throw new Error(`Type object is missing a name: ${JSON.stringify(type)}`);
        }
    }
}

function validatePokemonStructure(input, data) {
    const valid =
        typeof data === 'object' &&
        typeof data.name === 'string' &&
        typeof data.id === 'number';

    if (!valid) {
        logPokemonData(input, data);
    }

    return valid;
}

function validatePokemonErrorStructure(input, data) {
  const isValid =
    data &&
    typeof data === 'object' &&
    typeof data.detail === 'string';

  if (!isValid) {
    console.error(
      `Invalid error structure for '${input}':`,
      {
        name: data?.name,
        id: data?.id,
        detail: data?.detail,
      }
    );
  }

  return isValid;
}

module.exports = { validateAbilities, validateStats, validateTypes, validatePokemonStructure, validatePokemonErrorStructure };