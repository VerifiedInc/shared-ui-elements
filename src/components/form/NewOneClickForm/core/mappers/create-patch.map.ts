import { credentialKeys, fieldInputTypes } from '../fields';
import { Form, FormField } from '../form';

export type CreatePatchCredentialsResult = {
  uuid?: string;
  value: Record<string, any>;
};

export function toCreatePatchCredentials(
  form: Form,
): CreatePatchCredentialsResult[] {
  const nonEmptyFields = (field: FormField) => {
    // Phone is not included in the patch/create request.
    if (field.schema.key === credentialKeys.phone) {
      return false;
    }

    if (
      field.schema.characteristics.inputType === fieldInputTypes.composite &&
      field.children
    ) {
      return Object.values(field.children).some(nonEmptyFields);
    }

    return !field.isEmpty;
  };

  // Helper function to remove empty properties from composite values
  const cleanEmptyProperties = (value: any): any => {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const cleaned: Record<string, any> = {};
      Object.entries(value).forEach(([key, val]) => {
        // Recursively clean nested objects
        const cleanedValue = cleanEmptyProperties(val);
        // Only include non-empty values and non-empty objects
        if (
          cleanedValue !== '' &&
          cleanedValue !== null &&
          cleanedValue !== undefined
        ) {
          // For objects, also check if they have any keys after cleaning
          if (
            typeof cleanedValue === 'object' &&
            !Array.isArray(cleanedValue)
          ) {
            if (Object.keys(cleanedValue).length > 0) {
              cleaned[key] = cleanedValue;
            }
            // Skip empty objects (no keys)
          } else {
            // Include non-object values that are not empty
            cleaned[key] = cleanedValue;
          }
        }
      });
      return cleaned;
    }

    return value;
  };

  const map = (field: FormField) => {
    const result: CreatePatchCredentialsResult = {
      value: {},
    };

    if (field.id) {
      result.uuid = field.id;
    }

    // Clean empty properties from the field value for patch operations
    const cleanedValue = cleanEmptyProperties(field.value);
    result.value[field.schema.key] = cleanedValue;

    return result;
  };

  return Object.values(form.fields).filter(nonEmptyFields).map(map);
}
