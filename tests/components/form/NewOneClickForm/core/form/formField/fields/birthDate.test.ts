import { test, describe, expect, beforeEach } from 'vitest';

import {
  FormField,
  FormFieldBuilder,
} from '../../../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../../../utils/form';

describe('birthDate', () => {
  let field: FormField<'birthDate'>;

  beforeEach(() => {
    field = new FormFieldBuilder().createFromCredential<'birthDate'>(
      makeCredential({ type: 'birthDate', value: { birthDate: '' } }),
      undefined,
      makeCredentialRequest({
        type: 'BirthDateCredential',
        allowUserInput: true,
        mandatory: 'yes',
        description: 'Birth Date',
      }),
    );
  });

  describe('isValid', () => {
    describe('timestamp validation', () => {
      test('valid timestamp is accepted', () => {
        // August 1, 1989 at 12:00 PM UTC (valid adult age)
        const timestamp = Date.UTC(1989, 7, 1, 12, 0, 0, 0).toString();
        field.value = timestamp;
        expect(field.isValid).toBe(true);
      });

      test('invalid timestamp string is rejected', () => {
        field.value = 'invalid-timestamp';
        expect(field.isValid).toBe(false);
      });

      test('empty string is rejected', () => {
        field.value = '';
        expect(field.isValid).toBe(false);
      });

      test('NaN string is rejected', () => {
        field.value = 'NaN';
        expect(field.isValid).toBe(false);
      });

      test('timestamp with wrong hour (not 12 PM UTC) is rejected', () => {
        // January 1, 1990 at 11:00 AM UTC (wrong hour)
        const timestamp = Date.UTC(1990, 0, 1, 11, 0, 0, 0).toString();
        field.value = timestamp;
        expect(field.isValid).toBe(false);
      });

      test('timestamp with wrong hour (1 PM UTC) is rejected', () => {
        // January 1, 1990 at 1:00 PM UTC (wrong hour)
        const timestamp = Date.UTC(1990, 0, 1, 13, 0, 0, 0).toString();
        field.value = timestamp;
        expect(field.isValid).toBe(false);
      });

      test('timestamp with wrong minutes is rejected', () => {
        // January 1, 1990 at 12:01 PM UTC (wrong minutes)
        const timestamp = Date.UTC(1990, 0, 1, 12, 1, 0, 0).toString();
        field.value = timestamp;
        expect(field.isValid).toBe(false);
      });

      test('timestamp with wrong seconds is rejected', () => {
        // January 1, 1990 at 12:00:01 PM UTC (wrong seconds)
        const timestamp = Date.UTC(1990, 0, 1, 12, 0, 1, 0).toString();
        field.value = timestamp;
        expect(field.isValid).toBe(false);
      });

      test('timestamp with wrong milliseconds is rejected', () => {
        // January 1, 1990 at 12:00:00.001 PM UTC (wrong milliseconds)
        const timestamp = Date.UTC(1990, 0, 1, 12, 0, 0, 1).toString();
        field.value = timestamp;
        expect(field.isValid).toBe(false);
      });
    });

    describe('age validation (18+ years)', () => {
      test('18 years old exactly is valid', () => {
        const now = new Date();
        const eighteenYearsAgo = Date.UTC(
          now.getFullYear() - 18,
          now.getMonth(),
          now.getDate(),
          12,
          0,
          0,
          0,
        );
        field.value = eighteenYearsAgo.toString();
        expect(field.isValid).toBe(true);
      });

      test('25 years old is valid', () => {
        const now = new Date();
        const twentyFiveYearsAgo = Date.UTC(
          now.getFullYear() - 25,
          now.getMonth(),
          now.getDate(),
          12,
          0,
          0,
          0,
        );
        field.value = twentyFiveYearsAgo.toString();
        expect(field.isValid).toBe(true);
      });

      test('under 18 years old is invalid', () => {
        const now = new Date();
        const seventeenYearsAgo = Date.UTC(
          now.getFullYear() - 17,
          now.getMonth(),
          now.getDate(),
          12,
          0,
          0,
          0,
        );
        field.value = seventeenYearsAgo.toString();
        expect(field.isValid).toBe(false);
      });

      test('10 years old is invalid', () => {
        const now = new Date();
        const tenYearsAgo = Date.UTC(
          now.getFullYear() - 10,
          now.getMonth(),
          now.getDate(),
          12,
          0,
          0,
          0,
        );
        field.value = tenYearsAgo.toString();
        expect(field.isValid).toBe(false);
      });

      test('future date is invalid', () => {
        const now = new Date();
        const futureDate = Date.UTC(
          now.getFullYear() + 1,
          now.getMonth(),
          now.getDate(),
          12,
          0,
          0,
          0,
        );
        field.value = futureDate.toString();
        expect(field.isValid).toBe(false);
      });
    });

    describe('before 1900 validation', () => {
      test('December 31, 1899 is invalid', () => {
        const beforeMinDate = Date.UTC(1899, 11, 31, 12, 0, 0, 0).toString();
        field.value = beforeMinDate;
        expect(field.isValid).toBe(false);
      });

      test('January 1, 1800 is invalid', () => {
        const wayBeforeMinDate = Date.UTC(1800, 0, 1, 12, 0, 0, 0).toString();
        field.value = wayBeforeMinDate;
        expect(field.isValid).toBe(false);
      });

      test('January 1, 1900 is valid (boundary case)', () => {
        const minValidDate = Date.UTC(1900, 0, 1, 12, 0, 0, 0).toString();
        field.value = minValidDate;
        expect(field.isValid).toBe(true);
      });

      test('January 2, 1900 is valid', () => {
        const afterMinDate = Date.UTC(1900, 0, 2, 12, 0, 0, 0).toString();
        field.value = afterMinDate;
        expect(field.isValid).toBe(true);
      });
    });

    describe('edge cases', () => {
      test('very old but valid adult (100+ years) is valid', () => {
        const now = new Date();
        const hundredYearsAgo = Date.UTC(
          now.getFullYear() - 100,
          now.getMonth(),
          now.getDate(),
          12,
          0,
          0,
          0,
        );
        field.value = hundredYearsAgo.toString();
        expect(field.isValid).toBe(true);
      });

      test('negative timestamp (before Unix epoch) but after 1900 is valid if adult', () => {
        // January 1, 1950 at 12:00 PM UTC (valid date and adult age)
        const timestamp = Date.UTC(1950, 0, 1, 12, 0, 0, 0).toString();
        field.value = timestamp;
        expect(field.isValid).toBe(true);
      });
    });
  });
});
