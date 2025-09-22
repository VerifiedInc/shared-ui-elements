import { test, describe, expect, beforeEach } from 'vitest';

import {
  Form,
  FormBuilder,
  FormField,
} from '../../../../../../../../src/components/form/NewOneClickForm/core/form';

import {
  makeCredential,
  makeCredentialRequest,
  updateFormFieldValues,
} from '../../../../utils/form';

describe('fullName', () => {
  let form: Form;

  beforeEach(() => {
    form = new FormBuilder().createFromCredentialAndRequests(
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
            makeCredentialRequest({
              type: 'FirstNameCredential',
              mandatory: 'yes',
              allowUserInput: true,
            }),
            makeCredentialRequest({
              type: 'LastNameCredential',
              mandatory: 'yes',
              allowUserInput: true,
            }),
          ],
        }),
      ],
    );
  });

  describe('isValid', () => {
    test('fullName is valid', () => {
      const field = form.fields.fullName as FormField<'fullName'>;
      updateFormFieldValues(field, {
        firstName: 'John',
        lastName: 'Doe',
      });
      expect(field.isValid).toBe(true);
    });

    test('fullName is invalid', () => {
      const field = form.fields.fullName as FormField<'fullName'>;
      updateFormFieldValues(field, {
        firstName: 'John',
        lastName: '',
      });
      expect(field.isValid).toBe(false);
    });
  });
});
