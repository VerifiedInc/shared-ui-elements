import { ssnRegex } from '../../../../../../utils/ssn';
import { zod3String } from '../../../../../../utils/zod';

/**
 * Validation schema for SSN field in forms
 * Supports both masked (•••-••-1234 or ***-**-1234) and unmasked (123456789) formats
 */
export const ssnSchema = zod3String().refine((value) => {
  if (/^•••-••-\d{4}$/.test(value)) return true;
  if (/^\*\*\*-\*\*-\d{4}$/.test(value)) return true;
  return ssnRegex.test(value);
}, 'Invalid SSN');
