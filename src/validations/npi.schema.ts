import { z as zod } from 'zod';

export const npiSchema = zod
  .string()
  .refine((npi) => /^[0-9]{10}$/.test(npi), 'Invalid NPI');
