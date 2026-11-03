import { zod3String } from '../utils/zod';

export const fieldSchema = zod3String().min(
  1,
  'String must contain at least 1 character(s)',
);
