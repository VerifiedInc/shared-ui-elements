import { z } from 'zod';

import { addressSchema, stateSchema } from '../address';
import { dateSchema, documentNumberSchema } from '../other';

export const driversLicenseSchema = z.object({
  documentNumber: documentNumberSchema,
  issuanceState: stateSchema,
  issuanceDate: dateSchema,
  expirationDate: dateSchema,
  address: addressSchema,
});
