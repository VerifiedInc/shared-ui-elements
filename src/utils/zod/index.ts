import { z } from 'zod';

// How zod 3 named the type of a value it did not expect.
const zod3TypeOf = (value: unknown): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (typeof value === 'number' && Number.isNaN(value)) return 'nan';
  return typeof value;
};

/**
 * The messages zod 3 gave for a missing or mistyped value (`Required`, `Expected string, received
 * null`). Forms show them as is, so the move to zod 4 keeps them word for word (ENG-917).
 */
export const zod3TypeError = (
  issue: z.core.$ZodRawIssue,
): string | undefined => {
  if (issue.code !== 'invalid_type') return undefined;
  if (issue.input === undefined) return 'Required';
  if (issue.expected === 'date' && issue.input instanceof Date) {
    return 'Invalid date';
  }
  return `Expected ${issue.expected}, received ${zod3TypeOf(issue.input)}`;
};

const zod3EnumValues = (values: readonly unknown[]): string =>
  values.map((value) => `'${String(value)}'`).join(' | ');

/** The message zod 3 gave for a value outside an enum (ENG-917). */
export const zod3EnumError = (
  issue: z.core.$ZodRawIssue,
): string | undefined => {
  if (issue.code !== 'invalid_value') return undefined;
  if (issue.input === undefined) return 'Required';
  const expected = zod3EnumValues(issue.values);
  return typeof issue.input === 'string'
    ? `Invalid enum value. Expected ${expected}, received '${issue.input}'`
    : `Expected ${expected}, received ${zod3TypeOf(issue.input)}`;
};

/**
 * The message zod 3's `nativeEnum` gave for a value outside a TypeScript enum. Unlike `enum`, it
 * took a number as a candidate value, so a number gets the "Invalid enum value" message too.
 */
export const zod3NativeEnumError = (
  issue: z.core.$ZodRawIssue,
): string | undefined => {
  if (
    issue.code === 'invalid_value' &&
    typeof issue.input === 'number' &&
    !Number.isNaN(issue.input)
  ) {
    return `Invalid enum value. Expected ${zod3EnumValues(issue.values)}, received '${issue.input}'`;
  }
  return zod3EnumError(issue);
};

/** A string schema with zod 3's missing and wrong-type messages. */
export const zod3String = (): z.ZodString => z.string({ error: zod3TypeError });

/** An object schema with zod 3's missing and wrong-type messages. */
export const zod3Object = <TShape extends z.ZodRawShape>(
  shape: TShape,
): z.ZodObject<TShape> => z.object(shape, { error: zod3TypeError });

const isUrl = (value: string): boolean => {
  try {
    return Boolean(new URL(value));
  } catch {
    return false;
  }
};

/**
 * zod 3's URL check: whatever `new URL()` accepts, with the value left as given. zod 4's `z.url()`
 * trims the value and accepts some padded URLs zod 3 rejected.
 */
export const zod3Url = (message: string): z.ZodString =>
  zod3String().refine(isUrl, message);
