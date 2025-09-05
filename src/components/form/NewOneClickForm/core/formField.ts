import { fieldsFromCredentialTypes } from './fields';
import type { BaseFieldDefinition } from './fields/types';

type Credential = {
  id: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  issuanceDate: string;
  expirationDate: string | null;
  issuerUuid: string;
  data: Record<string, any> | Credential[];
};

export class FormField {
  id: string;
  defaultValue: any;
  value: any;
  schema: BaseFieldDefinition<string, string>;
  children?: Record<string, FormField>;
  touched: boolean;

  constructor(
    id: string,
    defaultValue: any,
    value: any,
    schema: BaseFieldDefinition<string, string>,
    children?: Record<string, FormField>,
  ) {
    this.id = id;
    this.defaultValue = defaultValue;
    this.value = value;
    this.schema = schema;
    this.children = children;
    this.touched = false;
  }

  get isValid(): boolean {
    // Validate current field's value against its Zod schema
    const result = this.schema.zodSchema.safeParse(this.value);

    if (!result.success) {
      return false;
    }

    // If this field has children, validate all children recursively
    if (this.children && Object.keys(this.children).length > 0) {
      return Object.values(this.children).every((child) => child.isValid);
    }

    return true;
  }

  get isDirty(): boolean {
    return this.value !== this.defaultValue;
  }

  get errors(): { error: any; childrenErrors: Record<string, any> } | null {
    const result = this.schema.zodSchema.safeParse(this.value);
    const error = result.success ? null : result.error;

    const childrenErrors: Record<string, any> = {};

    if (this.children && Object.keys(this.children).length > 0) {
      Object.entries(this.children).forEach(([key, child]) => {
        const childError = child.errors;
        if (childError) {
          childrenErrors[key] = childError;
        }
      });
    }

    // Return null if no errors exist
    if (!error && Object.keys(childrenErrors).length === 0) {
      return null;
    }

    return {
      error,
      childrenErrors,
    };
  }
}

export class FormFieldBuilder {
  createFromCredential(
    credential: Credential,
    children?: Record<string, FormField>,
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
      children,
    );
  }

  createFromSchema(
    schema: BaseFieldDefinition<string, string>,
    children?: Record<string, FormField>,
  ): FormField {
    // Generate a UUID for fields without existing credentials
    const uuid = crypto.randomUUID();
    const defaultValue =
      schema.characteristics.inputType === 'composite' ? undefined : '';

    return new FormField(uuid, defaultValue, defaultValue, schema, children);
  }
}
