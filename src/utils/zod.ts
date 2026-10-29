import type { z } from 'zod';

/**
 * The message zod 3 gave for a value outside an enum. Forms show it as is, so the move to zod 4
 * keeps it word for word (ENG-917).
 */
export const zod3EnumError = (
  issue: z.core.$ZodRawIssue,
): string | undefined =>
  issue.code === 'invalid_value'
    ? `Invalid enum value. Expected ${issue.values.map((value) => `'${String(value)}'`).join(' | ')}, received '${String(issue.input)}'`
    : undefined;
