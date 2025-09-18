import { z } from 'zod';

/**
 * Validation schema for address line 2
 * Basic string validation for apartment, suite, etc.
 */
export const line2Schema = z.string();
