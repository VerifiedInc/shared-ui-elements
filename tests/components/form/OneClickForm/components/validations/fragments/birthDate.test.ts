import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import {
  minimumDate1900Schema,
  minimumAge18Schema,
} from '../../../../../../../src/components/form/OneClickForm/components/validations/fragments/birthDate';

describe('birthDate validation schemas', () => {
  let OriginalDate: DateConstructor;

  beforeEach(() => {
    OriginalDate = global.Date;
  });

  afterEach(() => {
    global.Date = OriginalDate;
  });

  describe('minimumDate1900Schema', () => {
    test('should accept valid timestamp from 1900', () => {
      const jan1st1900 = Date.UTC(1900, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumDate1900Schema.safeParse(jan1st1900);
      expect(result.success).toBe(true);
    });

    test('should accept valid timestamp after 1900', () => {
      const jan1st2000 = Date.UTC(2000, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumDate1900Schema.safeParse(jan1st2000);
      expect(result.success).toBe(true);
    });

    test('should accept current timestamp', () => {
      const now = Date.now().toString();
      const result = minimumDate1900Schema.safeParse(now);
      expect(result.success).toBe(true);
    });

    test('should reject timestamp before 1900', () => {
      const dec31st1899 = Date.UTC(1899, 11, 31, 23, 59, 59, 999).toString();
      const result = minimumDate1900Schema.safeParse(dec31st1899);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Date must be from 1900 or later',
      );
    });

    test('should reject negative timestamp before 1900', () => {
      const result = minimumDate1900Schema.safeParse('-2208988800001');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Date must be from 1900 or later',
      );
    });

    test('should reject invalid timestamp string', () => {
      const result = minimumDate1900Schema.safeParse('not-a-number');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Date must be from 1900 or later',
      );
    });

    test('should reject empty string', () => {
      const result = minimumDate1900Schema.safeParse('');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Date must be from 1900 or later',
      );
    });

    test('should reject "NaN" string', () => {
      const result = minimumDate1900Schema.safeParse('NaN');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Date must be from 1900 or later',
      );
    });

    test('should reject decimal numbers', () => {
      const result = minimumDate1900Schema.safeParse('123.456');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Date must be from 1900 or later',
      );
    });

    test('should reject string with spaces', () => {
      const result = minimumDate1900Schema.safeParse(' 1234567890 ');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(
        'Date must be from 1900 or later',
      );
    });

    test('should accept zero timestamp (1970-01-01)', () => {
      const result = minimumDate1900Schema.safeParse('0');
      expect(result.success).toBe(true);
    });

    test('should accept large positive timestamp', () => {
      const futureDate = Date.UTC(2050, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumDate1900Schema.safeParse(futureDate);
      expect(result.success).toBe(true);
    });
  });

  describe('minimumAge18Schema', () => {
    beforeEach(() => {
      // Mock current date to 2024-01-01 for consistent testing
      const mockDate = new Date('2024-01-01T00:00:00.000Z');
      const MockedDate = function (...args: any[]) {
        if (args.length === 0) {
          return mockDate;
        }
        return new OriginalDate(...(args as []));
      } as any;

      // Preserve static methods
      MockedDate.UTC = OriginalDate.UTC;
      MockedDate.now = OriginalDate.now;
      MockedDate.parse = OriginalDate.parse;
      MockedDate.prototype = OriginalDate.prototype;

      global.Date = MockedDate;
    });

    test('should accept birth date exactly 18 years ago', () => {
      // January 1, 2006 (exactly 18 years before 2024-01-01)
      const eighteenYearsAgo = Date.UTC(2006, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(eighteenYearsAgo);
      expect(result.success).toBe(true);
    });

    test('should accept birth date more than 18 years ago', () => {
      // January 1, 2000 (24 years before 2024-01-01)
      const moreThan18YearsAgo = Date.UTC(2000, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(moreThan18YearsAgo);
      expect(result.success).toBe(true);
    });

    test('should accept very old birth date', () => {
      // January 1, 1950
      const veryOldDate = Date.UTC(1950, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(veryOldDate);
      expect(result.success).toBe(true);
    });

    test('should reject birth date less than 18 years ago', () => {
      // January 1, 2010 (14 years before 2024-01-01)
      const lessThan18YearsAgo = Date.UTC(2010, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(lessThan18YearsAgo);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should reject future birth date', () => {
      // January 1, 2025 (future date)
      const futureDate = Date.UTC(2025, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(futureDate);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should reject current date', () => {
      // Current mocked date (2024-01-01)
      const currentDate = Date.UTC(2024, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(currentDate);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should reject invalid timestamp string', () => {
      const result = minimumAge18Schema.safeParse('not-a-number');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should reject empty string', () => {
      const result = minimumAge18Schema.safeParse('');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should reject "NaN" string', () => {
      const result = minimumAge18Schema.safeParse('NaN');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should reject decimal numbers', () => {
      const result = minimumAge18Schema.safeParse('123.456');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should reject string with spaces', () => {
      const result = minimumAge18Schema.safeParse(' 1234567890 ');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should handle edge case - birth date one day after 18th birthday cutoff', () => {
      // January 2, 2006 (one day after the 18-year cutoff)
      const oneDayAfterCutoff = Date.UTC(2006, 0, 2, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(oneDayAfterCutoff);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('Must be 18 years or older');
    });

    test('should handle edge case - birth date one day before 18th birthday cutoff', () => {
      // December 31, 2005 (one day before the 18-year cutoff)
      const oneDayBeforeCutoff = Date.UTC(2005, 11, 31, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(oneDayBeforeCutoff);
      expect(result.success).toBe(true);
    });

    test('should accept negative timestamp if it represents valid old date', () => {
      // Some date before 1970 that would make person over 18
      const oldNegativeTimestamp = Date.UTC(1960, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(oldNegativeTimestamp);
      expect(result.success).toBe(true);
    });
  });

  describe('edge cases for both schemas', () => {
    test('minimumDate1900Schema should handle boundary timestamp', () => {
      // Exactly at 1900-01-01 00:00:00 UTC
      const boundaryTimestamp = Date.UTC(1900, 0, 1, 0, 0, 0, 0).toString();
      const result = minimumDate1900Schema.safeParse(boundaryTimestamp);
      expect(result.success).toBe(true);
    });

    test('minimumAge18Schema should handle leap year calculations', () => {
      // Mock date to leap year
      const mockLeapYearDate = new Date('2024-02-29T00:00:00.000Z');
      const MockedLeapYearDate = function (...args: any[]) {
        if (args.length === 0) {
          return mockLeapYearDate;
        }
        return new OriginalDate(...(args as []));
      } as any;

      // Preserve static methods
      MockedLeapYearDate.UTC = OriginalDate.UTC;
      MockedLeapYearDate.now = OriginalDate.now;
      MockedLeapYearDate.parse = OriginalDate.parse;
      MockedLeapYearDate.prototype = OriginalDate.prototype;

      global.Date = MockedLeapYearDate;

      // Birth date 18 years before leap year date
      const eighteenYearsBefore = Date.UTC(2006, 1, 28, 0, 0, 0, 0).toString();
      const result = minimumAge18Schema.safeParse(eighteenYearsBefore);
      expect(result.success).toBe(true);
    });

    test('both schemas should reject non-numeric strings with mixed characters', () => {
      const invalidInput = '123abc456';

      const result1900 = minimumDate1900Schema.safeParse(invalidInput);
      expect(result1900.success).toBe(false);

      const resultAge18 = minimumAge18Schema.safeParse(invalidInput);
      expect(resultAge18.success).toBe(false);
    });
  });
});
