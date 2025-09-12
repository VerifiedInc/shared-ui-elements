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
  defaultOrder: string[];
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
  children?: Record<string, BaseFieldDefinition<string>>;
  format?: (value: any) => string | null;
}

// Specific field contracts
export interface TextFieldDefinition<TKey extends string>
  extends BaseFieldDefinition<TKey, TextFieldCharacteristics> {}

export interface SelectFieldDefinition<TKey extends string>
  extends BaseFieldDefinition<TKey, SelectFieldCharacteristics> {}

export interface CompositeFieldDefinition<TKey extends string>
  extends BaseFieldDefinition<TKey, CompositeFieldCharacteristics> {}

export interface DateFieldDefinition<TKey extends string>
  extends BaseFieldDefinition<TKey, DateFieldCharacteristics> {}
