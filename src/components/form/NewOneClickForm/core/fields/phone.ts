import { phoneSchema } from '../validations';
import type { TextFieldDefinition, ExtractedFieldValueType } from './types';

const phoneKey = 'phone';

export const phone = {
  key: phoneKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'Phone Number',
    placeholder: '(555) 123-4567',
  },
  zodSchema: phoneSchema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    phone: TextFieldDefinition<typeof phoneKey>;
  }

  interface FieldValueDefinitions {
    phone: ExtractedFieldValueType<typeof phone>;
  }
}
