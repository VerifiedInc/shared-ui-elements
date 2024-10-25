import * as zod from 'zod';

export const descriptionSchema = zod
  .string()
  .min(3, 'Must have enough description');
