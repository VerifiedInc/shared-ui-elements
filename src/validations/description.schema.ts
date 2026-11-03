import { zod3String } from '../utils/zod';

export const descriptionSchema = zod3String().min(
  3,
  'Must have enough description',
);
