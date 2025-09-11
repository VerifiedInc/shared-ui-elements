import { dateFormat } from '../formats';
import { birthDateSchema } from '../validations';

import type { DateFieldDefinition } from './types';

const birthDateKey = 'birthDate';

export const birthDate: DateFieldDefinition<
  typeof birthDateKey,
  'BirthDateCredential'
> = {
  type: 'BirthDateCredential',
  key: birthDateKey,
  characteristics: {
    inputType: 'date',
    label: 'Birthday',
    placeholder: '__/__/____',
  },
  zodSchema: birthDateSchema,
  format: dateFormat,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    birthDate: DateFieldDefinition<typeof birthDateKey, 'BirthDateCredential'>;
  }
}
