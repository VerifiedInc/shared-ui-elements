import { type BaseFieldDefinition } from '../fields';

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
