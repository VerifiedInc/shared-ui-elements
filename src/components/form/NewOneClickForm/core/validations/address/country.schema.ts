import { z } from 'zod';

/**
 * Validation schema for country
 * Currently only supports US
 */
export const countrySchema = z
  .string()
  .refine((value) => value === 'US', 'Country must be US');
