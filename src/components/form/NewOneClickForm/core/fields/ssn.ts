import { ssnSchema } from '../validations';
import { ssnFormat } from '../formats';

import type { TextFieldDefinition, ExtractedFieldValueType } from './types';

const ssnKey = 'ssn';

export const ssn = {
  key: ssnKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'SSN',
    placeholder: '123-45-6789',
  },
  zodSchema: ssnSchema,
  format: ssnFormat,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    ssn: TextFieldDefinition<typeof ssnKey>;
  }

  interface FieldValueDefinitions {
    ssn: ExtractedFieldValueType<typeof ssn>;
  }
}
