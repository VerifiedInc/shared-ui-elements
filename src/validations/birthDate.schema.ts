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
  // Safari doesn't allow date strings with hyphens
  const formattedValue = value.replace(/-/g, '/');
  const valueDate = new Date(formattedValue);

  if (valueDate >= minDate && valueDate <= maxDate) {
    const date = Date.parse(String(new Date(formattedValue)));
    return !isNaN(date);
  }

  return false;
};

export const birthDateSchema = zod.string().refine((value: string) => {
  const regex = /\d{2}-\d{2}-\d{4}/;
  if (regex.test(value)) {
    return validate(value);
  }
  return false;
}, 'Date of Birth is invalid');

export const birthDateSchemaWithPastOnlyValidation = zod.z
  .date()
  .refine((date) => date.getTime() < Date.now(), {
    message: 'Birthday must be in the past',
  });

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
