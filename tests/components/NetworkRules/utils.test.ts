import { describe, expect, test } from 'vitest';

import {
  NETWORK_RULE_PRESETS_MAX_ITEMS,
  dayToRuleDate,
  dedupeValues,
  formatRuleDate,
  fromMetadataFormValues,
  fromNetworkRuleFormValues,
  getKeyLabel,
  getOperatorLabel,
  getPresetMaxLength,
  getSavedPresets,
  getStatusLabel,
  hasInlineOptions,
  hasRemoteSource,
  isExactNumberValue,
  isOperatorMulti,
  isPresetListFull,
  removePreset,
  renamePresetInRule,
  replacePreset,
  ruleDateToDay,
  toMetadataFormValues,
  toNetworkRuleFormValues,
  toOptions,
  validatePresetValue,
  type NetworkRuleCatalog,
} from '../../../src/components/NetworkRules';
import { filterPresetOptions } from '../../../src/components/NetworkRules/editor/fields/presetOptions';

import { catalog, rules } from './fixtures';

const metadataCatalog: NetworkRuleCatalog = {
  ...catalog,
  metadata: {
    types: ['string', 'number', 'boolean'],
    limits: { maxEntries: 20, maxKeyLength: 64, maxValueLength: 200 },
    keyPresets: ['tier'],
    valuePresets: ['Gold'],
  },
};

