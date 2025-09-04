import { z } from 'zod';
import type { SelectFieldDefinition } from './types';

const sexOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
] as const;

const sexValues = sexOptions.map((option) => option.value);
const sexSchema = z.enum(sexValues as [string, ...string[]]);

export const sex: SelectFieldDefinition<'sex', 'SexCredential'> = {
  type: 'SexCredential',
  key: 'sex',
  characteristics: {
    inputType: 'select',
    label: 'Sex',
    options: sexOptions,
  },
  zodSchema: sexSchema.optional(),
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    sex: SelectFieldDefinition<'sex', 'SexCredential'>;
  }
}
