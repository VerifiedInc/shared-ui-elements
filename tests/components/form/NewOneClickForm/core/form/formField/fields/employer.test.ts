import { test, describe, expect, beforeEach } from 'vitest';

import {
  Form,
  FormBuilder,
  FormField,
} from '../../../../../../../../src/components/form/NewOneClickForm/core/form';
import { toCreatePatchCredentials } from '../../../../../../../../src/components/form/NewOneClickForm/core/mappers/create-patch.map';

import { makeCredential, makeCredentialRequest } from '../../../../utils/form';

const address = {
  line1: '702 SW 8th St',
  city: 'Bentonville',
  state: 'AR',
  zipCode: '72716',
  country: 'US',
} as const;

const setupCredential = () => {
  return makeCredential({
    uuid: 'employer-id-1234',
    type: 'employer',
    value: {
      employer: {
        name: 'Walmart',
        legalName: 'WALMART INC.',
        address,
      },
    },
  });
};

const setupCredentialRequest = (
  { mandatory }: { mandatory: 'yes' | 'no' | 'if_available' } = {
    mandatory: 'no',
  },
) => {
  return makeCredentialRequest({
    type: 'EmployerCredential',
    mandatory,
  });
};

describe('employer', () => {
  let form: Form;
  let field: FormField<'employer'>;

  beforeEach(() => {
    form = new FormBuilder().createFromCredentialAndRequests(
      [setupCredential()],
      [setupCredentialRequest()],
    );
    field = form.fields.employer as FormField<'employer'>;
  });

  test('keeps the credentials package shape as the field value', () => {
    expect(field.id).toBe('employer-id-1234');
    expect(field.children).toBeUndefined();
    expect(field.value).toEqual({
      employer: {
        name: 'Walmart',
        legalName: 'WALMART INC.',
        address,
      },
    });
  });

  test('builds an empty value when there is no credential', () => {
    const emptyForm = new FormBuilder().createFromCredentialAndRequests(
      [],
      [setupCredentialRequest()],
    );
    const emptyField = emptyForm.fields.employer as FormField<'employer'>;

    expect(emptyField.id).toBeUndefined();
    expect(emptyField.isEmpty).toBe(true);
    expect(emptyField.value.employer.name).toBe('');
  });

  describe('isValid', () => {
    test('field is valid', () => {
      expect(field.isValid).toBe(true);
    });

    test('legal name is optional', () => {
      field.value = { employer: { name: 'Walmart', address } };

      expect(field.isValid).toBe(true);
    });

    test('address with a second line is valid', () => {
      field.value = {
        employer: {
          name: 'Walmart',
          legalName: 'WALMART INC.',
          address: { ...address, line2: 'Suite 100' },
        },
      };

      expect(field.isValid).toBe(true);
    });

    test('field without name is invalid', () => {
      field.value.employer.name = '';

      expect(field.isValid).toBe(false);
    });

    test.each([
      ['line1', { ...address, line1: undefined }],
      ['city', { ...address, city: undefined }],
      ['state', { ...address, state: undefined }],
      ['zipCode', { ...address, zipCode: undefined }],
      ['country', { ...address, country: undefined }],
    ])('field without address %s is invalid', (_part, partialAddress) => {
      field.value = {
        employer: {
          name: 'Walmart',
          legalName: 'WALMART INC.',
          address: partialAddress,
        },
      };

      expect(field.isValid).toBe(false);
    });

    test('empty optional field is valid', () => {
      const emptyForm = new FormBuilder().createFromCredentialAndRequests(
        [],
        [setupCredentialRequest({ mandatory: 'no' })],
      );

      expect(emptyForm.fields.employer.isValid).toBe(true);
    });

    test('empty required field is invalid', () => {
      const emptyForm = new FormBuilder().createFromCredentialAndRequests(
        [],
        [setupCredentialRequest({ mandatory: 'if_available' })],
      );

      expect(emptyForm.fields.employer.isValid).toBe(false);
    });
  });

  test('patches the credentials package shape', () => {
    field.value = {
      employer: { ...field.value.employer, name: 'Walmart Stores' },
    };

    const result = toCreatePatchCredentials(form);

    expect(result.toCreate).toHaveLength(0);
    expect(result.unchanged).toHaveLength(0);
    expect(result.toPatch).toEqual([
      {
        uuid: 'employer-id-1234',
        type: 'employer',
        value: {
          employer: {
            name: 'Walmart Stores',
            legalName: 'WALMART INC.',
            address,
          },
        },
      },
    ]);
  });
});
