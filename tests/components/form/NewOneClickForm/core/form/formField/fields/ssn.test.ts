import { test, describe, expect, beforeEach } from 'vitest';

import {
  FormField,
  FormFieldBuilder,
} from '../../../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../../../utils/form';

describe('ssn', () => {
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

  describe('isValid', () => {
    test('ssn is valid', () => {
      field.value = '123456789';
      expect(field.isValid).toBe(true);
    });

    test('ssn is invalid', () => {
      field.value = '123';
      expect(field.isValid).toBe(false);
    });
  });
});
