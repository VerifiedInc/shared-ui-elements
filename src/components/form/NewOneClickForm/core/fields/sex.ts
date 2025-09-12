import { sexOptions, sexSchema } from '../validations';
import type { SelectFieldDefinition } from './types';

const sexKey = 'sex';

export const sex: SelectFieldDefinition<typeof sexKey> = {
  key: sexKey,
  characteristics: {
    inputType: 'select',
    label: 'Sex',
    options: sexOptions,
  },
  zodSchema: sexSchema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    sex: SelectFieldDefinition<typeof sexKey>;
  }
}
