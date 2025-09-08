import { z } from 'zod';
import type { SelectFieldDefinition } from './types';

const sexOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
] as const;

const sexValues = sexOptions.map((option) => option.value);
const sexSchema = z.enum(sexValues as [string, ...string[]]);

const sexKey = 'sex';

export const sex: SelectFieldDefinition<typeof sexKey, 'SexCredential'> = {
  type: 'SexCredential',
  key: sexKey,
  characteristics: {
    inputType: 'select',
    label: 'Sex',
    options: sexOptions,
  },
  zodSchema: sexSchema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    sex: SelectFieldDefinition<typeof sexKey, 'SexCredential'>;
  }
}
