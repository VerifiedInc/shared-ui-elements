import { zod3String } from '../../../../../../utils/zod';

export const cityValidationMessage = 'City is required';

/**
 * Validation schema for city
 * Basic string validation for city name
 */
export const citySchema = zod3String().min(1, cityValidationMessage);
