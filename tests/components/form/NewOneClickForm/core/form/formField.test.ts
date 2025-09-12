import { test, describe, expect, beforeEach } from 'vitest';

import {
  FormField,
  FormFieldBuilder,
} from '../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../utils/form';

describe('FormField', () => {
  describe('states', () => {
    let field: FormField<'ssn'>;

    beforeEach(() => {
      field = new FormFieldBuilder().createFromCredential<'ssn'>(
        makeCredential({ type: 'ssn', value: { ssn: '' } }),
        undefined,
        makeCredentialRequest({
          type: 'SsnCredential',
          allowUserInput: true,
          mandatory: 'yes',
          description: 'SSN',
        }),
      );
    });

    describe('hasVariants', () => {
      test('field has variants', () => {
        const field = new FormFieldBuilder().createFromCredential<'ssn'>(
          makeCredential({ type: 'ssn', value: { ssn: '123456789' } }),
          undefined,
          makeCredentialRequest({
            type: 'SsnCredential',
            allowUserInput: true,
            mandatory: 'yes',
            description: 'SSN',
          }),
          [
            new FormFieldBuilder().createFromCredential<'ssn'>(
              makeCredential({ type: 'ssn', value: { ssn: '123456788' } }),
              undefined,
              makeCredentialRequest({
                type: 'SsnCredential',
                allowUserInput: true,
                mandatory: 'yes',
                description: 'SSN',
              }),
            ),
            new FormFieldBuilder().createFromCredential<'ssn'>(
              makeCredential({ type: 'ssn', value: { ssn: '123456787' } }),
              undefined,
              makeCredentialRequest({
                type: 'SsnCredential',
                allowUserInput: true,
                mandatory: 'yes',
                description: 'SSN',
              }),
            ),
          ],
        );
        console.log(field);
        expect(field.hasVariants).toBe(true);
      });

      test('field has no variants', () => {
        expect(field.hasVariants).toBe(false);
      });
    });

    describe('isValid', () => {
      test('field is valid', () => {
        field.value = '123456789';
        expect(field.isValid).toBe(true);
      });

      test('field is invalid', () => {
        field.value = '123';
        expect(field.isValid).toBe(false);
      });
    });

    describe('isRequired', () => {
      test('field is required with yes', () => {
        field.mandatory = 'yes';
        expect(field.isRequired).toBe(true);
      });

      test('field is required with if_available', () => {
        field.mandatory = 'if_available';
        expect(field.isRequired).toBe(true);
      });

      test('field is not required', () => {
        field.mandatory = 'no';
        expect(field.isRequired).toBe(false);
      });
    });

    describe('isDisabled', () => {
      test('field is disabled', () => {
        field.allowUserInput = false;
        expect(field.isDisabled).toBe(true);
      });

      test('field is not disabled', () => {
        field.allowUserInput = true;
        expect(field.isDisabled).toBe(false);
      });
    });

    describe('isEmpty', () => {
      test('field is empty', () => {
        expect(field.isEmpty).toBe(true);
      });

      test('field is not empty', () => {
        field.value = '123';
        expect(field.isEmpty).toBe(false);
      });
    });

    describe('isDirty', () => {
      test('field is dirty', () => {
        field.value = '123456788';
        expect(field.isDirty).toBe(true);
      });

      test('field is not dirty', () => {
        expect(field.isDirty).toBe(false);
      });
    });
  });
});
