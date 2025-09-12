import { z } from 'zod';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';

/**
 * Validate phone when it is valid and contains a country.
 * @param internationalPhone
 */
const validatePhone = (internationalPhone: string) => {
  const phoneMeta = parsePhoneNumber(internationalPhone);
  return isValidPhoneNumber(internationalPhone) && !!phoneMeta?.country;
};

/**
 * Validation schema for phone field in forms
 * Basic string validation for phone number input
 */
export const phoneSchema = z.string().refine((value) => validatePhone(value));
