import * as zod from 'zod';
import { EmailFragmentSchema } from './email';
import { validatePhone } from '../../../utils/phone';

// SSN schema, validation regex were gathered from: https://uibakery.io/regex-library/ssn
export const SSNSchema = zod
  .string()
  .regex(/^(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/);

export const timestampSchema = zod.string().refine((value) => {
  if (!value) return false;
  return !isNaN(Number(value));
});

export const emailSchema = EmailFragmentSchema;

export const phoneSchema = zod.string().refine((value) => {
  return validatePhone(value);
});

export const defaultTextSchema = zod.string().min(1);
