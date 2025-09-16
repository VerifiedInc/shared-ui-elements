import type {
  Credential,
  CredentialRequestObject,
} from '../../../../../src/components/form/NewOneClickForm/types';

import { fields } from '../../../../../src/components/form/NewOneClickForm/core/fields';
import { FormField } from '../../../../../src/components/form/NewOneClickForm/core/form';

export const makeCredential = (
  options: Partial<Credential> & { type: string; value: Credential['value'] },
) => {
  if (!fields[options.type as keyof typeof fields]) {
    throw new Error(`Invalid credential type: ${options.type}`);
  }
  return {
    uuid: options.uuid ?? crypto.randomUUID(),
    type: options.type,
    value: options.value,
  };
};

export const makeCredentialRequest = (
  options: Partial<CredentialRequestObject> & { type: string },
) => {
  return {
    type: options.type,
    children: options.children,
    allowUserInput: options.allowUserInput ?? true,
    mandatory: options.mandatory ?? 'no',
    multi: options.multi ?? false,
    description: options.description,
  };
};

/**
 * Generic helper function to update form field values for testing.
 * Updates child field values recursively to ensure proper validation
 * since isValid checks against children for composite fields.
 */
export const updateFormFieldValues = (
  field: FormField,
  values: Record<string, any>,
) => {
  if (!field.children || !values) return;

  Object.entries(values).forEach(([key, value]) => {
    const childField = field.children?.[key];
    if (!childField) return;

    if (value !== undefined) {
      if (typeof value === 'object' && value !== null && childField.children) {
        // Recursively handle nested composite fields
        updateFormFieldValues(childField, value);
      } else {
        // Update primitive field value
        childField.value = value;
      }
    }
  });
};
