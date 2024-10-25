import * as zod from 'zod';

export const phoneSchema = zod.string().refine((value: string) => {
  const regex = /\+1\d{3}\d{3}\d{4}/;
  return regex.test(value);
}, 'Phone is invalid');
