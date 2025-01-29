import * as zod from 'zod';

export const OTPFragmentSchema = zod
  .string()
  .regex(/^[0-9]{6}$/, 'Must be a valid verification code');
