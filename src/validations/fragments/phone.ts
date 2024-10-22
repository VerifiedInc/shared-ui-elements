import * as zod from 'zod';
import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';

export const PhoneFragmentSchema = zod.string();

export const StrictPhoneFragmentSchema = PhoneFragmentSchema
  // To trigger required field it needs to contain at least one digit.
  .min(1, 'Phone is required')
  // Refine to allow to check for specific country code.
  .refine((data) => {
    const phoneMeta = parsePhoneNumber(data);
    return (
      isValidPhoneNumber(data) &&
      !!phoneMeta?.country &&
      ['CA', 'US', 'BR'].includes(phoneMeta.country)
    );
  }, 'Phone is invalid');
