import { z } from 'zod';

export const memberIdValidationMessage = 'Member ID is required';

export const memberIdSchema = z
  .string()
  .min(1, memberIdValidationMessage)
  .max(255, memberIdValidationMessage);
