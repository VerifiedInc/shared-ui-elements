import { credentialKeys } from '../../../core/fields';
import type { FormField } from '../../../core/form';

/**
 * Computes the ordered list of field keys to render.
 *
 * The phone field is hidden by default. When `showPhone` is enabled, the phone
 * is surfaced and positioned between the name and address fields (per product
 * rule: a phone that was not provided as input — e.g. sourced from autofill —
 * must be shown so the user can confirm it). When `showPhone` is disabled (the
 * default), the phone field is omitted entirely, preserving existing behavior.
 */
export function getDisplayFieldKeys(
  fields: Record<string, FormField>,
  { showPhone }: { showPhone?: boolean },
): string[] {
  const keys = Object.keys(fields);
  const hasPhone = keys.includes(credentialKeys.phone);

  // Phone hidden (default) or not present — drop it and keep natural order.
  if (!showPhone || !hasPhone) {
    return keys.filter((key) => key !== credentialKeys.phone);
  }

  // Pull phone out of its natural slot and re-insert it between name and
  // address: right after name when present, otherwise just before address,
  // otherwise append.
  const ordered = keys.filter((key) => key !== credentialKeys.phone);
  const fullNameIndex = ordered.indexOf(credentialKeys.fullName);
  const addressIndex = ordered.indexOf(credentialKeys.address);

  let insertAt: number;
  if (fullNameIndex !== -1) {
    insertAt = fullNameIndex + 1;
  } else if (addressIndex !== -1) {
    insertAt = addressIndex;
  } else {
    insertAt = ordered.length;
  }

  ordered.splice(insertAt, 0, credentialKeys.phone);
  return ordered;
}
