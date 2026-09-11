import { describe, expect, test } from 'vitest';

import {
  networkRuleFormSchema,
  type NetworkRuleFormValues,
} from '../../../src/components/NetworkRules';

const valid: NetworkRuleFormValues = {
  name: 'Rule',
  status: 'A',
  notes: null,
  enabled: true,
  startDate: '2026-10-01',
  endDate: '2026-11-01',
  conditions: [{ key: 'color', operator: 'EQ', values: ['r'] }],
};

function issuePaths(values: unknown): string[] {
  const result = networkRuleFormSchema.safeParse(values);
  if (result.success) return [];
  return result.error.issues.map((issue) => issue.path.join('.'));
}

describe('networkRuleFormSchema', () => {
  test('accepts a complete rule', () => {
    expect(networkRuleFormSchema.safeParse(valid).success).toBe(true);
  });

  test('requires a name and a status', () => {
    expect(issuePaths({ ...valid, name: '   ' })).toContain('name');
    expect(issuePaths({ ...valid, status: '' })).toContain('status');
  });

  test('requires at least one condition, each with key, operator and a value', () => {
    expect(issuePaths({ ...valid, conditions: [] })).toContain('conditions');
    expect(
      issuePaths({
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
      issuePaths({ ...valid, startDate: '2026-11-01', endDate: '2026-10-01' }),
    ).toEqual(['endDate']);
    expect(
      issuePaths({ ...valid, startDate: '2026-10-01', endDate: '2026-10-01' }),
    ).toEqual(['endDate']);
    expect(
      issuePaths({ ...valid, startDate: '2026-10-01', endDate: '2026-10-02' }),
    ).toEqual([]);
  });

  test('dates are optional', () => {
    expect(issuePaths({ ...valid, startDate: null, endDate: null })).toEqual(
      [],
    );
  });

  test('does not know any catalog vocabulary', () => {
    expect(
      networkRuleFormSchema.safeParse({
        ...valid,
        status: 'ANYTHING',
        conditions: [{ key: 'whatever', operator: 'SOMETHING', values: ['x'] }],
      }).success,
    ).toBe(true);
  });
});
