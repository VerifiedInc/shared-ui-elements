import { test, describe, expect, beforeEach } from 'vitest';

import {
  FormField,
  FormFieldBuilder,
} from '../../../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../../../utils/form';

describe('phone', () => {
  let field: FormField<'phone'>;

  beforeEach(() => {
    field = new FormFieldBuilder().createFromCredential<'phone'>(
      makeCredential({ type: 'phone', value: { phone: '' } }),
      undefined,
      makeCredentialRequest({
        type: 'PhoneCredential',
        allowUserInput: true,
        mandatory: 'yes',
        description: 'Phone Number',
      }),
    );
  });

  describe('isValid', () => {
    describe('valid US phone numbers (raw format)', () => {
      test('standard US number with +1 prefix is valid', () => {
        field.value = '+12125550010';
        expect(field.isValid).toBe(true);
      });

      test('US number with Atlanta area code is valid', () => {
        field.value = '+14045551234';
        expect(field.isValid).toBe(true);
      });

      test('US number with Los Angeles area code is valid', () => {
        field.value = '+13235551234';
        expect(field.isValid).toBe(true);
      });

      test('US number with Chicago area code is valid', () => {
        field.value = '+13125551234';
        expect(field.isValid).toBe(true);
      });

      test('US number with Miami area code is valid', () => {
        field.value = '+13055551234';
        expect(field.isValid).toBe(true);
      });

      test('US number with Boston area code is valid', () => {
        field.value = '+16175551234';
        expect(field.isValid).toBe(true);
      });

      test('US toll-free 800 number is valid', () => {
        field.value = '+18005551234';
        expect(field.isValid).toBe(true);
      });

      test('US toll-free 888 number is valid', () => {
        field.value = '+18885551234';
        expect(field.isValid).toBe(true);
      });
    });

    describe('invalid phone numbers', () => {
      test('empty string is invalid', () => {
        field.value = '';
        expect(field.isValid).toBe(false);
      });

      test('US number without + prefix is invalid', () => {
        field.value = '12125550010';
        expect(field.isValid).toBe(false);
      });

      test('US number without country code is invalid', () => {
        field.value = '2125550010';
        expect(field.isValid).toBe(false);
      });

      test('US number with wrong country code is invalid', () => {
        field.value = '+22125550010';
        expect(field.isValid).toBe(false);
      });

      test('too short US number is invalid', () => {
        field.value = '+1212555001';
        expect(field.isValid).toBe(false);
      });

      test('too long US number is invalid', () => {
        field.value = '+121255500100';
        expect(field.isValid).toBe(false);
      });

      test('US number with invalid area code (000) is invalid', () => {
        field.value = '+10005550010';
        expect(field.isValid).toBe(false);
      });

      test('US number with invalid area code (111) is invalid', () => {
        field.value = '+11115550010';
        expect(field.isValid).toBe(false);
      });

      test('formatted US number with parentheses is invalid', () => {
        field.value = '+1 (212) 555-0010';
        expect(field.isValid).toBe(false);
      });

      test('formatted US number with spaces is invalid', () => {
        field.value = '+1 212 555 0010';
        expect(field.isValid).toBe(false);
      });

      test('formatted US number with dashes is invalid', () => {
        field.value = '+1-212-555-0010';
        expect(field.isValid).toBe(false);
      });
    });

    describe('non-US phone numbers (should be invalid)', () => {
      test('Canadian number is invalid (US-only requirement)', () => {
        field.value = '+14161234567'; // Toronto area code
        expect(field.isValid).toBe(false);
      });

      test('Brazilian number is invalid', () => {
        field.value = '+5511989990000';
        expect(field.isValid).toBe(false);
      });

      test('UK number is invalid', () => {
        field.value = '+442071234567';
        expect(field.isValid).toBe(false);
      });

      test('German number is invalid', () => {
        field.value = '+4930123456';
        expect(field.isValid).toBe(false);
      });

      test('French number is invalid', () => {
        field.value = '+33123456789';
        expect(field.isValid).toBe(false);
      });

      test('Mexican number is invalid', () => {
        field.value = '+525512345678';
        expect(field.isValid).toBe(false);
      });
    });

    describe('edge cases', () => {
      test('only + symbol is invalid', () => {
        field.value = '+';
        expect(field.isValid).toBe(false);
      });

      test('only +1 is invalid', () => {
        field.value = '+1';
        expect(field.isValid).toBe(false);
      });

      test('letters in phone number are invalid', () => {
        field.value = '+1212555ABCD';
        expect(field.isValid).toBe(false);
      });

      test('special characters are invalid', () => {
        field.value = '+1212555@010';
        expect(field.isValid).toBe(false);
      });

      test('multiple + signs are invalid', () => {
        field.value = '++12125550010';
        expect(field.isValid).toBe(false);
      });

      test('phone number with leading zeros after country code', () => {
        field.value = '+10012345678';
        expect(field.isValid).toBe(false);
      });
    });
  });
});
