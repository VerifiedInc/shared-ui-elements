import { sexOptions, sexSchema } from '../validations';
import type { SelectFieldDefinition, ExtractedFieldValueType } from './types';

const sexKey = 'sex';

export const sex = {
  key: sexKey,
  characteristics: {
    inputType: 'select' as const,
    label: 'Sex',
    options: sexOptions,
  },
  zodSchema: sexSchema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    sex: SelectFieldDefinition<typeof sexKey>;
  }

  interface FieldValueDefinitions {
    sex: ExtractedFieldValueType<typeof sex>;
  }
}
