import { ssnSchema } from '../validations';
import type { TextFieldDefinition } from './types';

const ssnKey = 'ssn';

export const ssn: TextFieldDefinition<typeof ssnKey, 'SsnCredential'> = {
  type: 'SsnCredential',
  key: ssnKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'SSN',
    placeholder: '123-45-6789',
  },
  zodSchema: ssnSchema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    ssn: TextFieldDefinition<typeof ssnKey, 'SsnCredential'>;
  }
}
