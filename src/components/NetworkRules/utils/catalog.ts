import { getStatusPresentation } from '../statuses';
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
