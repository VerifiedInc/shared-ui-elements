import { z } from 'zod';

import { healthInsuranceFormat } from '../formats';
import {
  healthInsuranceSchema,
  HealthInsuranceValue,
  memberIdSchema,
  payerNameSchema,
} from '../validations';

import type { TextFieldDefinition, CompositeFieldDefinition } from './types';

const healthInsuranceKey = 'healthInsurance';
const memberIdKey = 'memberId';
const payerKey = 'payer';

export const memberId = {
  key: memberIdKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'Member ID',
    placeholder: 'Enter member ID',
  },
  zodSchema: memberIdSchema,
};

export const payerName = {
  key: 'name',
  characteristics: {
    inputType: 'text' as const,
    label: 'Payer Name',
    placeholder: 'Enter insurance payer name',
  },
  zodSchema: payerNameSchema,
};

export const payer = {
  key: payerKey,
  characteristics: {
    inputType: 'composite' as const,
    label: 'Payer',
    defaultOrder: ['name'] as const,
  },
  children: {
    name: payerName,
  },
  zodSchema: z.object({
    name: payerNameSchema.optional(),
  }),
};

export const healthInsurance = {
  key: healthInsuranceKey,
  characteristics: {
    inputType: 'composite' as const,
    label: 'Health Insurance',
    defaultOrder: [memberIdKey, payerKey] as const,
  },
  zodSchema: healthInsuranceSchema,
  format: healthInsuranceFormat,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    healthInsurance: CompositeFieldDefinition<typeof healthInsuranceKey>;
    memberId: TextFieldDefinition<typeof memberIdKey>;
    payer: CompositeFieldDefinition<typeof payerKey>;
    payerName: TextFieldDefinition<'name'>;
  }

  interface FieldValueDefinitions {
    healthInsurance: HealthInsuranceValue;
  }
}
