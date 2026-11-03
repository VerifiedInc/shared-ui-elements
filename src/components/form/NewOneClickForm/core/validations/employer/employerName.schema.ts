import { zod3String } from '../../../../../../utils/zod';

export const employerNameValidationMessage = 'Employer name is required';

export const employerNameSchema = zod3String()
  .trim()
  .min(1, employerNameValidationMessage)
  .max(255, employerNameValidationMessage);
