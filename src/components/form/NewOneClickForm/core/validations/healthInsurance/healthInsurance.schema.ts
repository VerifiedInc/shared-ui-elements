import { z } from 'zod';

import { memberIdSchema } from './memberId.schema';
import { payerNameSchema } from './payerName.schema';

export const healthInsuranceSchema = z.object({
  id: z.number().optional(),
  memberId: memberIdSchema,
  payer: z.object({
    verifiedId: z.string().regex(/^V\d+$/),
    name: payerNameSchema,
    logoUrl: z.string().url().optional(),
  }),
});

export type HealthInsuranceValue = z.infer<typeof healthInsuranceSchema>;
