import { z } from 'zod';

import { line1Schema, line1ValidationMessage } from './line1.schema';
import { line2Schema } from './line2.schema';
import { citySchema, cityValidationMessage } from './city.schema';
import { stateSchema, stateValidationMessage } from './state.schema';
import { countrySchema, countryValidationMessage } from './country.schema';
import { zipCodeSchema, zipCodeValidationMessage } from './zipcode.schema';

export const addressSchema = z
  .object({
    line1: line1Schema.optional(),
    line2: line2Schema.optional(),
    city: citySchema.optional(),
    state: stateSchema.optional(),
    country: countrySchema.optional(),
    zipCode: zipCodeSchema.optional(),
  })
  .superRefine((data, ctx) => {
    // Check if all fields are absent (don't exist as properties)
    const allFieldsAbsent = Object.values(data).every((value) => !value);

    if (allFieldsAbsent) {
      return true; // Pass validation if all fields are absent
    }

    // If any field exists as a property (even if empty/undefined), validate required fields
    const hasAnyField =
      Object.prototype.hasOwnProperty.call(data, 'line1') ||
      Object.prototype.hasOwnProperty.call(data, 'line2') ||
      Object.prototype.hasOwnProperty.call(data, 'city') ||
      Object.prototype.hasOwnProperty.call(data, 'state') ||
      Object.prototype.hasOwnProperty.call(data, 'country') ||
      Object.prototype.hasOwnProperty.call(data, 'zipCode');

    if (hasAnyField) {
      // Validate line1 is required (if property exists, it cannot be empty)
      if (
        Object.prototype.hasOwnProperty.call(data, 'line1') &&
        (!data.line1 || data.line1.trim() === '')
      ) {
        const line1Result = line1Schema.safeParse(data.line1);
        if (!line1Result.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['line1'],
            message: line1ValidationMessage,
          });
        }
      }

      // Validate city is required (if property exists, it cannot be empty)
      if (
        Object.prototype.hasOwnProperty.call(data, 'city') &&
        (!data.city || data.city.trim() === '')
      ) {
        const cityResult = citySchema.safeParse(data.city);
        if (!cityResult.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['city'],
            message: cityValidationMessage,
          });
        }
      }

      // Validate state using the imported schema (only if property exists)
      if (Object.prototype.hasOwnProperty.call(data, 'state')) {
        const stateResult = stateSchema.safeParse(data.state);
        if (!stateResult.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['state'],
            message: stateValidationMessage,
          });
        }
      }

      // Validate country using the imported schema (only if property exists)
      if (Object.prototype.hasOwnProperty.call(data, 'country')) {
        const countryResult = countrySchema.safeParse(data.country);
        if (!countryResult.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['country'],
            message: countryValidationMessage,
          });
        }
      }

      // Validate zipCode using the imported schema (only if property exists)
      if (Object.prototype.hasOwnProperty.call(data, 'zipCode')) {
        const zipCodeResult = zipCodeSchema.safeParse(data.zipCode);
        if (!zipCodeResult.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['zipCode'],
            message: zipCodeValidationMessage,
          });
        }
      }
    }
  });
