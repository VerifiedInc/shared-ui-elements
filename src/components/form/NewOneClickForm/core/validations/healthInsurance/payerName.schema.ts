import { z } from 'zod';

export const payerNameValidationMessage = 'Payer name is required';

export const payerNameSchema = z
  .string()
  .min(1, payerNameValidationMessage)
  .trim();
