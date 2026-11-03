import { zod3String } from '../../../../../../utils/zod';

export const countryValidationMessage = 'Country must be US';

/**
 * Validation schema for country
 * Currently only supports US
 */
export const countrySchema = zod3String().refine(
  (value) => value === 'US',
  countryValidationMessage,
);
