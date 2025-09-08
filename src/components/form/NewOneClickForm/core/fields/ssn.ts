import { z } from 'zod';
import type { TextFieldDefinition } from './types';

const ssnSchema = z.string().refine((value) => {
  if (/^•••-••-\d{4}$/.test(value)) return true;
  return /[0-9]{3}-[0-9]{2}-[0-9]{4}/.test(value);
});

const ssnKey = 'ssn';

export const ssn: TextFieldDefinition<typeof ssnKey, 'SsnCredential'> = {
  type: 'SsnCredential',
  key: ssnKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'Social Security Number',
    placeholder: '123-45-6789',
  },
  zodSchema: ssnSchema.optional(),
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    ssn: TextFieldDefinition<typeof ssnKey, 'SsnCredential'>;
  }
}
