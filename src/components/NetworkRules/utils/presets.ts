import type { NetworkRuleData, NetworkRuleMetadata } from '../types';
import { dedupeValues } from './condition';
import { NETWORK_RULE_METADATA_PRESET_FIELDS } from './metadata';

/**
 * How many presets one field may hold. Mirrors core's `presetList` cap (`maxItems: 100`); the
 * catalog does not carry it, and the metadata limits it does carry bound the item length instead.
 */
export const NETWORK_RULE_PRESETS_MAX_ITEMS = 100;

export function isPresetListFull(presets: readonly string[]): boolean {
  return presets.length >= NETWORK_RULE_PRESETS_MAX_ITEMS;
}

/** Same spelling, any case: the editor never keeps two presets that differ only by case. */
const samePreset = (a: string, b: string): boolean =>
  a.trim().toLowerCase() === b.trim().toLowerCase();

export interface ValidatePresetValueOptions {
  /** Every preset of the field, saved or not. */
  presets: readonly string[];
  /** The preset being renamed, so it does not count as its own duplicate. */
  current?: string;
  maxLength?: number;
}

/** The message to show for `value`, or undefined when it may be stored as a preset. */
export function validatePresetValue(
  value: string,
  { presets, current, maxLength }: ValidatePresetValueOptions,
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return 'Preset cannot be empty';
  if (maxLength !== undefined && trimmed.length > maxLength) {
    return `Preset must be at most ${maxLength} characters`;
  }
  const duplicate = presets.some(
    (preset) =>
      samePreset(preset, trimmed) &&
      (current === undefined || !samePreset(preset, current)),
  );
  if (duplicate) return 'This preset already exists';
  return undefined;
}

/** `presets` with `from` renamed in place, so the list keeps its order. */
export function replacePreset(
  presets: readonly string[],
  from: string,
  to: string,
): string[] {
  return presets.map((preset) => (preset === from ? to.trim() : preset));
}

export function removePreset(
  presets: readonly string[],
  value: string,
): string[] {
  return presets.filter((preset) => preset !== value);
}

/** The parts of a rule a preset can end up in. */
export type NetworkRulePresetCarriers = Pick<
  NetworkRuleData,
  'notes' | 'metadata' | 'conditions'
>;

const hasKey = (metadata: NetworkRuleMetadata, key: string): boolean =>
  Object.keys(metadata).includes(key);

/**
 * The parts of `rule` that change when preset `from` of `field` becomes `to`, as a patch, or null
 * when the rule does not carry it. Exact match: a rule stores the chosen preset verbatim. A
 * metadata key is left alone when the rule already has an entry under `to`, since one would win.
 */
export function renamePresetInRule(
  rule: NetworkRulePresetCarriers,
  field: string,
  from: string,
  to: string,
): Partial<NetworkRulePresetCarriers> | null {
  if (field === 'notes') {
    return rule.notes === from ? { notes: to } : null;
  }

  const metadata = rule.metadata ?? {};
  if (field === NETWORK_RULE_METADATA_PRESET_FIELDS.key) {
    if (!hasKey(metadata, from) || hasKey(metadata, to)) return null;
    const renamed: NetworkRuleMetadata = {};
    for (const [key, value] of Object.entries(metadata)) {
      renamed[key === from ? to : key] = value;
    }
    return { metadata: renamed };
  }
  if (field === NETWORK_RULE_METADATA_PRESET_FIELDS.value) {
    if (!Object.values(metadata).includes(from)) return null;
    const renamed: NetworkRuleMetadata = {};
    for (const [key, value] of Object.entries(metadata)) {
      renamed[key] = value === from ? to : value;
    }
    return { metadata: renamed };
  }

  const carries = (condition: NetworkRuleData['conditions'][number]): boolean =>
    condition.key === field && condition.values.includes(from);
  if (!rule.conditions.some(carries)) return null;
  return {
    conditions: rule.conditions.map((condition) =>
      carries(condition)
        ? {
            ...condition,
            // Renaming onto a value the condition already has collapses the two.
            values: dedupeValues(
              condition.values.map((value) => (value === from ? to : value)),
            ),
          }
        : condition,
    ),
  };
}
