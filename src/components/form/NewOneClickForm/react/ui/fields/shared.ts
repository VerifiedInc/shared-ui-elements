import { credentialKeys, fieldInputTypes } from '../../../core/fields';
import { FormField } from '../../../core/form';

/**
 * Makes attributes for a field.
 * @param field The field to make attributes for.
 * @returns The attributes for the field.
 */
export const makeAttributes = (field: FormField | undefined) => ({
  role: 'region',
  'aria-label': field?.schema.characteristics.label,
  'data-testid':
    field?.schema.characteristics.inputType === fieldInputTypes.composite
      ? `data-field-composite-${field?.schema.key}`
      : `data-field-atomic-${field?.schema.key}`,
});

/**
 * Returns the autocomplete attribute value based on the type of the field.
 * @param key The type of the field.
 * @returns The autocomplete attribute value.
 */
export function getAutoCompleteAttributeValue(key: string) {
  if (key === credentialKeys.firstName) {
    return 'given-name';
  }
  if (key === credentialKeys.lastName) {
    return 'family-name';
  }
  if (key === credentialKeys.phone) {
    return 'tel';
  }
  if (key === credentialKeys.address) {
    return 'street-address address-level2 address-level1 postal-code';
  }
  if (key === credentialKeys.line2) {
    return 'address-line2';
  }
  return 'off';
}

/**
 * Get the raw value, if object use display value
 * @param field The field to get the raw value from.
 * @returns The raw value of the field.
 */
export const getRawValue = (field: FormField) => {
  if (field.schema.key === credentialKeys.ssn) {
    // SSN is a sensitive data so we don't show the full value
    return (field?.value as string | undefined)?.slice(-4);
  }

  if (typeof field?.value === 'string') {
    return field?.value;
  }

  return field?.displayValue;
};
