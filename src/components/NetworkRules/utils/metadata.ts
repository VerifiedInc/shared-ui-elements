import type {
  NetworkRuleMetadata,
  NetworkRuleMetadataFormValues,
  NetworkRuleMetadataType,
} from '../types';

/**
 * Preset fields metadata suggests from, alongside `notes` and the free-text condition keys. The
 * names are the brand's preset map keys, so the grown lists can be stored as they come back.
 */
export const NETWORK_RULE_METADATA_PRESET_FIELDS = {
  key: 'metadataKeys',
  value: 'metadataValues',
} as const;

const METADATA_TYPE_LABELS: Record<NetworkRuleMetadataType, string> = {
  string: 'String',
  number: 'Number',
  boolean: 'Boolean',
};

/** Every type a row can hold, taken from the one record that has to name them all. */
export const NETWORK_RULE_METADATA_TYPES = Object.keys(
  METADATA_TYPE_LABELS,
) as [NetworkRuleMetadataType, ...NetworkRuleMetadataType[]];

/** How a boolean row offers and shows its two values. */
export const NETWORK_RULE_METADATA_BOOLEAN_OPTIONS = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
] as const;

export function metadataTypeLabel(type: NetworkRuleMetadataType): string {
  return METADATA_TYPE_LABELS[type];
}

/** A blank row of the first type the catalog offers, so a new row is always one it can show. */
export function emptyMetadataFormValues(
  type: NetworkRuleMetadataType = 'string',
): NetworkRuleMetadataFormValues {
  return { key: '', type, value: '' };
}

/** Partial input is allowed, so the field can be typed into: `-`, `1.`, `` all pass. */
export function isPartialNumberInput(value: string): boolean {
  return /^-?\d*(\.\d*)?$/.test(value);
}

/** A complete number, as the number input writes it. */
export function isNumberValue(value: string): boolean {
  return /^-?\d+(\.\d*)?$/.test(value);
}

/** `value` without its trailing zeros. A loop, not `/0+$/`: that regex backtracks quadratically. */
function trimTrailingZeros(value: string): string {
  let end = value.length;
  while (end > 0 && value[end - 1] === '0') end -= 1;
  return value.slice(0, end);
}

/** The text `String(Number(value))` produces for the same quantity, when it is written plainly. */
function normalizeNumberText(value: string): string {
  const negative = value.startsWith('-');
  const [rawInteger = '', rawFraction = ''] = value.replace('-', '').split('.');
  const whole = rawInteger.replace(/^0+/, '') || '0';
  const fraction = trimTrailingZeros(rawFraction);
  const digits = fraction ? `${whole}.${fraction}` : whole;
  return negative && digits !== '0' ? `-${digits}` : digits;
}

/**
 * The value survives being a JSON number. A double keeps roughly 15 significant digits, so a long
 * id typed as a number would come back rounded (`…993` as `…992`, a 200-digit one as
 * `4.783247328947329e+199`). Those belong in a string row, and the editor says so rather than
 * storing a different number than the one that was typed.
 */
export function isExactNumberValue(value: string): boolean {
  if (!isNumberValue(value)) return false;
  const parsed = Number(value);
  return (
    Number.isFinite(parsed) && String(parsed) === normalizeNumberText(value)
  );
}

/** `typeof` already names the three types a stored value can have. */
export function typeOfMetadataValue(
  value: string | number | boolean,
): NetworkRuleMetadataType {
  return typeof value as NetworkRuleMetadataType;
}

/** A stored value as the editor shows it: booleans as True / False, the rest as typed. */
export function formatMetadataValue(value: string | number | boolean): string {
  if (typeof value !== 'boolean') return String(value);
  return (
    NETWORK_RULE_METADATA_BOOLEAN_OPTIONS.find(
      (option) => option.value === String(value),
    )?.label ?? String(value)
  );
}

/** Rows keep the value as text; the type drives how it is parsed back on submit. */
export function toMetadataFormValues(
  metadata: NetworkRuleMetadata | undefined,
): NetworkRuleMetadataFormValues[] {
  return Object.entries(metadata ?? {}).map(([key, value]) => ({
    key,
    type: typeOfMetadataValue(value),
    value: String(value),
  }));
}

/** The rows as the API stores them. Runs after validation, so the blank-row guard is defensive. */
export function fromMetadataFormValues(
  entries: readonly NetworkRuleMetadataFormValues[],
): NetworkRuleMetadata {
  const metadata: NetworkRuleMetadata = {};
  for (const entry of entries) {
    const key = entry.key.trim();
    const value = entry.value.trim();
    if (!key || !value) continue;
    if (entry.type === 'number') {
      // A real JSON number, as `networkRuleMetadataSchema` expects; `isExactNumberValue` has
      // already kept out anything a double would round.
      metadata[key] = Number(value);
    } else if (entry.type === 'boolean') {
      metadata[key] = value === 'true';
    } else {
      metadata[key] = value;
    }
  }
  return metadata;
}
