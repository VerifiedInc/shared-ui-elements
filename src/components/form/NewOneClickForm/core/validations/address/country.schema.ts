import { z } from 'zod';

export const countryValidationMessage = 'Country must be US';

/**
 * Validation schema for country
 * Currently only supports US
 */
export const countrySchema = z
  .string()
  .refine((value) => value === 'US', countryValidationMessage);
