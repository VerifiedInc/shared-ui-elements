import * as zod from 'zod';

import { refineMinimumDate1900, refineTimestamp } from './date.schema';

const validateAge18Plus = (timestampString: string): boolean => {
  const birthTimestamp = parseInt(timestampString, 10);
  const birthDate = new Date(birthTimestamp);
  const nowDate = new Date();

  // Calculate 18 years ago from today in UTC, has to be end of the day as we enforce the value to be UTC 12h
  const eighteenYearsAgo = new Date(
    Date.UTC(
      nowDate.getUTCFullYear() - 18,
      nowDate.getUTCMonth(),
      nowDate.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );

  // Birth date must be on or before 18 years ago (18+ years old)
  return birthDate.getTime() <= eighteenYearsAgo.getTime();
};

const refineAge18Plus = (value: string) => {
  return validateAge18Plus(value);
};

export const birthDateSchema = zod
  .string()
  .refine(refineTimestamp, '')
  .refine(refineMinimumDate1900, '')
  .refine(refineAge18Plus, 'Must be 18 years or older');
