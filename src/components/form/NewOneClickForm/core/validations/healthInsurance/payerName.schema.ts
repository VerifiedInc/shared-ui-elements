import { zod3String } from '../../../../../../utils/zod';

export const payerNameValidationMessage = 'Payer name is required';

export const payerNameSchema = zod3String()
  .min(1, payerNameValidationMessage)
  .max(255, payerNameValidationMessage)
  .trim();
