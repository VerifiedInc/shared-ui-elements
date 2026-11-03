import { describe } from 'vitest';
import { z } from 'zod';

import { zod3EnumError, zod3NativeEnumError } from '../../src/utils/zod';
import { invalid, itGivesEachOutcome, valid } from './schemaOutcome';

enum Level {
  Low,
  High,
}

enum Color {
  Red = 'red',
  Blue = 'blue',
}

const nativeEnum = z.enum(Color, { error: zod3NativeEnumError });
const numericEnum = z.enum(Level, { error: zod3NativeEnumError });
const stringEnum = z.enum(['red', 'blue'], { error: zod3EnumError });
const expected = "'red' | 'blue'";

// The messages zod 3's `nativeEnum` and `enum` gave for each input (ENG-917).
describe('zod 3 enum messages', () => {
  itGivesEachOutcome([
    ['nativeEnum', nativeEnum, 'red', valid],
    ['nativeEnum', nativeEnum, undefined, invalid([[], 'Required'])],
    [
      'nativeEnum',
      nativeEnum,
      'green',
      invalid([
        [],
        `Invalid enum value. Expected ${expected}, received 'green'`,
      ]),
    ],
    [
      'nativeEnum',
      nativeEnum,
      7,
      invalid([[], `Invalid enum value. Expected ${expected}, received '7'`]),
    ],
    [
      'nativeEnum',
      nativeEnum,
      NaN,
      invalid([[], `Expected ${expected}, received nan`]),
    ],
    [
      'nativeEnum',
      nativeEnum,
      true,
      invalid([[], `Expected ${expected}, received boolean`]),
    ],
    [
      'nativeEnum',
      nativeEnum,
      null,
      invalid([[], `Expected ${expected}, received null`]),
    ],
    [
      'nativeEnum',
      nativeEnum,
      ['red'],
      invalid([[], `Expected ${expected}, received array`]),
    ],
    [
      'enum',
      stringEnum,
      7,
      invalid([[], `Expected ${expected}, received number`]),
    ],
    [
      'enum',
      stringEnum,
      'green',
      invalid([
        [],
        `Invalid enum value. Expected ${expected}, received 'green'`,
      ]),
    ],
    // zod 3 quoted string values only.
    ['numeric nativeEnum', numericEnum, 1, valid],
    [
      'numeric nativeEnum',
      numericEnum,
      2,
      invalid([[], "Invalid enum value. Expected 0 | 1, received '2'"]),
    ],
    [
      'numeric nativeEnum',
      numericEnum,
      'Low',
      invalid([[], "Invalid enum value. Expected 0 | 1, received 'Low'"]),
    ],
    [
      'numeric nativeEnum',
      numericEnum,
      true,
      invalid([[], 'Expected 0 | 1, received boolean']),
    ],
  ]);
});
