import { z } from 'zod';
import type { FieldSchemaDefinitions } from '../declarations';

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

// Extract field keys for type safety
export type FieldKey = keyof FieldSchemaDefinitions;

// Extract credential types for type safety (now same as field keys)
export type CredentialType = FieldSchemaDefinitions[FieldKey]['key'];

// Helper type to get field definition by key
export type GetFieldDefinition<K extends FieldKey> = FieldSchemaDefinitions[K];

// Helper type to get credential type by field key (now same as key)
export type GetCredentialType<K extends FieldKey> =
  FieldSchemaDefinitions[K]['key'];
