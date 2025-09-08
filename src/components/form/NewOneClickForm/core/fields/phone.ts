import { z } from 'zod';
import type { TextFieldDefinition } from './types';

const phoneSchema = z.string().min(1, 'Phone number is required');

const phoneKey = 'phone';

export const phone: TextFieldDefinition<typeof phoneKey, 'PhoneCredential'> = {
  type: 'PhoneCredential',
  key: phoneKey,
  characteristics: {
    inputType: 'text',
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
  },
  zodSchema: phoneSchema.optional(),
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    phone: TextFieldDefinition<typeof phoneKey, 'PhoneCredential'>;
  }
}
