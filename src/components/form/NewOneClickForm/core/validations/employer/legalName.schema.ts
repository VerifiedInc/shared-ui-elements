import { z } from 'zod';

export const legalNameValidationMessage = 'Legal name is required';

export const legalNameSchema = z
  .string()
  .trim()
  .min(1, legalNameValidationMessage)
  .max(255, legalNameValidationMessage);
