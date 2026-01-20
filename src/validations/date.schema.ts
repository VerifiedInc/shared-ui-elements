import * as zod from 'zod';

export const USDateSchema = zod.string().refine((value: string) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (regex.test(value)) {
    const date = Date.parse(String(new Date(value)));
    return !isNaN(date);
  }
  return false;
}, 'Date is invalid');

export const getDateSchemaWithPastValidation = (
  message: string,
): zod.ZodEffects<zod.ZodDate, Date, Date> => {
  return zod.date().refine((date) => date.getTime() < Date.now(), {
    message,
  });
};

export const validateTimestamp = (timestampString: string): boolean => {
  const timestampRegex = /^-?\d+$/;
  if (!timestampRegex.test(timestampString)) {
    return false;
  }

  // Handle invalid date strings (e.g., "NaN")
  if (timestampString === 'NaN' || timestampString === '') {
    return false;
  }

  const timestamp = parseInt(timestampString, 10);
  if (isNaN(timestamp)) {
    return false;
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return false;
  }

  // Ensure the timestamp represents exactly 12:00 PM (noon) UTC
  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();
  const utcSeconds = date.getUTCSeconds();
  const utcMilliseconds = date.getUTCMilliseconds();

  // Only accept timestamps that represent exactly 12:00:00.000 UTC
  if (
    utcHours !== 12 ||
    utcMinutes !== 0 ||
    utcSeconds !== 0 ||
    utcMilliseconds !== 0
  ) {
    return false;
  }

  return true;
};

export const validateMinimumDate1900 = (timestampString: string): boolean => {
  // Handle invalid date strings (e.g., "NaN")
  if (timestampString === 'NaN' || timestampString === '') {
    return false;
  }

  const timestamp = parseInt(timestampString, 10);
  if (isNaN(timestamp)) {
    return false;
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return false;
  }

  // Set minimum valid date (January 1, 1900 at 00:00:00 UTC)
  const minValidTimestamp = Date.UTC(1900, 0, 1, 0, 0, 0, 0);

  // Date must be on or after January 1, 1900
  return timestamp >= minValidTimestamp;
};

export const refineTimestamp = (value: string) => {
  return validateTimestamp(value);
};

export const refineMinimumDate1900 = (value: string) => {
  // First validate it's a valid timestamp (accepts both positive and negative numbers)
  const timestampRegex = /^-?\d+$/;
  if (!timestampRegex.test(value)) {
    return false;
  }
  return validateMinimumDate1900(value);
};

export const validateAge18Plus = (timestampString: string): boolean => {
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

export const refineAge18Plus = (value: string) => {
  return validateAge18Plus(value);
};

export const dateSchema = zod
  .string()
  .refine(refineTimestamp, '')
  .refine(refineMinimumDate1900, '');

export const birthDateSchema = zod
  .string()
  .refine(refineTimestamp, '')
  .refine(refineMinimumDate1900, '')
  .refine(refineAge18Plus, 'Must be 18 years or older');
