import { z } from 'zod';

export const zipCodeValidationMessage = 'Invalid zip code';

/**
 * Validation schema for US zip code
 * Supports both 5-digit and 9-digit (with hyphen) formats
 */
export const zipCodeSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, zipCodeValidationMessage);
