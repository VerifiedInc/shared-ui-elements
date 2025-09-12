import { z } from 'zod';
import { ssnRegex } from '../../../../../../utils/ssn';

/**
 * Validation schema for SSN field in forms
 * Supports both masked (•••-••-1234) and unmasked (123456789) formats
 */
export const ssnSchema = z.string().refine((value) => {
  if (/^•••-••-\d{4}$/.test(value)) return true;
  return ssnRegex.test(value);
}, 'Invalid SSN');
