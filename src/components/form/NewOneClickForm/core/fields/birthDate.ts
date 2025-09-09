import { minimumAge18Schema } from '../validations';

import type { TextFieldDefinition } from './types';

const birthDateKey = 'birthDate';

export const birthDate: TextFieldDefinition<
  typeof birthDateKey,
  'BirthDateCredential'
> = {
  type: 'BirthDateCredential',
  key: birthDateKey,
  characteristics: {
    inputType: 'text',
    label: 'Birthday',
    placeholder: '(212) 555-0010',
  },
  zodSchema: minimumAge18Schema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    birthDate: TextFieldDefinition<typeof birthDateKey, 'BirthDateCredential'>;
  }
}
