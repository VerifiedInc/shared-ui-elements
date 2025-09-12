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
 * @param type The type of the field.
 * @returns The autocomplete attribute value.
 */
export function getAutoCompleteAttributeValue(type: string) {
  if (type === credentialKeys.firstName) {
    return 'given-name';
  }
  if (type === credentialKeys.lastName) {
    return 'family-name';
  }
  if (type === credentialKeys.phone) {
    return 'tel';
  }
  if (type === credentialKeys.address) {
    return 'street-address address-level2 address-level1 postal-code';
  }
  if (type === credentialKeys.line2) {
    return 'address-line2';
  }
  return 'off';
}
