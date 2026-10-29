import { expect, it } from 'vitest';
import type { ZodType } from 'zod';

/**
 * What a schema does with one input, in the terms a caller sees: the parsed value, or the path and
 * message of every issue, in order. Issue codes are left out on purpose; they are zod's, not ours.
 */
export type Outcome =
  | { success: true; data?: unknown }
  | {
      success: false;
      issues: Array<{ path: PropertyKey[]; message: string }>;
    };

/** The input passes and comes back unchanged. */
export const valid: Outcome = { success: true };

/** The input passes and comes back as `data` (e.g. trimmed). */
export const validAs = (data: unknown): Outcome => ({ success: true, data });

export const invalid = (
  ...issues: Array<[PropertyKey[], string]>
): Outcome => ({
  success: false,
  issues: issues.map(([path, message]) => ({ path, message })),
});

const expectOutcome = (
  schema: ZodType,
  input: unknown,
  expected: Outcome,
): void => {
  const result = schema.safeParse(input);
  const actual: Outcome = result.success
    ? { success: true, data: result.data }
    : {
        success: false,
        issues: result.error.issues.map(({ path, message }) => ({
          path,
          message,
        })),
      };
  expect(actual).toEqual(
    expected.success && !('data' in expected)
      ? { success: true, data: input }
      : expected,
  );
};

/** A schema's name, the schema, an input and what the schema does with it. */
export type SchemaCase = [string, ZodType, unknown, Outcome];

/** One test per case, titled with the schema's name and the input. */
export const itGivesEachOutcome = (cases: SchemaCase[]): void => {
  it.each(
    cases.map(
      ([name, schema, input, expected]) =>
        [name, input, schema, expected] as const,
    ),
  )('%s with %j', (_name, input, schema, expected) => {
    expectOutcome(schema, input, expected);
  });
};
