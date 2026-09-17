import { getStatusPresentation } from '../statuses';
import { NETWORK_RULE_METADATA_PRESET_FIELDS } from './metadata';
import type {
  NetworkRuleCatalog,
  NetworkRuleKeyDef,
  NetworkRuleOption,
} from '../types';

// Every lookup falls back to the raw value, so unknown codes render instead of throwing.

export function getKeyDef(
  catalog: NetworkRuleCatalog | undefined,
  key: string,
): NetworkRuleKeyDef | undefined {
  return catalog?.keys.find((def) => def.key === key);
}

export function getKeyLabel(
  catalog: NetworkRuleCatalog | undefined,
  key: string,
): string {
  return getKeyDef(catalog, key)?.label ?? key;
}

export function getOperatorLabel(
  catalog: NetworkRuleCatalog | undefined,
  operator: string,
): string {
  return catalog?.operators[operator]?.label ?? operator;
}

/** Unknown operators count as multi, so the editor is never stricter than the catalog. */
export function isOperatorMulti(
  catalog: NetworkRuleCatalog | undefined,
  operator: string,
): boolean {
  return catalog?.operators[operator]?.multi ?? true;
}

export function getStatusLabel(status: string): string {
  return getStatusPresentation(status).label;
}

export function hasInlineOptions(
  keyDef: NetworkRuleKeyDef | undefined,
): keyDef is NetworkRuleKeyDef & {
  values: { source: string; options: NetworkRuleOption[] };
} {
  return Array.isArray(keyDef?.values?.options);
}

export function hasRemoteSource(
  keyDef: NetworkRuleKeyDef | undefined,
): keyDef is NetworkRuleKeyDef & { values: { source: string } } {
  return (
    !hasInlineOptions(keyDef) &&
    typeof keyDef?.values?.source === 'string' &&
    keyDef.values.source.length > 0
  );
}

/** One option per value, in order; a value `options` lacks is labelled by itself. */
export function toOptions(
  values: readonly string[],
  options: readonly NetworkRuleOption[],
): NetworkRuleOption[] {
  return values.map(
    (value) =>
      options.find((option) => option.value === value) ?? {
        value,
        label: value,
      },
  );
}

function savedPresets(
  catalog: NetworkRuleCatalog | undefined,
  field: string,
): string[] {
  if (field === 'notes') return catalog?.notePresets ?? [];
  if (field === NETWORK_RULE_METADATA_PRESET_FIELDS.key) {
    return catalog?.metadata?.keyPresets ?? [];
  }
  if (field === NETWORK_RULE_METADATA_PRESET_FIELDS.value) {
    return catalog?.metadata?.valuePresets ?? [];
  }
  return getKeyDef(catalog, field)?.presets ?? [];
}

/**
 * Saved suggestions for `notes`, a metadata field or a free-text condition key, followed by any
 * the user added while editing (`added` is keyed the same way). One merge rule for every caller.
 */
export function getPresets(
  catalog: NetworkRuleCatalog | undefined,
  field: string,
  added?: Readonly<Record<string, readonly string[]>>,
): string[] {
  const saved = savedPresets(catalog, field);
  const extra = added?.[field];
  return extra?.length ? [...saved, ...extra] : saved;
}
