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
