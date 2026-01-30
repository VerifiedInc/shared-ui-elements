import { z } from 'zod';

export const memberIdValidationMessage = 'Member ID is required';

// Accepts masked format like '••••••1234' or unmasked alphanumeric member ID
const maskedMemberIdRegex = /^•+(\w{4})$/;

export const memberIdSchema = z.string().refine(
  (val) => {
    // Allow masked format or any non-empty string with at least 4 characters
    return maskedMemberIdRegex.test(val) || val.trim().length >= 4;
  },
  {
    message: memberIdValidationMessage,
  },
);
