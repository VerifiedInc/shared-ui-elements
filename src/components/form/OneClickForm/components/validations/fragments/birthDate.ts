import * as zod from 'zod';

const validate = (value: string) => {
  const now = new Date();
  const minDate = new Date('1900-01-01');
  const maxDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );
  const valueDate = new Date(value);

  if (valueDate >= minDate && valueDate <= maxDate) {
    const date = Date.parse(String(new Date(value)));
    return !isNaN(date);
  }

  return false;
};

export const birthDateSchema = zod.string().refine((value: string) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (regex.test(value)) {
    return validate(value);
  }
  return false;
}, 'Date of Birth is invalid');

export const simpleBirthDateSchema = zod.string().refine((value: string) => {
  const regex = /^\d{2}\d{2}\d{4}$/;
  if (regex.test(value)) {
    const formattedValue = `${value.slice(0, 2)}/${value.slice(
      2,
      4,
    )}/${value.slice(4, 8)}`;
    return validate(formattedValue);
  }
  return false;
}, 'Date of Birth is invalid');

export const shortenBirthDateSchema = zod.string().refine((value: string) => {
  const regex = /^\d{2}\d{2}$/;
  if (regex.test(value)) {
    const formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}/1970`;
    return validate(formattedValue);
  }
  return false;
}, 'Date of Birth is invalid');

const validateMinimumDate1900 = (timestampString: string): boolean => {
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

export const minimumDate1900Schema = zod.string().refine((value: string) => {
  // First validate it's a valid timestamp (accepts both positive and negative numbers)
  const timestampRegex = /^-?\d+$/;
  if (!timestampRegex.test(value)) {
    return false;
  }

  // Then validate minimum date requirement
  return validateMinimumDate1900(value);
}, 'Date must be from 1900 or later');

export const minimumAge18Schema = zod.string().refine((value: string) => {
  // First validate it's a valid timestamp (accepts both positive and negative numbers)
  const timestampRegex = /^-?\d+$/;
  if (!timestampRegex.test(value)) {
    return false;
  }

  // Then validate 18+ age requirement only
  return validateAge18Plus(value);
}, 'Must be 18 years or older');
