import { z } from 'zod';

export const line1ValidationMessage = 'Line 1 is required';

/**
 * Validation schema for address line 1
 * Basic string validation for street address
 */
export const line1Schema = z.string().min(1, line1ValidationMessage);
