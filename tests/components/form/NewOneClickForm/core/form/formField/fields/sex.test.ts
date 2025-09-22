import { test, describe, expect, beforeEach } from 'vitest';

import {
  FormField,
  FormFieldBuilder,
} from '../../../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../../../utils/form';

describe('sex', () => {
  let field: FormField<'sex'>;

  beforeEach(() => {
    field = new FormFieldBuilder().createFromCredential<'sex'>(
      makeCredential({ type: 'sex', value: { sex: '' } }),
      undefined,
      makeCredentialRequest({
        type: 'SexCredential',
        allowUserInput: true,
        mandatory: 'yes',
        description: 'Sex',
      }),
    );
  });

  describe('isValid', () => {
    describe('valid sex options', () => {
      test('Male is valid', () => {
        field.value = 'Male';
        expect(field.isValid).toBe(true);
      });

      test('Female is valid', () => {
        field.value = 'Female';
        expect(field.isValid).toBe(true);
      });

      test('Non-Binary is valid', () => {
        field.value = 'Non-Binary';
        expect(field.isValid).toBe(true);
      });
    });

    describe('invalid sex options', () => {
      test('empty string is invalid', () => {
        field.value = '';
        expect(field.isValid).toBe(false);
      });

      test('invalid option "Other" is invalid', () => {
        field.value = 'Other';
        expect(field.isValid).toBe(false);
      });

      test('invalid option "male" (lowercase) is invalid', () => {
        field.value = 'male';
        expect(field.isValid).toBe(false);
      });

      test('invalid option "FEMALE" (uppercase) is invalid', () => {
        field.value = 'FEMALE';
        expect(field.isValid).toBe(false);
      });

      test('invalid option "M" is invalid', () => {
        field.value = 'M';
        expect(field.isValid).toBe(false);
      });

      test('invalid option "F" is invalid', () => {
        field.value = 'F';
        expect(field.isValid).toBe(false);
      });

      test('invalid option with extra spaces is invalid', () => {
        field.value = ' Male ';
        expect(field.isValid).toBe(false);
      });

      test('numeric value is invalid', () => {
        field.value = '1';
        expect(field.isValid).toBe(false);
      });

      test('special characters are invalid', () => {
        field.value = 'Male!';
        expect(field.isValid).toBe(false);
      });

      test('random string is invalid', () => {
        field.value = 'RandomString';
        expect(field.isValid).toBe(false);
      });
    });

    describe('edge cases', () => {
      test('null-like string is invalid', () => {
        field.value = 'null';
        expect(field.isValid).toBe(false);
      });

      test('undefined-like string is invalid', () => {
        field.value = 'undefined';
        expect(field.isValid).toBe(false);
      });

      test('boolean-like string is invalid', () => {
        field.value = 'true';
        expect(field.isValid).toBe(false);
      });
    });
  });
});
