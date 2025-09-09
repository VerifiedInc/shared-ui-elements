import { phoneSchema } from '../validations';
import type { TextFieldDefinition } from './types';

const phoneKey = 'phone';

export const phone: TextFieldDefinition<typeof phoneKey, 'PhoneCredential'> = {
  type: 'PhoneCredential',
  key: phoneKey,
  characteristics: {
    inputType: 'text',
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
  },
  zodSchema: phoneSchema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    phone: TextFieldDefinition<typeof phoneKey, 'PhoneCredential'>;
  }
}
