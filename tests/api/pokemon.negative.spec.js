const { test, expect } = require('@playwright/test');
const { PokemonApiHelper } = require('../../helpers/pokemonApiHelper');
const summary = require('../../helpers/testSummaryHelper');
const { createPokemonApiContext } = require('../../config/apiConfig');
const { silentlyAcceptedPokemonInputs, malformedInputs } = require('../../config/pokemonTestData');

test.describe('Pokemon API - Negative and Edge Cases', () => {
    let apiContext;
    let helper;

    test.beforeAll(async () => {
        apiContext = await createPokemonApiContext();
        helper = new PokemonApiHelper(apiContext);
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test.describe('@negative malformed inputs', () => {

        for (const input of malformedInputs) {
            const typeName = typeof input;
            test(`invalid input ${input} (${typeName}) returns 400/404`, async () => {
                const { response } = await helper.getPokemon(input);
                const passed = [400, 404].includes(response.status());

                if (!passed) {
                    console.error(`Unexpected status for '${input}' (${typeName}): ${response.status()}`);
                }

                summary.addResult('negative', passed, 'malformed');

                summary.domains.negative.sub = summary.domains.negative.sub || {};
                summary.domains.negative.sub.malformed = summary.domains.negative.sub.malformed || { passed: 0, failed: 0 };
                summary.domains.negative.sub.malformed[passed ? 'passed' : 'failed']++;

                expect(passed).toBe(true);
            });
        }
    });

    test.describe('@negative invalid entity protection', () => {

        for (const input of malformedInputs) {
            const typeName = typeof input;
            test(`invalid input ${input} (${typeName}) does not return valid Pokemon data`, async () => {
                const { data } = await helper.getPokemon(input);

                const passed = !data?.name && !data?.id;

                if (!passed) {
                    console.error(`Unexpected Pokemon data returned for '${input}' (${typeName}):`, data);
                }

                summary.addResult('negative', passed, 'invalidEntity');

                summary.domains.negative.sub = summary.domains.negative.sub || {};
                summary.domains.negative.sub.invalidEntity = summary.domains.negative.sub.invalidEntity || { passed: 0, failed: 0 };
                summary.domains.negative.sub.invalidEntity[passed ? 'passed' : 'failed']++;

                expect(passed).toBe(true);
            });
        }
    });

    test.describe('@negative silently accepted inputs', () => {
        for (const input of silentlyAcceptedPokemonInputs) {
            test(`empty/silent input '${input}' returns base Pokemon list`, async () => {
                const { response, data } = await helper.getPokemon(input);

                const passed = response.status() === 200
                    && Array.isArray(data.results)
                    && data.results.length > 0;

                if (!passed) {
                    console.error(`Expected base Pokemon list for '${input}', got:`, data);
                }

                summary.addResult('negative', passed, 'silent');

                summary.domains.negative.sub = summary.domains.negative.sub || {};
                summary.domains.negative.sub.silent = summary.domains.negative.sub.silent || { passed: 0, failed: 0 };
                summary.domains.negative.sub.silent[passed ? 'passed' : 'failed']++;

                expect(passed).toBe(true);
            });
        }
    });
});
