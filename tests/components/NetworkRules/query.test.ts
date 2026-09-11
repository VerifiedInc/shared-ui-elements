import { describe, expect, test, vi } from 'vitest';

import {
  buildNetworkRulesFilterFields,
  buildNetworkRulesListQuery,
  conditionFilterId,
  NETWORK_RULES_FILTER_IDS,
  type NetworkRuleCatalog,
} from '../../../src/components/NetworkRules';

import { catalog, createServices, thingsSource } from './fixtures';

const sources = createServices().sources;

describe('buildNetworkRulesFilterFields', () => {
  test('builds one filter per catalog key, with the control its shape implies', () => {
    const fields = buildNetworkRulesFilterFields(
      catalog,
      catalog.statuses,
      sources,
    );

    expect(
      fields.map((field) => [field.id, field.kind, field.columnId]),
    ).toEqual([
      ['status', 'multiSelect', 'status'],
      ['enabled', 'boolean', 'enabled'],
      ['conditionKey', 'multiSelect', undefined],
      // A key's own filter is not a column: it only reaches the server.
      ['condition.color', 'multiSelect', undefined],
      ['condition.remote', 'multiSelect', undefined],
      ['condition.text', 'text', undefined],
    ]);

    // Status options carry the code, labelled for display.
    expect(fields[0].options).toEqual([
      { label: 'In Network', value: 'IN_NETWORK' },
      { label: 'Out of Network', value: 'OUT_OF_NETWORK' },
    ]);
    // Every catalog key can be picked as "has a condition on".
    expect(fields[2].options?.map((option) => option.value)).toEqual([
      'color',
      'remote',
      'text',
    ]);
    // An inline key filters by its own options, each labelled with the code it is stored as.
    expect(fields[3].options).toEqual([
      { label: 'Red', value: 'r', caption: 'r' },
      { label: 'Green', value: 'g', caption: 'g' },
    ]);
    // Picking every option filters by them all rather than reading as cleared, so the panel's
    // active-filter badge says what the query does.
    expect(
      fields
        .filter((field) => field.kind === 'multiSelect')
        .every((field) => field.selectAllClears === false),
    ).toBe(true);

    // A free-text key matches one term, with the operators the API takes, and offers the brand's
    // saved presets for the key as suggestions.
    expect(fields[5]).toMatchObject({
      label: 'Free Text',
      operators: ['contains', 'equals', 'startsWith', 'endsWith'],
      options: [{ label: 'Gold plan', value: 'Gold plan' }],
    });
  });

  test('searches a remote key through its registered source', async () => {
    const search = vi.spyOn(thingsSource, 'search');
    const [remote] = buildNetworkRulesFilterFields(
      catalog,
      catalog.statuses,
      sources,
    ).filter((field) => field.id === 'condition.remote');

    // A searched option carries its logo, so the panel shows it as the editor does.
    expect(await remote.loadOptions?.(' one ')).toEqual([
      { label: 'Thing One', value: 't1', caption: 't1', logoUrl: null },
    ]);
    expect(search).toHaveBeenCalledWith({ search: 'one', limit: 20 });

    // A blank query lists the first page rather than searching for nothing.
    expect(await remote.loadOptions?.('')).toHaveLength(2);
    expect(search).toHaveBeenLastCalledWith({
      search: undefined,
      limit: 20,
    });
    search.mockRestore();
  });

  test('drops a remote key when no source is registered for it', () => {
    const fields = buildNetworkRulesFilterFields(catalog, catalog.statuses);

    expect(fields.map((field) => field.id)).toEqual([
      'status',
      'enabled',
      'conditionKey',
      'condition.color',
      'condition.text',
    ]);
    // The key can still be filtered on by presence.
    expect(fields[2].options?.map((option) => option.value)).toContain(
      'remote',
    );
  });

  test('filters by a single value when the key takes only one', () => {
    const singleValued: NetworkRuleCatalog = {
      ...catalog,
      keys: [
        {
          key: 'color',
          label: 'Color',
          operators: ['ONE'],
          values: catalog.keys[0].values,
        },
      ],
    };

    expect(buildNetworkRulesFilterFields(singleValued, [])[3].kind).toBe(
      'select',
    );
  });

  test('waits for the catalog with only the rule-level fields', () => {
    const fields = buildNetworkRulesFilterFields(undefined, []);

    expect(fields.map((field) => field.id)).toEqual([
      'status',
      'enabled',
      'conditionKey',
    ]);
    expect(fields[2].options).toEqual([]);
  });
});

