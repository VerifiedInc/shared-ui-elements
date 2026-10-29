import { z } from 'zod';

import { emailRegexPattern } from '../constants/email';

export const emailSchema = z.email('Invalid email');

export const businessEmailSchema = z.string().refine((email) => {
  return (
    emailSchema.safeParse(email).success &&
    new RegExp(emailRegexPattern).test(email)
  );
});
