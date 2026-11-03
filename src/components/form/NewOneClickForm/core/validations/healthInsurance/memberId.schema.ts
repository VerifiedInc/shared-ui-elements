import { zod3String } from '../../../../../../utils/zod';

export const memberIdValidationMessage = 'Member ID is required';

export const memberIdSchema = zod3String()
  .min(1, memberIdValidationMessage)
  .max(255, memberIdValidationMessage);
