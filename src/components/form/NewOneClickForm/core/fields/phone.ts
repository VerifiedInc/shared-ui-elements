import { z } from 'zod';
import type { TextFieldDefinition } from './types';

const phoneSchema = z.string().min(1, 'Phone number is required');

export const phone: TextFieldDefinition<'phone', 'PhoneCredential'> = {
  type: 'PhoneCredential',
  key: 'phone',
  characteristics: {
    inputType: 'text',
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
  },
  zodSchema: phoneSchema.optional(),
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    phone: TextFieldDefinition<'phone', 'PhoneCredential'>;
  }
}
