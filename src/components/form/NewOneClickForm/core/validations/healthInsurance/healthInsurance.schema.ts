import { z } from 'zod';

import { memberIdSchema } from './memberId.schema';
import { payerNameSchema } from './payerName.schema';
import { zod3Object, zod3String, zod3Url } from '../../../../../../utils/zod';

export const healthInsuranceSchema = zod3Object({
  id: z.number().optional(),
  memberId: memberIdSchema,
  payer: zod3Object({
    verifiedId: zod3String().regex(/^V\d+$/, 'Invalid'),
    name: payerNameSchema,
    logoUrl: z.union([zod3Url('Invalid url'), z.literal('')]).nullish(), // CS may return literal empty string
  }),
});

export type HealthInsuranceValue = z.infer<typeof healthInsuranceSchema>;
