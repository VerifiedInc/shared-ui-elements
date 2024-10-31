import { z as zod } from 'zod';

export const getUnixSchema = (message = 'Invalid Unix string timestamp') => {
  return zod.string().refine((value: string) => {
    const regex = /^\d+$/; // Checks if the string contains only digits
    const isValidRegex = regex.test(value) && !isNaN(Number(value));

    // Added the length check here to ensure that the displayed message is the one in the message parameter
    return isValidRegex && value.length >= 10 && value.length <= 13;
  }, message);
};
