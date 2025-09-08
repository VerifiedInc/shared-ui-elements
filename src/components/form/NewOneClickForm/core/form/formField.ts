import { type BaseFieldDefinition } from '../fields';

export interface FormFieldOptions {
  children?: Record<string, FormField>;
  allowUserInput?: boolean;
  mandatory?: 'yes' | 'no' | 'if_available';
  multi?: boolean;
  variants?: FormField[];
  description?: string;
}

export class FormField {
  id: string;
  defaultValue: any;
  value: any;
  schema: BaseFieldDefinition<string, string>;
  children?: Record<string, FormField>;
  touched: boolean;
  allowUserInput: boolean;
  mandatory: 'yes' | 'no' | 'if_available';
  multi: boolean;
  variants?: FormField[];
  description?: string;

  constructor(
    id: string,
    defaultValue: any,
    value: any,
    schema: BaseFieldDefinition<string, string>,
    options: FormFieldOptions = {},
  ) {
    this.id = id;
    this.defaultValue = defaultValue;
    this.value = value;
    this.schema = schema;
    this.children = options.children;
    this.touched = false;
    this.allowUserInput = options.allowUserInput ?? true;
    this.mandatory = options.mandatory ?? 'no';
    this.multi = options.multi ?? false;
    this.variants = options.variants;
    this.description = options.description;
  }

  get isValid(): boolean {
    // Check if field is required and empty
    if (this.isRequired && this.isEmpty) {
      return false;
    }

    // Skip validation if field is empty and not required
    if (this.isEmpty && !this.isRequired) {
      return true;
    }

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

  get isRequired(): boolean {
    return this.mandatory === 'yes' || this.mandatory === 'if_available';
  }

  get isDisabled(): boolean {
    return !this.allowUserInput;
  }

  get isEmpty(): boolean {
    return this.value === undefined || this.value === null || this.value === '';
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
