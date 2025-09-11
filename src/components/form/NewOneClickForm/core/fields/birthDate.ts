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
  format: (value: string) => {
    // Format as MM/DD/YYYY in UTC
    const date = new Date(Number(value));
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  },
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    birthDate: DateFieldDefinition<typeof birthDateKey, 'BirthDateCredential'>;
  }
}
