const validPokemon = [
    'charizard',
    'squirtle',
    'pidgey',
    'pikachu',
    'jigglypuff',
    'snorlax',
    'mewtwo',
    'hoothoot',
];

const validPokemonIds = [6, 7, 16, 25, 39, 143, 150, 163];

const validTypeExpectations = {
    charizard: 'fire',
    squirtle: 'water',
    pidgey: 'flying',
    pikachu: 'electric',
    jigglypuff: 'normal',
    snorlax: 'normal',
    mewtwo: 'psychic',
    hoothoot: 'flying',
};

const invalidPokemon = [
    '"squirtle"',
    'notapokemon',
    '123abc',
    '!@#$%',
    ' squirtle',
    '0',
    '11111',
    'hoot hoot',
];

const invalidPokemonIds = [-6, 0, 9999, 123456, 999999999999, 1.43, 'a', -999999999999];

const invalidTypeExpectations = {
    firelizard: 'fire',
    squirtle: 'meltedIce',
    pidgey: 'cartoon',
    pikachu: 'pikachu',
    jigglypuff: '',
    snorlax: ' ',
    mewtoo: 'psychic',
    hoothoot: 'cuddly',
};

const silentlyAcceptedPokemonInputs = ['', ' ', '        ']

const malformedInputs = [...invalidPokemon, ...invalidPokemonIds];

export {
    validPokemon, validPokemonIds, validTypeExpectations,
    invalidPokemon, invalidPokemonIds, invalidTypeExpectations,
    silentlyAcceptedPokemonInputs, malformedInputs
}
