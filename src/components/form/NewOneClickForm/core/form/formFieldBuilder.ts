import { fieldsFromCredentialTypes, type BaseFieldDefinition } from '../fields';
import { type Credential } from './types';
import { FormField } from './formField';

export interface CredentialRequestOptions {
  allowUserInput?: boolean;
  mandatory?: 'yes' | 'no' | 'if_available';
  multi?: boolean;
  description?: string;
}

export class FormFieldBuilder {
  createFromCredential(
    credential: Credential,
    children?: Record<string, FormField>,
    options?: CredentialRequestOptions,
    variants?: FormField[],
  ): FormField {
    const fieldSchema =
      fieldsFromCredentialTypes[
        credential.type as keyof typeof fieldsFromCredentialTypes
      ];

    if (!fieldSchema) {
      throw new Error(`Invalid credential type: ${credential.type}`);
    }

    const fieldKey = fieldSchema.key;
    let defaultValue: any;

    // Handle different credential data structures
    if (fieldSchema.characteristics.inputType === 'composite') {
      // For composite fields, value should be undefined as data lives in children
      defaultValue = undefined;
    } else if (Array.isArray(credential.data)) {
      // For non-composite credentials with array data (shouldn't happen normally)
      defaultValue = undefined;
    } else {
      // For regular credentials with object data
      defaultValue = credential.data[fieldKey];
    }

    return new FormField(
      credential.id,
      defaultValue,
      defaultValue,
      fieldSchema,
      {
        children,
        allowUserInput: options?.allowUserInput ?? true,
        mandatory: options?.mandatory ?? 'no',
        multi: options?.multi ?? false,
        variants,
        description: options?.description,
      },
    );
  }

  createFromSchema(
    schema: BaseFieldDefinition<string, string>,
    children?: Record<string, FormField>,
    options?: CredentialRequestOptions,
    variants?: FormField[],
  ): FormField {
    // Generate a UUID for fields without existing credentials
    const uuid = crypto.randomUUID();
    const defaultValue =
      schema.characteristics.inputType === 'composite' ? undefined : '';

    return new FormField(uuid, defaultValue, defaultValue, schema, {
      children,
      allowUserInput: options?.allowUserInput ?? true,
      mandatory: options?.mandatory ?? 'no',
      multi: options?.multi ?? false,
      variants,
      description: options?.description,
    });
  }
}
