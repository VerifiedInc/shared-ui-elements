import { z } from 'zod';

import { requiredAddressSchema } from '../address';

import { employerNameSchema } from './employerName.schema';
import { legalNameSchema } from './legalName.schema';

export const employerSchema = z.object({
  employer: z.object({
    name: employerNameSchema,
    legalName: legalNameSchema.optional(),
    address: requiredAddressSchema,
  }),
});

export type EmployerValue = z.infer<typeof employerSchema>;
