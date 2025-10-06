import { z } from 'zod';

export const cityValidationMessage = 'City is required';

/**
 * Validation schema for city
 * Basic string validation for city name
 */
export const citySchema = z.string().min(1, cityValidationMessage);
