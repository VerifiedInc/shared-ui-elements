import * as zod from 'zod';

export const EmailFragmentSchema = zod
  .string()
  .min(1, 'Email is required')
  .email('Must be a valid email');
