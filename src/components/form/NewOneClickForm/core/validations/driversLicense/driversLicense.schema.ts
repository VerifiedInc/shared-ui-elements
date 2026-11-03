import { addressSchema, stateSchema } from '../address';
import { dateSchema, documentNumberSchema } from '../other';
import { zod3Object } from '../../../../../../utils/zod';

export const driversLicenseSchema = zod3Object({
  documentNumber: documentNumberSchema,
  issuanceState: stateSchema,
  issuanceDate: dateSchema,
  expirationDate: dateSchema,
  address: addressSchema,
});
