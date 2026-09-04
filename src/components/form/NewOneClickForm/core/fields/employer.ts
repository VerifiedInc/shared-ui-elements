import { employerFormat } from '../formats';
import { employerSchema, EmployerValue } from '../validations';

import type { CompositeFieldDefinition } from './types';

const employerKey = 'employer';

export const employer = {
  key: employerKey,
  characteristics: {
    inputType: 'composite' as const,
    label: 'Employer',
    defaultOrder: [] as const,
  },
  zodSchema: employerSchema,
  format: employerFormat,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    employer: CompositeFieldDefinition<typeof employerKey>;
  }

  interface FieldValueDefinitions {
    employer: EmployerValue;
  }
}
