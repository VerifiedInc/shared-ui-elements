import { zod3String } from '../../../../../../utils/zod';

export const zipCodeValidationMessage = 'Invalid zip code';

/**
 * Validation schema for US zip code
 * Supports both 5-digit and 9-digit (with hyphen) formats
 */
export const zipCodeSchema = zod3String().regex(
  /^\d{5}(-\d{4})?$/,
  zipCodeValidationMessage,
);
