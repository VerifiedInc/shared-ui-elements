import * as zod from 'zod';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';

/**
 * Validate phone when it is valid and contains a country.
 * @param internationalPhone
 */
const validatePhone = (internationalPhone: string) => {
  const pattern = /^\+[1-9]\d{1,14}$/;

  if (!pattern.test(internationalPhone)) {
    return false;
  }

  const phoneMeta = parsePhoneNumber(internationalPhone);
  const isNorthAmerica =
    phoneMeta?.country === 'CA' || phoneMeta?.country === 'US';
  return isValidPhoneNumber(internationalPhone) && isNorthAmerica;
};

export const phoneSchema = zod
  .string()
  .refine((value) => validatePhone(value), 'Phone is invalid');
