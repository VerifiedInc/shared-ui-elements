import { zod3String } from '../../../../../../utils/zod';

export const line1ValidationMessage = 'Line 1 is required';

/**
 * Validation schema for address line 1
 * Basic string validation for street address
 */
export const line1Schema = zod3String().min(1, line1ValidationMessage);