describe('buildNetworkRulesListQuery', () => {
  test('sends nothing for an untouched table', () => {
    expect(buildNetworkRulesListQuery({})).toEqual({});
    expect(
      buildNetworkRulesListQuery({
        filterState: {
          [NETWORK_RULES_FILTER_IDS.status]: {
            kind: 'multiSelect',
            values: [],
          },
          [NETWORK_RULES_FILTER_IDS.enabled]: { kind: 'boolean', value: null },
          [NETWORK_RULES_FILTER_IDS.conditionKey]: {
            kind: 'multiSelect',
            values: [],
          },
          [conditionFilterId('color')]: { kind: 'multiSelect', values: [] },
          [conditionFilterId('remote')]: { kind: 'select', value: null },
          [conditionFilterId('text')]: {
            kind: 'text',
            operator: 'contains',
            value: '   ',
          },
        },
        search: '  ',
        sorting: [],
      }),
    ).toEqual({});
  });

  test('maps every control to the list query', () => {
    expect(
      buildNetworkRulesListQuery({
        filterState: {
          [NETWORK_RULES_FILTER_IDS.status]: {
            kind: 'multiSelect',
            values: ['IN_NETWORK'],
          },
          [NETWORK_RULES_FILTER_IDS.enabled]: { kind: 'boolean', value: false },
          [NETWORK_RULES_FILTER_IDS.conditionKey]: {
            kind: 'multiSelect',
            values: ['color', 'text'],
          },
          // Several picked values match any of them; a single-valued key sends one.
          [conditionFilterId('color')]: {
            kind: 'multiSelect',
            values: ['r', 'g'],
          },
          [conditionFilterId('remote')]: { kind: 'select', value: 't1' },
          [conditionFilterId('text')]: {
            kind: 'text',
            operator: 'startsWith',
            value: ' Aviato ',
          },
        },
        search: ' gold ',
        sorting: [{ id: 'name', desc: true }],
      }),
    ).toEqual({
      status: { $in: ['IN_NETWORK'] },
      enabled: false,
      condition: {
        key: ['color', 'text'],
        // An enum key carries the codes themselves, a free-text key a term and how to match it.
        color: ['r', 'g'],
        remote: 't1',
        text: { value: 'Aviato', operator: 'startsWith' },
      },
      search: 'gold',
      $sort: { name: -1 },
    });
  });

  test('keeps every column the table sorts by, in order', () => {
    expect(
      buildNetworkRulesListQuery({
        sorting: [
          { id: 'status', desc: false },
          { id: 'number', desc: true },
        ],
      }).$sort,
    ).toEqual({ status: 1, number: -1 });
  });

  test('sends one code as itself and several as a list', () => {
    const query = buildNetworkRulesListQuery({
      filterState: {
        [conditionFilterId('color')]: { kind: 'multiSelect', values: ['r'] },
        [conditionFilterId('remote')]: {
          kind: 'multiSelect',
          values: ['t1', 't2'],
        },
      },
    });

    expect(query.condition).toEqual({ color: 'r', remote: ['t1', 't2'] });
  });

  test('caps a term at the length the API accepts', () => {
    const query = buildNetworkRulesListQuery({ search: 'x'.repeat(200) });

    expect(query.search).toHaveLength(120);
  });
});
