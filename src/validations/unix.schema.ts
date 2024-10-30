import { z as zod } from 'zod';

export const unixStringDateSchema = zod
  .string()
  .min(10)
  .max(13)
  .refine((value: string) => {
    const regex = /^\d+$/; // Checks if the string contains only digits
    const isValid = regex.test(value) && !isNaN(Number(value));
    return isValid;
  }, 'Invalid Unix string timestamp');