describe('preset utils', () => {
  test('saved presets are read by field, empty when the catalog has none', () => {
    expect(getSavedPresets(metadataCatalog, 'notes')).toEqual([
      'Existing preset',
    ]);
    expect(getSavedPresets(metadataCatalog, 'text')).toEqual(['Gold plan']);
    expect(getSavedPresets(metadataCatalog, 'metadataKeys')).toEqual(['tier']);
    expect(getSavedPresets(metadataCatalog, 'metadataValues')).toEqual([
      'Gold',
    ]);
    expect(getSavedPresets(catalog, 'metadataKeys')).toEqual([]);
    expect(getSavedPresets(catalog, 'color')).toEqual([]);
    expect(getSavedPresets(undefined, 'notes')).toEqual([]);
  });

  test('only the metadata fields have a served max length', () => {
    expect(getPresetMaxLength(metadataCatalog, 'metadataKeys')).toBe(64);
    expect(getPresetMaxLength(metadataCatalog, 'metadataValues')).toBe(200);
    expect(getPresetMaxLength(metadataCatalog, 'notes')).toBeUndefined();
    expect(getPresetMaxLength(metadataCatalog, 'text')).toBeUndefined();
    expect(getPresetMaxLength(catalog, 'metadataKeys')).toBeUndefined();
  });

  test('validatePresetValue rejects blank, overlong and duplicate presets', () => {
    const presets = ['Gold plan', 'Silver plan'];
    expect(validatePresetValue('   ', { presets })).toBe(
      'Preset cannot be empty',
    );
    expect(validatePresetValue('Platinum', { presets, maxLength: 5 })).toBe(
      'Preset must be at most 5 characters',
    );
    // Case-insensitive, trimmed: the editor never keeps two spellings of one preset.
    expect(validatePresetValue(' gold PLAN ', { presets })).toBe(
      'This preset already exists',
    );
    // The preset being renamed does not count as its own duplicate.
    expect(
      validatePresetValue('gold plan', { presets, current: 'Gold plan' }),
    ).toBeUndefined();
    expect(
      validatePresetValue('Silver plan', { presets, current: 'Gold plan' }),
    ).toBe('This preset already exists');
    expect(validatePresetValue('Bronze plan', { presets })).toBeUndefined();
  });

  test('replacePreset keeps the order and removePreset drops one', () => {
    expect(replacePreset(['a', 'b', 'c'], 'b', ' B2 ')).toEqual([
      'a',
      'B2',
      'c',
    ]);
    expect(removePreset(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);
    expect(removePreset(['a'], 'missing')).toEqual(['a']);
  });

  test('renamePresetInRule changes only what carries the preset, or nothing', () => {
    const rule = {
      notes: 'Old',
      metadata: { tier: 'Old', keep: 1 },
      conditions: [
        { key: 'text', operator: 'HAS', values: ['Old', 'Other'] },
        { key: 'color', operator: 'EQ', values: ['Old'] },
      ],
    };

    expect(renamePresetInRule(rule, 'notes', 'Old', 'New')).toEqual({
      notes: 'New',
    });
    expect(renamePresetInRule(rule, 'notes', 'Missing', 'New')).toBeNull();

    // Only the condition on that key; the other key's identical text is a different vocabulary.
    expect(renamePresetInRule(rule, 'text', 'Old', 'New')).toEqual({
      conditions: [
        { key: 'text', operator: 'HAS', values: ['New', 'Other'] },
        { key: 'color', operator: 'EQ', values: ['Old'] },
      ],
    });
    // Renaming onto a value the condition already has collapses the two.
    expect(renamePresetInRule(rule, 'text', 'Old', 'other')).toEqual({
      conditions: [
        { key: 'text', operator: 'HAS', values: ['other'] },
        { key: 'color', operator: 'EQ', values: ['Old'] },
      ],
    });
    expect(renamePresetInRule(rule, 'planName', 'Old', 'New')).toBeNull();

    expect(renamePresetInRule(rule, 'metadataValues', 'Old', 'New')).toEqual({
      metadata: { tier: 'New', keep: 1 },
    });
    expect(renamePresetInRule(rule, 'metadataKeys', 'tier', 'level')).toEqual({
      metadata: { level: 'Old', keep: 1 },
    });
    // A key the rule already has stays: two entries cannot share it.
    expect(renamePresetInRule(rule, 'metadataKeys', 'tier', 'keep')).toBeNull();
    expect(
      renamePresetInRule(
        { notes: null, conditions: [] },
        'metadataValues',
        'Old',
        'New',
      ),
    ).toBeNull();
  });

  test('a full field offers no "Add … as a preset" row', () => {
    const full = Array.from(
      { length: NETWORK_RULE_PRESETS_MAX_ITEMS },
      (_value, index) => `Preset ${index}`,
    );
    expect(isPresetListFull(full)).toBe(true);
    expect(isPresetListFull(full.slice(1))).toBe(false);

    const state = { inputValue: 'Brand new', getOptionLabel: String };
    expect(filterPresetOptions(full, state, true)).toEqual([]);
    expect(filterPresetOptions(full.slice(1), state, true)).toEqual([
      { inputValue: 'Brand new', label: 'Add "Brand new" as a preset' },
    ]);
    expect(filterPresetOptions(full.slice(1), state, false)).toEqual([]);
  });
});

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
      values: ['ppo'],
    });
  });

  test('emits `values` on every condition and never the legacy `value` key', () => {
    const back = fromNetworkRuleFormValues(toNetworkRuleFormValues(rules[0]));
    expect(back.conditions).toHaveLength(3);
    for (const condition of back.conditions) {
      expect(Array.isArray(condition.values)).toBe(true);
      expect(condition.values.length).toBeGreaterThan(0);
      expect(condition).not.toHaveProperty('value');
      expect(Object.keys(condition).sort()).toEqual([
        'key',
        'operator',
        'values',
      ]);
    }
  });

  test('new-rule defaults are enabled with no conditions', () => {
    expect(toNetworkRuleFormValues(null)).toEqual({
      name: '',
      status: '',
      notes: null,
      enabled: true,
      startDate: null,
      endDate: null,
      metadata: [],
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

  test('rejects anything that is not a real YYYY-MM-DD day', () => {
    expect(ruleDateToDay('10/01/2026')).toBeNull();
    expect(ruleDateToDay('2026-02-31')).toBeNull();
    expect(ruleDateToDay('2026-13-01')).toBeNull();
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

describe('metadata utils', () => {
  test('round-trips typed values through the editor rows', () => {
    const rows = toMetadataFormValues({
      tier: 'Gold',
      copay: 25,
      selfPay: false,
    });
    expect(rows).toEqual([
      { key: 'tier', type: 'string', value: 'Gold' },
      { key: 'copay', type: 'number', value: '25' },
      { key: 'selfPay', type: 'boolean', value: 'false' },
    ]);
    expect(fromMetadataFormValues(rows)).toEqual({
      tier: 'Gold',
      copay: 25,
      selfPay: false,
    });
  });

  test('a number is exact only while a double keeps every digit', () => {
    expect(isExactNumberValue('0.850')).toBe(true);
    expect(isExactNumberValue('9007199254740992')).toBe(true);
    expect(isExactNumberValue('9007199254740993')).toBe(false);
    expect(isExactNumberValue('1'.repeat(200))).toBe(false);
    expect(isExactNumberValue('-')).toBe(false);
  });
});
