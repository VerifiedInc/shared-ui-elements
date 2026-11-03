import { z } from 'zod';

import { emailRegexPattern } from '../constants/email';
import { zod3String, zod3TypeError } from '../utils/zod';

export const emailSchema = z.email({
  error: (issue) => zod3TypeError(issue) ?? 'Invalid email',
});

export const businessEmailSchema = zod3String().refine((email) => {
  return (
    emailSchema.safeParse(email).success &&
    new RegExp(emailRegexPattern).test(email)
  );
});
