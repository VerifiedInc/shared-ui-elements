import { z } from 'zod';
import type { TextFieldDefinition } from './types';

const ssnSchema = z.string().refine((value) => {
  return /[0-9]{3}-[0-9]{2}-[0-9]{4}/.test(value);
});

export const ssn: TextFieldDefinition<'ssn', 'SsnCredential'> = {
  type: 'SsnCredential',
  key: 'ssn' as const,
  characteristics: {
    inputType: 'text' as const,
    label: 'Social Security Number',
    placeholder: '123-45-6789',
  },
  zodSchema: ssnSchema.optional(),
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    ssn: TextFieldDefinition<'ssn', 'SsnCredential'>;
  }
}
