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

// Union of all field characteristics
export type FieldCharacteristics =
  | TextFieldCharacteristics
  | SelectFieldCharacteristics
  | CompositeFieldCharacteristics;

// Base field definition contract
export interface BaseFieldDefinition<
  TKey extends string,
  TType extends string,
  TCharacteristics extends FieldCharacteristics = FieldCharacteristics,
> {
  type: TType;
  key: TKey;
  characteristics: TCharacteristics;
  zodSchema:
    | z.ZodString
    | z.ZodEnum<[string, ...string[]]>
    | z.ZodEffects<z.ZodString>
    | z.ZodObject<z.ZodRawShape>
    | z.ZodEffects<z.ZodObject<z.ZodRawShape>>
    | z.ZodOptional<z.ZodObject<z.ZodRawShape>>
    | z.ZodOptional<z.ZodString>
    | z.ZodOptional<z.ZodEffects<z.ZodString>>
    | z.ZodOptional<z.ZodEffects<z.ZodObject<z.ZodRawShape>>>;
  children?: Record<string, BaseFieldDefinition<string, string>>;
}

// Specific field contracts
export interface TextFieldDefinition<TKey extends string, TType extends string>
  extends BaseFieldDefinition<TKey, TType, TextFieldCharacteristics> {}

export interface SelectFieldDefinition<
  TKey extends string,
  TType extends string,
> extends BaseFieldDefinition<TKey, TType, SelectFieldCharacteristics> {}

export interface CompositeFieldDefinition<
  TKey extends string,
  TType extends string,
> extends BaseFieldDefinition<TKey, TType, CompositeFieldCharacteristics> {}

// Extract field keys for type safety
export type FieldKey = keyof FieldSchemaDefinitions;

// Extract credential types for type safety
export type CredentialType = FieldSchemaDefinitions[FieldKey]['type'];

// Helper type to get field definition by key
export type GetFieldDefinition<K extends FieldKey> = FieldSchemaDefinitions[K];

// Helper type to get credential type by field key
export type GetCredentialType<K extends FieldKey> =
  FieldSchemaDefinitions[K]['type'];
