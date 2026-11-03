import { zod3String } from '../../../../../../utils/zod';

export const legalNameValidationMessage = 'Legal name is required';

export const legalNameSchema = zod3String()
  .trim()
  .min(1, legalNameValidationMessage)
  .max(255, legalNameValidationMessage);
