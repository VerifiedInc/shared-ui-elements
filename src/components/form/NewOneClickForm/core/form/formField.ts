import { z } from 'zod';
import { cloneDeep } from 'lodash';

import { type FieldValueDefinitions } from '../declarations';
import { credentialKeys, type BaseFieldDefinition } from '../fields';

export interface FormFieldOptions<
  TFieldKey extends keyof FieldValueDefinitions = keyof FieldValueDefinitions,
> {
  children?: Record<string, FormField>;
  allowUserInput?: boolean;
  mandatory?: 'yes' | 'no' | 'if_available';
  multi?: boolean;
  variants?: Array<FormField<TFieldKey>>;
  description?: string;
}

export class FormField<
  TFieldKey extends keyof FieldValueDefinitions = keyof FieldValueDefinitions,
> {
  id: string | undefined;
  private _defaultValue: FieldValueDefinitions[TFieldKey];
  private _value: FieldValueDefinitions[TFieldKey];
  schema: BaseFieldDefinition<string>;
  children?: Record<string, FormField>;
  touched: boolean;
  allowUserInput: boolean;
  mandatory: 'yes' | 'no' | 'if_available';
  multi: boolean;
  variants?: Array<FormField<TFieldKey>>;
  description?: string;

  constructor(
    id: string | undefined,
    defaultValue: FieldValueDefinitions[TFieldKey],
    value: FieldValueDefinitions[TFieldKey],
    schema: BaseFieldDefinition<string>,
    options: FormFieldOptions<TFieldKey> = {},
  ) {
    this.id = id;
    this._defaultValue = defaultValue;
    this._value = value;
    this.children = options.children;
    this.touched = false;
    this.allowUserInput = options.allowUserInput ?? true;
    this.mandatory = options.mandatory ?? 'no';
    this.multi = options.multi ?? false;
    this.variants = options.variants;
    this.description = options.description;

    // For composite fields, modify schema to make non-mandatory children optional
    if (schema.characteristics.inputType === 'composite' && options.children) {
      // If the schema has custom .refine() logic (ZodEffects), don't modify it
      // This preserves conditional validation logic like address validation
      if (
        '_def' in schema.zodSchema &&
        schema.zodSchema._def.typeName === 'ZodEffects'
      ) {
        this.schema = schema; // Keep original schema with .refine() logic
      } else {
        // Handle direct ZodObject schemas
        let baseSchema: z.ZodObject<z.ZodRawShape>;
        if ('shape' in schema.zodSchema) {
          // Direct ZodObject
          baseSchema = schema.zodSchema as z.ZodObject<z.ZodRawShape>;
        } else {
          throw new Error('Composite field could not be modified.');
        }

        const schemaShape = baseSchema.shape;
        const modifiedShape: Record<string, z.ZodSchema> = {};

        Object.entries(options.children).forEach(([key, child]) => {
          if (schemaShape[key]) {
            const originalSchema = schemaShape[key] as z.ZodSchema;

            if (!child.isRequired) {
              // Make the field optional for non-mandatory children
              modifiedShape[key] = originalSchema.optional();
            } else {
              // For mandatory fields, ensure string fields have minimum length
              if (originalSchema instanceof z.ZodString) {
                modifiedShape[key] = originalSchema.refine((value: any) => {
                  // If field is not required, and it is empty, return true
                  if (!child.isRequired && child.isEmpty) {
                    return true;
                  }
                  // If field is required, check for non-empty value
                  return value !== '' && value !== null && value !== undefined;
                }, `${child.schema.characteristics.label} is required`);
              } else {
                modifiedShape[key] = originalSchema;
              }
            }
          }
        });

        // Create new schema with modified shape
        this.schema = {
          ...schema,
          zodSchema: z.object(modifiedShape),
        };
      }
    } else {
      // For non-composite fields, add refine validation that checks requirement status
      this.schema = {
        ...schema,
        zodSchema: (schema.zodSchema as any).refine((value: any) => {
          // If field is not required, and it is empty, return true
          if (!this.isRequired && this.isEmpty) {
            return true;
          }
          // If field is required, check for non-empty value
          return value !== '' && value !== null && value !== undefined;
        }, `${schema.characteristics.label} is required`),
      };
    }
  }

  get defaultValue(): FieldValueDefinitions[TFieldKey] {
    // For composite fields, construct defaultValue dynamically from children
    if (
      this.schema.characteristics.inputType === 'composite' &&
      this.children
    ) {
      const compositeValue: Record<string, any> = {};
      Object.entries(this.children).forEach(([key, child]) => {
        // Include child defaultValues for all children that exist (were requested)
        compositeValue[key] = child.defaultValue;
      });

      // Return undefined if no children exist
      return Object.keys(compositeValue).length > 0
        ? (compositeValue as FieldValueDefinitions[TFieldKey])
        : (undefined as unknown as FieldValueDefinitions[TFieldKey]);
    }

    // For non-composite fields, return the stored defaultValue
    return this._defaultValue;
  }

  get value(): FieldValueDefinitions[TFieldKey] {
    // For composite fields, construct value dynamically from children
    if (
      this.schema.characteristics.inputType === 'composite' &&
      this.children
    ) {
      const compositeValue: Record<string, any> = {};
      Object.entries(this.children).forEach(([key, child]) => {
        // Always include all requested children in the composite value
        // For composite children (like address), use their value directly (they handle their own structure)
        // For primitive children, use empty string if empty, otherwise use their value
        if (child.schema.characteristics.inputType === 'composite') {
          // Composite children always return their structure, even if all sub-fields are empty
          compositeValue[key] = child.value;
        } else {
          // Primitive children: empty string for empty values, actual value otherwise
          compositeValue[key] = child.isEmpty ? '' : child.value;
        }
      });

      // Return the composite value if any children exist (were requested)
      return Object.keys(compositeValue).length > 0
        ? (compositeValue as FieldValueDefinitions[TFieldKey])
        : (undefined as unknown as FieldValueDefinitions[TFieldKey]);
    }

    // For non-composite fields, return the stored value
    return this._value;
  }

  set value(newValue: FieldValueDefinitions[TFieldKey]) {
    this._value = newValue;
  }

  get hasVariants(): boolean {
    if (!this.variants) {
      return false;
    }
    return this.variants.length > 1;
  }

  get isValid(): boolean {
    return this.errors === null;
  }

  get isRequired(): boolean {
    return this.mandatory === 'yes' || this.mandatory === 'if_available';
  }

  get isDisabled(): boolean {
    return !this.allowUserInput;
  }

  get isEmpty(): boolean {
    const _isEmpty = (value: any): boolean => {
      if (value === undefined || value === null || value === '') {
        return true;
      }

      if (typeof value === 'object' && value !== null) {
        return Object.values(value).every(_isEmpty);
      }

      return false;
    };

    return _isEmpty(this.value);
  }

  get isDirty(): boolean {
    if (
      this.schema.characteristics.inputType === 'composite' &&
      this.children
    ) {
      return Object.values(this.children).some((child) => child.isDirty);
    }
    return this._value !== this._defaultValue;
  }

  get errors(): { error: any; childrenErrors: Record<string, any> } | null {
    let error: any = null;
    const childrenErrors: Record<string, any> = {};

    // For composite fields, construct composite value from children for validation
    if (
      this.schema.characteristics.inputType === 'composite' &&
      this.children
    ) {
      // Always construct composite value from children to handle optional fields correctly
      const compositeValue: Record<string, any> = {};
      Object.entries(this.children).forEach(([key, child]) => {
        // Always include all child values for validation, even empty ones
        if (child.isEmpty && !child.isRequired) {
          // Mutate the composite value to be undefined as is a optional field
          compositeValue[key] = undefined;
        } else {
          compositeValue[key] = child.value;
        }
      });

      const result = this.schema.zodSchema.safeParse(compositeValue);
      error = result.success ? null : result.error;

      // For composite fields with custom validation (like address with sequential validation),
      // prioritize the composite schema's validation over individual child validation
      if (error?.issues && error.issues.length > 0) {
        // If composite schema provides validation errors, use those exclusively
        // This enables sequential validation and consistent error messages
        // Individual child errors are not collected to avoid duplicate/conflicting messages
      } else {
        // Only collect children errors if composite validation passed
        // This ensures nested composite field errors are properly bubbled up
        Object.entries(this.children).forEach(([key, child]) => {
          const childError = child.errors;
          if (childError) {
            childrenErrors[key] = childError;
          }
        });
      }
    } else {
      // For non-composite fields, validate the field's value
      // For optional empty fields, return null (no errors) immediately
      if (!this.isRequired && this.isEmpty) {
        error = null;
      } else {
        const result = this.schema.zodSchema.safeParse(this.value);
        error = result.success ? null : result.error;
      }
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

  get errorMessage(): string | null {
    const message = this.errors?.error?.issues?.find(
      (error: any) => typeof error.message === 'string',
    )?.message;
    return message ?? null;
  }

  get displayValue(): string | any {
    // Check if there's a format method available
    if (typeof this.schema.format === 'function') {
      // For composite fields, construct composite value from children
      if (
        this.schema.characteristics.inputType === 'composite' &&
        this.children
      ) {
        const compositeValue: Record<string, any> = {};
        Object.entries(this.children).forEach(([key, child]) => {
          compositeValue[key] = child.value;
        });

        // Try to format the composite value
        const formattedValue = this.schema.format(compositeValue);
        return formattedValue ?? null;
      } else {
        if (this.isEmpty) return null;

        // For non-composite fields, format the field's value
        const formattedValue = this.schema.format(this.value);
        return formattedValue ?? this.value;
      }
    }

    // For fields without format method, return the raw value
    return this.value;
  }

  /**
   * Replaces this field with a variant while preserving the current value
   * @param variantId - The ID of the variant to replace with
   */
  replaceWithVariant(variantId: string): void {
    if (!this.variants) {
      console.warn(`Field ${this.id} has no variants`);
      return;
    }

    // Find the selected variant
    const selectedVariant = this.variants.find(
      (variant) => variant.id === variantId,
    );
    if (!selectedVariant) {
      console.warn(`Variant ${variantId} not found for field ${this.id}`);
      return;
    }

    // Preserve the current field's variants (to maintain selection functionality)
    const preservedVariants = this.variants;

    // Replace the current field's properties with the variant's properties
    this.id = selectedVariant.id;
    this.schema = selectedVariant.schema;
    this.description = selectedVariant.description;
    this.allowUserInput = selectedVariant.allowUserInput;
    this.mandatory = selectedVariant.mandatory;
    this.multi = selectedVariant.multi;
    // Use the variant's value, but create a deep copy if it's an object
    this._value =
      selectedVariant.value && typeof selectedVariant.value === 'object'
        ? cloneDeep(selectedVariant.value)
        : selectedVariant.value;
    // Use the variant's defaultValue, but create a deep copy if it's an object
    this._defaultValue =
      selectedVariant.defaultValue &&
      typeof selectedVariant.defaultValue === 'object'
        ? cloneDeep(selectedVariant.defaultValue)
        : selectedVariant.defaultValue;
    // Keep the original variants array to maintain selection functionality
    this.variants = preservedVariants;

    // Handle children replacement - use variant's children and their values
    if (selectedVariant.children) {
      // Create deep copies of variant children to avoid reference sharing
      this.children = {};
      Object.entries(selectedVariant.children).forEach(([key, child]) => {
        if (this.children) {
          // Use recursive deep clone to handle N-depth nesting
          this.children[key] = this.deepCloneFormField(child);
        }
      });
    } else {
      // Variant has no children, clear current children
      this.children = undefined;
    }
  }

  /**
   * Deep clones a FormField and all its nested children recursively
   * @param field - The FormField to clone
   * @returns A deep copy of the FormField
   */
  private deepCloneFormField<T extends keyof FieldValueDefinitions>(
    field: FormField<T>,
  ): FormField<T> {
    // Clone the field's value if it's an object
    const clonedValue =
      field._value && typeof field._value === 'object'
        ? cloneDeep(field._value)
        : field._value;

    // Clone the field's defaultValue if it's an object
    const clonedDefaultValue =
      field._defaultValue && typeof field._defaultValue === 'object'
        ? cloneDeep(field._defaultValue)
        : field._defaultValue;

    // Recursively clone children if they exist
    let clonedChildren: Record<string, FormField> | undefined;
    if (field.children) {
      clonedChildren = {};
      Object.entries(field.children).forEach(([key, child]) => {
        if (clonedChildren) {
          clonedChildren[key] = this.deepCloneFormField(child);
        }
      });
    }

    // Create a new FormField instance with cloned data
    return new FormField<T>(
      field.id,
      clonedDefaultValue,
      clonedValue,
      field.schema,
      {
        children: clonedChildren,
        allowUserInput: field.allowUserInput,
        mandatory: field.mandatory,
        multi: field.multi,
        variants: field.variants, // Keep variants as reference (they should be immutable)
        description: field.description,
      },
    );
  }
}
