import { zod3String } from '../../../../../../utils/zod';

/**
 * Validation schema for address line 2
 * Basic string validation for apartment, suite, etc.
 */
export const line2Schema = zod3String();
