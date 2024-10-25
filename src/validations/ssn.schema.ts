import { z } from 'zod';

// SSN schema, validation regex were gathered from: https://uibakery.io/regex-library/ssn
export const SSNSchema = z
  .string()
  .regex(/^(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/);
