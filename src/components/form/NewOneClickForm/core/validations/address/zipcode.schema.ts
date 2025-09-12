import { z } from 'zod';

/**
 * Validation schema for US zip code
 * Supports both 5-digit and 9-digit (with hyphen) formats
 */
export const zipCodeSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, 'Enter a valid US zip code (12345 or 12345-6789)');
