import * as zod from 'zod';
import { EmailFragmentSchema } from './email';
import { validatePhone } from '../../../utils/phone';

import { SSNSchema } from '../../../../../../validations/ssn.schema';

export { SSNSchema };

export const timestampSchema = zod.string().refine((value) => {
  if (!value) return false;
  return !isNaN(Number(value));
});

export const emailSchema = EmailFragmentSchema;

export const phoneSchema = zod.string().refine((value) => {
  return validatePhone(value);
});

export const defaultTextSchema = zod.string().min(1);
