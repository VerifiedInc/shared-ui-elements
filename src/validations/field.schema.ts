import { z } from 'zod';

export const fieldSchema = z
  .string()
  .min(1, 'String must contain at least 1 character(s)');
