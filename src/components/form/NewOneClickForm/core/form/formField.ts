import { z } from 'zod';
import { cloneDeep } from 'lodash';
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
    this.children = options.children;
    this.touched = false;
    this.allowUserInput = options.allowUserInput ?? true;
    this.mandatory = options.mandatory ?? 'no';
    this.multi = options.multi ?? false;
    this.variants = options.variants;
    this.description = options.description;

    // For composite fields, modify schema to make non-mandatory children optional
    if (schema.characteristics.inputType === 'composite' && options.children) {
      // Handle both ZodObject and ZodEffects<ZodObject> (when .refine() is used)
      let baseSchema: z.ZodObject<z.ZodRawShape>;
      if ('shape' in schema.zodSchema) {
        // Direct ZodObject
        baseSchema = schema.zodSchema as z.ZodObject<z.ZodRawShape>;
      } else if (
        '_def' in schema.zodSchema &&
        'schema' in schema.zodSchema._def
      ) {
        // ZodEffects wrapping ZodObject
        baseSchema = (schema.zodSchema as any)._def
          .schema as z.ZodObject<z.ZodRawShape>;
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
    return this.value === undefined || this.value === null || this.value === '';
  }

  get isDirty(): boolean {
    if (
      this.schema.characteristics.inputType === 'composite' &&
      this.children
    ) {
      return Object.values(this.children).some((child) => child.isDirty);
    }
    return this.value !== this.defaultValue;
  }

  get errors(): { error: any; childrenErrors: Record<string, any> } | null {
    let error: any = null;
    const childrenErrors: Record<string, any> = {};

    // For composite fields, construct composite value from children for validation
    if (
      this.schema.characteristics.inputType === 'composite' &&
      this.children
    ) {
      const compositeValue: Record<string, any> = {};
      Object.entries(this.children).forEach(([key, child]) => {
        // Always include all child values for validation, even empty ones
        if (child.isEmpty && !child.isRequired) {
          compositeValue[key] = undefined;
        } else {
          compositeValue[key] = child.value;
        }
      });

      const result = this.schema.zodSchema.safeParse(compositeValue);
      error = result.success ? null : result.error;

      // Collect children errors for composite fields
      Object.entries(this.children).forEach(([key, child]) => {
        const childError = child.errors;
        if (childError) {
          childrenErrors[key] = childError;
        }
      });
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
        return formattedValue ?? compositeValue;
      } else {
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
    this.value =
      selectedVariant.value && typeof selectedVariant.value === 'object'
        ? cloneDeep(selectedVariant.value)
        : selectedVariant.value;
    // Use the variant's defaultValue, but create a deep copy if it's an object
    this.defaultValue =
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
  private deepCloneFormField(field: FormField): FormField {
    // Clone the field's value if it's an object
    const clonedValue =
      field.value && typeof field.value === 'object'
        ? cloneDeep(field.value)
        : field.value;

    // Clone the field's defaultValue if it's an object
    const clonedDefaultValue =
      field.defaultValue && typeof field.defaultValue === 'object'
        ? cloneDeep(field.defaultValue)
        : field.defaultValue;

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
    return new FormField(
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
