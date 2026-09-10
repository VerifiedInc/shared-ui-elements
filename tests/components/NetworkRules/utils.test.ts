import { describe, expect, test } from 'vitest';

import {
  dayToRuleDate,
  dedupeValues,
  formatRuleDate,
  fromNetworkRuleFormValues,
  getKeyLabel,
  getOperatorLabel,
  getStatusLabel,
  hasInlineOptions,
  hasRemoteSource,
  isOperatorMulti,
  normalizeConditionValues,
  ruleDateToDay,
  toNetworkRuleFormValues,
  toOptions,
} from '../../../src/components/NetworkRules';

import { catalog, rules } from './fixtures';

describe('catalog utils', () => {
  test('labels fall back to the raw code', () => {
    expect(getKeyLabel(catalog, 'color')).toBe('Color');
    expect(getKeyLabel(catalog, 'nope')).toBe('nope');
    expect(getOperatorLabel(catalog, 'EQ')).toBe('equals');
    expect(getOperatorLabel(catalog, 'nope')).toBe('nope');
    expect(getStatusLabel('IN_NETWORK')).toBe('In Network');
    // Unknown statuses fall back to Title Case.
    expect(getStatusLabel('SOME_NEW_STATUS')).toBe('Some New Status');
    expect(getKeyLabel(undefined, 'color')).toBe('color');
  });

  test('operators are multi unless the catalog says otherwise', () => {
    expect(isOperatorMulti(catalog, 'EQ')).toBe(true);
    expect(isOperatorMulti(catalog, 'ONE')).toBe(false);
    expect(isOperatorMulti(catalog, 'unknown')).toBe(true);
  });

  test('key shape is decided by the presence of values.options / values.source', () => {
    const [color, remote, text] = catalog.keys;
    expect(hasInlineOptions(color)).toBe(true);
    expect(hasRemoteSource(color)).toBe(false);
    expect(hasInlineOptions(remote)).toBe(false);
    expect(hasRemoteSource(remote)).toBe(true);
    expect(hasInlineOptions(text)).toBe(false);
    expect(hasRemoteSource(text)).toBe(false);
    expect(hasInlineOptions(undefined)).toBe(false);
  });

  test('toOptions keeps the stored order and labels unknown values by themselves', () => {
    expect(toOptions(['b', 'a'], [{ value: 'a', label: 'Alpha' }])).toEqual([
      { value: 'b', label: 'b' },
      { value: 'a', label: 'Alpha' },
    ]);
  });
});

describe('condition utils', () => {
  test('normalizes a stored value to an array', () => {
    expect(normalizeConditionValues('x')).toEqual(['x']);
    expect(normalizeConditionValues(['x', 'y'])).toEqual(['x', 'y']);
    expect(normalizeConditionValues('')).toEqual([]);
    expect(normalizeConditionValues(null)).toEqual([]);
    expect(normalizeConditionValues(undefined)).toEqual([]);
  });

  test('maps a rule to form values and back, emitting arrays', () => {
    const form = toNetworkRuleFormValues(rules[0]);
    expect(form.startDate).toBe('2026-10-01');
    expect(form.conditions[1]).toEqual({
      key: 'remote',
      operator: 'EQ',
      values: ['t1'],
    });

    const back = fromNetworkRuleFormValues({ ...form, name: '  First rule ' });
    expect(back.name).toBe('First rule');
    expect(back.startDate).toBe('2026-10-01');
    expect(back.conditions[2]).toEqual({
      key: 'text',
      operator: 'HAS',
      value: ['ppo'],
    });
  });

  test('new-rule defaults are enabled with no conditions', () => {
    expect(toNetworkRuleFormValues(null)).toEqual({
      name: '',
      status: '',
      notes: null,
      enabled: true,
      startDate: null,
      endDate: null,
      conditions: [],
    });
  });

  test('blank notes become null', () => {
    const form = toNetworkRuleFormValues({ ...rules[0], notes: '   ' });
    expect(fromNetworkRuleFormValues(form).notes).toBeNull();
  });

  test('dedupes values case-insensitively, trimming and dropping blanks', () => {
    expect(dedupeValues([' PPO', 'ppo', '', 'EPO', 'epo '])).toEqual([
      'PPO',
      'EPO',
    ]);
  });
});

describe('date utils', () => {
  test('a rule date becomes a local Date on that day, and back', () => {
    const day = ruleDateToDay('2026-10-01');
    expect([day?.getFullYear(), day?.getMonth(), day?.getDate()]).toEqual([
      2026, 9, 1,
    ]);
    expect(dayToRuleDate(day)).toBe('2026-10-01');
    expect(dayToRuleDate(new Date(2026, 9, 1, 20, 30))).toBe('2026-10-01');
  });

  test('rejects anything that is not YYYY-MM-DD', () => {
    expect(ruleDateToDay('10/01/2026')).toBeNull();
    expect(ruleDateToDay('')).toBeNull();
    expect(ruleDateToDay(null)).toBeNull();
    expect(dayToRuleDate(null)).toBeNull();
    expect(dayToRuleDate(new Date('nope'))).toBeNull();
  });

  test('formats as a long date', () => {
    expect(formatRuleDate('2026-10-01')).toBe('October 1, 2026');
    expect(formatRuleDate(null)).toBeNull();
  });
});
