import { zod3String } from '../utils/zod';

export const npiSchema = zod3String().refine(
  (npi) => /^[0-9]{10}$/.test(npi),
  'Invalid NPI',
);
