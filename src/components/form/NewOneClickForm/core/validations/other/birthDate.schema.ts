import * as zod from 'zod';

const validateAge18Plus = (timestampString: string): boolean => {
  // Handle invalid date strings (e.g., "NaN")
  if (timestampString === 'NaN' || timestampString === '') {
    return false;
  }

  const birthTimestamp = parseInt(timestampString, 10);
  if (isNaN(birthTimestamp)) {
    return false;
  }

  const birthDate = new Date(birthTimestamp);
  if (isNaN(birthDate.getTime())) {
    return false;
  }

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

export const minimumAge18Schema = zod.string().refine((value: string) => {
  // First validate it's a valid timestamp (accepts both positive and negative numbers)
  const timestampRegex = /^-?\d+$/;
  if (!timestampRegex.test(value)) {
    return false;
  }

  // Then validate 18+ age requirement only
  return validateAge18Plus(value);
}, 'Must be 18 years or older');
