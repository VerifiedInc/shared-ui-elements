import { z } from 'zod';

export const employerNameValidationMessage = 'Employer name is required';

export const employerNameSchema = z
  .string()
  .trim()
  .min(1, employerNameValidationMessage)
  .max(255, employerNameValidationMessage);
