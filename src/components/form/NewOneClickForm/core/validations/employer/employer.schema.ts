import { z } from 'zod';

import { requiredAddressSchema } from '../address';

import { employerNameSchema } from './employerName.schema';
import { legalNameSchema } from './legalName.schema';
import { zod3Object, zod3Url } from '../../../../../../utils/zod';

export const employerSchema = zod3Object({
  employer: zod3Object({
    name: employerNameSchema,
    legalName: legalNameSchema.optional(),
    address: requiredAddressSchema.optional(),
    logoUrl: z.union([zod3Url('Invalid url'), z.literal('')]).nullish(),
  }),
});

export type EmployerValue = z.infer<typeof employerSchema>;
