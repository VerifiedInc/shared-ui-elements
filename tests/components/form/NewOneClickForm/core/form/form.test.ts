import { test, describe, expect } from 'vitest';

import { FormBuilder } from '../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../utils/form';

describe('Form', () => {
  describe('fields', () => {
    test('allow fields are instantiated', () => {
      const form = new FormBuilder().createFromCredentialAndRequests(
        [
          makeCredential({
            type: 'ssn',
            value: { ssn: '123456789' },
          }),
          makeCredential({
            type: 'sex',
            value: { sex: 'Male' },
          }),
        ],
        [
          makeCredentialRequest({
            type: 'SsnCredential',
            description: 'SSN',
            allowUserInput: true,
            mandatory: 'yes',
          }),
          makeCredentialRequest({
            type: 'SexCredential',
            description: 'Sex',
            allowUserInput: true,
            mandatory: 'yes',
          }),
        ],
      );

      expect(form.fields.ssn).toBeDefined();
      expect(form.fields.sex).toBeDefined();
      expect(form.fields.ssn.allowUserInput).toBe(true);
      expect(form.fields.sex.allowUserInput).toBe(true);
      expect(form.fields.ssn.mandatory).toBe('yes');
      expect(form.fields.sex.mandatory).toBe('yes');
      expect(form.fields.ssn.description).toBe('SSN');
      expect(form.fields.sex.description).toBe('Sex');
    });
  });

  describe('states', () => {
    describe('isValid', () => {
      test('all fields are valid', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'ssn',
              value: { ssn: '123456789' },
            }),
            makeCredential({
              type: 'sex',
              value: { sex: 'Male' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
            }),
            makeCredentialRequest({
              type: 'SexCredential',
            }),
          ],
        );
        expect(form.isValid).toBe(true);
      });
      test('all fields are invalid', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'ssn',
              value: { ssn: '123' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
            }),
          ],
        );
        expect(form.isValid).toBe(false);
      });
      test('some fields are invalid', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'ssn',
              value: { ssn: '123456789' },
            }),
            makeCredential({
              type: 'birthDate',
              value: { birthDate: String(Date.now()) },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
            }),
            makeCredentialRequest({
              type: 'BirthDateCredential',
            }),
          ],
        );
        expect(form.isValid).toBe(false);
      });
    });

    describe('isEmpty', () => {
      test('no credentials are provided', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [],
          [
            makeCredentialRequest({
              type: 'FullNameCredential',
              children: [
                makeCredentialRequest({ type: 'FirstNameCredential' }),
                makeCredentialRequest({ type: 'LastNameCredential' }),
              ],
            }),
          ],
        );

        expect(form.isEmpty).toBe(true);
      });

      test('phone credential provided should be empty', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'phone',
              value: { phone: '+12125550010' },
            }),
          ],
          [makeCredentialRequest({ type: 'PhoneCredential' })],
        );

        expect(form.isEmpty).toBe(true);
      });

      test('credentials are provided', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'fullName',
              value: { firstName: 'John', lastName: 'Doe' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'FullNameCredential',
              children: [
                makeCredentialRequest({ type: 'FirstNameCredential' }),
                makeCredentialRequest({ type: 'LastNameCredential' }),
              ],
            }),
          ],
        );
        expect(form.isEmpty).toBe(false);
      });

      test('credentials are provided but empty', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'fullName',
              value: { firstName: 'John', lastName: 'Doe' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'FullNameCredential',
              children: [
                makeCredentialRequest({ type: 'FirstNameCredential' }),
                makeCredentialRequest({ type: 'LastNameCredential' }),
              ],
            }),
          ],
        );

        (form.fields.fullName.children as any).firstName.value = '';
        (form.fields.fullName.children as any).lastName.value = '';

        expect(form.isEmpty).toBe(true);
      });
    });

    describe('isDirty', () => {
      test('no fields are dirty', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'ssn',
              value: { ssn: '123456789' },
            }),
            makeCredential({
              type: 'sex',
              value: { sex: 'Male' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
            }),
            makeCredentialRequest({
              type: 'SexCredential',
            }),
          ],
        );
        expect(form.isDirty).toBe(false);
      });

      test('some fields are dirty', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'ssn',
              value: { ssn: '123456789' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
            }),
          ],
        );

        form.fields.ssn.value = '123456788';

        expect(form.isDirty).toBe(true);
      });
    });

    describe('isDisabled', () => {
      test('all fields are empty', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              type: 'ssn',
              value: { ssn: '' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
              allowUserInput: false,
            }),
          ],
        );
        expect(form.isDisabled).toBe(true);
      });
    });
  });
});
