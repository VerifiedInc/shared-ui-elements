import { z } from 'zod';

import { zod3EnumError } from '../../../../../../utils/zod';

/**
 * Sex options for selection
 */
export const sexOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Non-Binary', value: 'Non-Binary' },
] as const;

/**
 * Validation schema for sex selection
 * Validates against predefined sex options
 */
export const sexSchema = z.enum(
  sexOptions.map((option) => option.value) as [string, ...string[]],
  { error: zod3EnumError },
);
