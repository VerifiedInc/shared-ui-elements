import { z } from 'zod';

import { memberIdSchema } from './memberId.schema';
import { payerNameSchema } from './payerName.schema';

export const healthInsuranceSchema = z.object({
  id: z.number().optional(),
  memberId: memberIdSchema,
  payer: z.object({
    verifiedId: z.string().regex(/^V\d+$/, 'Invalid'),
    name: payerNameSchema,
    logoUrl: z.union([z.url('Invalid url'), z.literal('')]).nullish(), // CS may return literal empty string
  }),
});

export type HealthInsuranceValue = z.infer<typeof healthInsuranceSchema>;
