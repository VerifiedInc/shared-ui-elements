import { z } from 'zod';

// Base field characteristics contracts
export interface TextFieldCharacteristics {
  inputType: 'text';
  label: string;
  placeholder?: string;
}

export interface SelectFieldCharacteristics {
  inputType: 'select';
  label: string;
  options: ReadonlyArray<{ label: string; value: string }>;
}

export interface CompositeFieldCharacteristics {
  inputType: 'composite';
  label: string;
  defaultOrder: readonly string[];
}

export interface DateFieldCharacteristics {
  inputType: 'date';
  label: string;
  placeholder?: string;
}

// Union of all field characteristics
export type FieldCharacteristics =
  | TextFieldCharacteristics
  | SelectFieldCharacteristics
  | CompositeFieldCharacteristics
  | DateFieldCharacteristics;

// Base field definition contract
export interface BaseFieldDefinition<
  TKey extends string,
  TCharacteristics extends FieldCharacteristics = FieldCharacteristics,
> {
  key: TKey;
  characteristics: TCharacteristics;
  zodSchema: z.ZodTypeAny;
  format?: (value: any) => string | null;
}

// Specific field contracts
export interface TextFieldDefinition<TKey extends string>
  extends BaseFieldDefinition<TKey, TextFieldCharacteristics> {}

export interface SelectFieldDefinition<TKey extends string>
  extends BaseFieldDefinition<TKey, SelectFieldCharacteristics> {}

export interface CompositeFieldDefinition<TKey extends string>
  extends BaseFieldDefinition<TKey, CompositeFieldCharacteristics> {
  children: Record<string, BaseFieldDefinition<string>>;
}

export interface DateFieldDefinition<TKey extends string>
  extends BaseFieldDefinition<TKey, DateFieldCharacteristics> {}

// Utility type to extract primitive field value types
export type ExtractedFieldValueType<T> = T extends {
  characteristics: { inputType: 'composite' };
  children: infer C;
}
  ? C extends Record<string, any>
    ? {
        [K in keyof C]?: ExtractPrimitiveType<C[K]>;
      }
    : never
  : ExtractPrimitiveType<T>;

// Helper type to extract primitive types from field definitions
type ExtractPrimitiveType<T> = T extends {
  characteristics: { inputType: 'text' };
}
  ? string
  : T extends { characteristics: { inputType: 'select' } }
    ? string
    : T extends { characteristics: { inputType: 'date' } }
      ? string
      : never;
