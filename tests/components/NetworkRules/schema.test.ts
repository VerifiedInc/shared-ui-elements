import { describe, expect, test } from 'vitest';

import {
  createNetworkRuleFormSchema,
  type NetworkRuleCatalogMetadata,
  type NetworkRuleFormValues,
  type NetworkRuleMetadataFormValues,
  type NetworkRuleMetadataType,
} from '../../../src/components/NetworkRules';

const valid: NetworkRuleFormValues = {
  name: 'Rule',
  status: 'A',
  notes: null,
  enabled: true,
  startDate: '2026-10-01',
  endDate: '2026-11-01',
  metadata: [],
  conditions: [{ key: 'color', operator: 'EQ', values: ['r'] }],
};

// No catalog metadata: the section is not offered, so only an empty list passes.
const schema = createNetworkRuleFormSchema(undefined);

const catalogMetadata: NetworkRuleCatalogMetadata = {
  types: ['string', 'number', 'boolean'],
  limits: { maxEntries: 2, maxKeyLength: 4, maxValueLength: 5 },
  keyPresets: [],
  valuePresets: [],
};
const withMetadata = createNetworkRuleFormSchema(catalogMetadata);

function issuePaths(
  target: ReturnType<typeof createNetworkRuleFormSchema>,
  values: unknown,
): string[] {
  const result = target.safeParse(values);
  if (result.success) return [];
  return result.error.issues.map((issue) => issue.path.join('.'));
}

const row = (
  key: string,
  type: NetworkRuleMetadataType,
  value: string,
): NetworkRuleMetadataFormValues => ({ key, type, value });

describe('createNetworkRuleFormSchema', () => {
  test('accepts a complete rule', () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });

  test('requires a name and a status', () => {
    expect(issuePaths(schema, { ...valid, name: '   ' })).toContain('name');
    expect(issuePaths(schema, { ...valid, status: '' })).toContain('status');
  });

  test('requires at least one condition, each with key, operator and a value', () => {
    expect(issuePaths(schema, { ...valid, conditions: [] })).toContain(
      'conditions',
    );
    expect(
      issuePaths(schema, {
        ...valid,
        conditions: [{ key: '', operator: '', values: [] }],
      }),
    ).toEqual(
      expect.arrayContaining([
        'conditions.0.key',
        'conditions.0.operator',
        'conditions.0.values',
      ]),
    );
  });

  test('rejects an end on or before the start, on the end field', () => {
    expect(
      issuePaths(schema, {
        ...valid,
        startDate: '2026-11-01',
        endDate: '2026-10-01',
      }),
    ).toEqual(['endDate']);
    expect(
      issuePaths(schema, {
        ...valid,
        startDate: '2026-10-01',
        endDate: '2026-10-01',
      }),
    ).toEqual(['endDate']);
    expect(
      issuePaths(schema, {
        ...valid,
        startDate: '2026-10-01',
        endDate: '2026-10-02',
      }),
    ).toEqual([]);
  });

  test('dates are optional', () => {
    expect(
      issuePaths(schema, { ...valid, startDate: null, endDate: null }),
    ).toEqual([]);
  });

  test('does not know any catalog vocabulary', () => {
    expect(
      schema.safeParse({
        ...valid,
        status: 'ANYTHING',
        conditions: [{ key: 'whatever', operator: 'SOMETHING', values: ['x'] }],
      }).success,
    ).toBe(true);
  });
});

describe('metadata rows', () => {
  const paths = (metadata: NetworkRuleMetadataFormValues[]): string[] =>
    issuePaths(withMetadata, { ...valid, metadata });

  test('are refused when the catalog offers no metadata', () => {
    expect(
      issuePaths(schema, { ...valid, metadata: [row('k', 'string', 'v')] }),
    ).toContain('metadata');
  });

  test('follow the catalog limits: key length, string length, entry count', () => {
    expect(paths([row('k', 'string', 'v')])).toEqual([]);
    expect(paths([row('toolong', 'string', 'v')])).toContain('metadata.0.key');
    expect(paths([row('k', 'string', 'toolong')])).toContain(
      'metadata.0.value',
    );
    expect(
      paths([
        row('a', 'string', 'v'),
        row('b', 'string', 'v'),
        row('c', 'string', 'v'),
      ]),
    ).toContain('metadata');
  });

  test('rejects a repeated key on the repeat, ignoring case and spacing', () => {
    expect(paths([row('k', 'string', 'v'), row(' K ', 'string', 'v')])).toEqual(
      ['metadata.1.key'],
    );
  });

  test('a number must survive as a JSON number; a boolean is true or false', () => {
    expect(paths([row('n', 'number', '25')])).toEqual([]);
    expect(paths([row('n', 'number', 'abc')])).toEqual(['metadata.0.value']);
    // 2^53 + 1 rounds to 2^53 as a double, so storing it would change it.
    expect(paths([row('n', 'number', '9007199254740993')])).toEqual([
      'metadata.0.value',
    ]);
    expect(paths([row('b', 'boolean', 'true')])).toEqual([]);
    expect(paths([row('b', 'boolean', 'yes')])).toEqual(['metadata.0.value']);
  });
});
