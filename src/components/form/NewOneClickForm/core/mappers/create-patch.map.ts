import { fieldInputTypes } from '../fields';
import { Form, FormField } from '../form';

export type ToCreateCredentialsResult = {
  uuid?: string;
  type: string;
  value: Record<string, any>;
};

export type ToPatchCredentialsResult = {
  uuid: string;
  type: string;
  value: Record<string, any>;
};

export type UnchangedCredentialsResult = {
  uuid: string;
  type: string;
  value: Record<string, any>;
};

export type CategorizedCredentials = {
  toCreate: ToCreateCredentialsResult[];
  toPatch: ToPatchCredentialsResult[];
  unchanged: UnchangedCredentialsResult[];
};

export type UnknownCredentials =
  | ToCreateCredentialsResult
  | ToPatchCredentialsResult
  | UnchangedCredentialsResult;

export function toCreatePatchCredentials(form: Form): CategorizedCredentials {
  // Type guard to check if a credential has a uuid
  const hasUuid = (
    credential: UnknownCredentials,
  ): credential is UnchangedCredentialsResult => {
    return credential.uuid !== undefined;
  };

  const nonEmptyFields = (field: FormField) => {
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

  const map = (field: FormField): UnknownCredentials => {
    // Clean empty properties from the field value for patch operations
    const cleanedValue = cleanEmptyProperties(field.value);

    // Prepare the value object
    let value: Record<string, any>;
    // For composite fields, use the cleaned value directly without wrapping with field key
    if (field.schema.characteristics.inputType === fieldInputTypes.composite) {
      value = cleanedValue;
    } else {
      // For primitive fields, wrap with the field key
      value = { [field.schema.key]: cleanedValue };
    }

    // Return the appropriate type based on whether uuid exists
    if (field.id) {
      return {
        uuid: field.id,
        type: field.schema.key,
        value,
      };
    } else {
      return {
        type: field.schema.key,
        value,
      };
    }
  };

  const allFields = Object.values(form.fields);
  const nonEmptyFieldsList = allFields.filter(nonEmptyFields);

  const toCreate: ToCreateCredentialsResult[] = [];
  const toPatch: ToPatchCredentialsResult[] = [];
  const unchanged: UnchangedCredentialsResult[] = [];

  nonEmptyFieldsList.forEach((field) => {
    const credential = map(field);

    if (field.isDirty) {
      // Field has been modified
      if (hasUuid(credential)) {
        // Has UUID and is dirty, needs to be patched
        toPatch.push(credential);
      } else {
        // No UUID and is dirty, needs to be created
        toCreate.push(credential);
      }
    } else {
      // Field is not dirty but has data, it's unchanged
      // At this point, credential.uuid must exist (unchanged fields come from existing credentials)
      if (hasUuid(credential)) {
        unchanged.push(credential);
      }
    }
  });

  return {
    toCreate,
    toPatch,
    unchanged,
  };
}
