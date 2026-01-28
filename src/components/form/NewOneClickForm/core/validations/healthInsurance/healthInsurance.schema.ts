import { z } from 'zod';

import { memberIdSchema } from './memberId.schema';
import { payerNameSchema } from './payerName.schema';

const healthInsuranceItemSchema = z.object({
  selected: z.boolean(),
  memberId: memberIdSchema,
  payer: z.object({
    verifiedId: z
      .string()
      .regex(/^V\d+$/)
      .optional(),
    name: payerNameSchema,
    logoUrl: z.string().url().optional(),
  }),
});

export const healthInsuranceSchema = z.array(healthInsuranceItemSchema);

export type HealthInsuranceValue = z.infer<typeof healthInsuranceSchema>;
