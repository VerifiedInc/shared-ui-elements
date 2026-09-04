import { Typography } from '@mui/material';

import { credentialKeys, fieldInputTypes } from '../../../core/fields';
import { FormField } from '../../../core/form';
import type { OneClickFormOptions } from '../form.context';

/**
 * Value for the `data-verified-sdk-field-value` attribute, withheld when user privacy is enabled.
 * @param value The field value to expose.
 * @param userPrivacyEnabled Whether the user privacy feature is enabled.
 * @returns The value to expose, or undefined.
 */
export const toFieldValueAttribute = <T,>(
  value: T,
  userPrivacyEnabled?: boolean,
): T | undefined => (userPrivacyEnabled ? undefined : value);

/**
 * Makes attributes for a field.
 * @param field The field to make attributes for.
 * @returns The attributes for the field.
 */
export const makeAttributes = ({
  userPrivacyEnabled,
  field,
  fieldKey,
  options,
}: {
  userPrivacyEnabled?: boolean;
  field: FormField | undefined;
  fieldKey: string;
  options: OneClickFormOptions;
}) => {
  const attributes = {
    role: 'region',
    'aria-label': field?.schema.characteristics.label,
    'data-testid':
      field?.schema.characteristics.inputType === fieldInputTypes.composite
        ? `data-field-composite-${fieldKey}`
        : `data-field-atomic-${fieldKey}`,
    'data-verified-sdk-field-value': toFieldValueAttribute(
      field ? getFieldValue(field, options) : undefined,
      userPrivacyEnabled,
    ),
  };

  return attributes;
};

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
export const getFieldValue = (
  field: FormField,
  options: OneClickFormOptions,
) => {
  // Ignore composite fields except address
  if (typeof field.value === 'object') {
    if (
      field.schema.key !== credentialKeys.address &&
      field.schema.key !== credentialKeys.healthInsurance &&
      field.schema.key !== credentialKeys.employer
    ) {
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

  return getFieldDisplayValue(field, options);
};

/**
 * Get the display value for a field, applying feature-flag-driven
 * transformations (e.g. year redaction for DOB).
 */
export const getFieldDisplayValue = (
  field: FormField,
  options: OneClickFormOptions,
): string | null => {
  const displayValue = field.displayValue;

  if (
    options.features.field?.dob?.redactYear &&
    field.schema.key === credentialKeys.birthDate &&
    typeof displayValue === 'string'
  ) {
    return displayValue.replace(/\/\d{4}$/, '/••••');
  }

  return displayValue;
};

export function RequiredLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required: boolean;
}) {
  if (!required) {
    return <>{children}</>;
  }

  return (
    <>
      {children}{' '}
      <Typography
        data-asterisk
        component='span'
        color='error'
        variant='subtitle2'
        sx={{ fontSize: 'inherit' }}
      >
        ✽
      </Typography>
    </>
  );
}
