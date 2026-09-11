import type {
  NetworkRule,
  NetworkRuleConditionFormValues,
  NetworkRuleData,
  NetworkRuleFormValues,
} from '../types';

export function normalizeConditionValues(
  value: string | string[] | null | undefined,
): string[] {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined || value === '') return [];
  return [value];
}

export function emptyConditionFormValues(): NetworkRuleConditionFormValues {
  return { key: '', operator: '', values: [] };
}

export function toNetworkRuleFormValues(
  rule?: Partial<NetworkRule> | null,
): NetworkRuleFormValues {
  return {
    name: rule?.name ?? '',
    status: rule?.status ?? '',
    notes: rule?.notes ?? null,
    enabled: rule?.enabled ?? true,
    startDate: rule?.startDate ?? null,
    endDate: rule?.endDate ?? null,
    conditions: (rule?.conditions ?? []).map((condition) => ({
      key: condition.key,
      operator: condition.operator,
      values: normalizeConditionValues(condition.value),
    })),
  };
}

export function fromNetworkRuleFormValues(
  values: NetworkRuleFormValues,
): NetworkRuleData {
  return {
    name: values.name.trim(),
    status: values.status,
    notes: values.notes?.trim() ? values.notes.trim() : null,
    enabled: values.enabled,
    startDate: values.startDate,
    endDate: values.endDate,
    conditions: values.conditions.map((condition) => ({
      key: condition.key,
      operator: condition.operator,
      value: condition.values,
    })),
  };
}

/** Case-insensitive, trimmed, blanks dropped; keeps the first spelling seen. */
export function dedupeValues(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of values) {
    const value = raw.trim();
    if (!value) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }
  return result;
}
