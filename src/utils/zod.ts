import type { z } from 'zod';

// How zod 3 named the type of a value it did not expect.
const zod3TypeOf = (value: unknown): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'number' && Number.isNaN(value)) return 'nan';
  return typeof value;
};

/**
 * The message zod 3 gave for a value outside an enum. Forms show it as is, so the move to zod 4
 * keeps it word for word (ENG-917).
 */
export const zod3EnumError = (
  issue: z.core.$ZodRawIssue,
): string | undefined => {
  if (issue.code !== 'invalid_value') return undefined;
  const expected = issue.values
    .map((value) => `'${String(value)}'`)
    .join(' | ');
  if (issue.input === undefined) return 'Required';
  return typeof issue.input === 'string'
    ? `Invalid enum value. Expected ${expected}, received '${issue.input}'`
    : `Expected ${expected}, received ${zod3TypeOf(issue.input)}`;
};
