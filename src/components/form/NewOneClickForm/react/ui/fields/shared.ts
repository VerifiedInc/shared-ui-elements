import { credentialKeys, fieldInputTypes } from '../../../core/fields';
import { FormField } from '../../../core/form';

/**
 * Makes attributes for a field.
 * @param field The field to make attributes for.
 * @returns The attributes for the field.
 */
export const makeAttributes = (
  field: FormField | undefined,
  fieldKey: string,
) => ({
  role: 'region',
  'aria-label': field?.schema.characteristics.label,
  'data-testid':
    field?.schema.characteristics.inputType === fieldInputTypes.composite
      ? `data-field-composite-${fieldKey}`
      : `data-field-atomic-${fieldKey}`,
  'data-verified-sdk-field-value': field ? getFieldValue(field) : undefined,
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
 * Get the value, if object use display value
 * @param field The field to get the value from.
 * @returns The value or display value of the field.
 */
export const getFieldValue = (field: FormField) => {
  // Ignore composite fields except address
  if (typeof field.value === 'object') {
    if (field.schema.key !== credentialKeys.address) {
      return;
    }
  }

  // Get raw value for dates and list fields
  if (
    field.schema.key === credentialKeys.state ||
    field.schema.key === credentialKeys.issuanceState ||
    field.schema.key === credentialKeys.birthDate ||
    field.schema.key === credentialKeys.expirationDate ||
    field.schema.key === credentialKeys.issuanceDate
  ) {
    return field.value;
  }

  return field.displayValue;
};
