import { dateFormat } from '../formats';
import { birthDateSchema } from '../validations';

import type { DateFieldDefinition, ExtractedFieldValueType } from './types';

const birthDateKey = 'birthDate';

export const birthDate = {
  key: birthDateKey,
  characteristics: {
    inputType: 'date' as const,
    label: 'Birthday',
    placeholder: '__/__/____',
  },
  zodSchema: birthDateSchema,
  format: dateFormat,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    birthDate: DateFieldDefinition<typeof birthDateKey>;
  }

  interface FieldValueDefinitions {
    birthDate: ExtractedFieldValueType<typeof birthDate>;
  }
}
