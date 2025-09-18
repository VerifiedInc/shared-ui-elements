import { test, describe, expect } from 'vitest';

import { toCreatePatchCredentials } from '../../../../../../src/components/form/NewOneClickForm/core/mappers/create-patch.map';
import { FormBuilder } from '../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../utils/form';

describe('toCreatePatchCredentials', () => {
  test('should return empty array when form has no fields', () => {
    const form = new FormBuilder().createFromCredentialAndRequests([], []);
    const result = toCreatePatchCredentials(form);
    expect(result).toEqual([]);
  });

  test('should filter out fields that are empty', () => {
    const ssn = makeCredential({
      type: 'ssn',
      value: { ssn: '' },
    });
    const fullName = makeCredential({
      type: 'fullName',
      value: { firstName: '', lastName: '' },
    });
    const form = new FormBuilder().createFromCredentialAndRequests(
      [ssn, fullName],
      [
        makeCredentialRequest({
          type: 'SsnCredential',
        }),
        makeCredentialRequest({
          type: 'FullNameCredential',
          children: [
            makeCredentialRequest({ type: 'FirstNameCredential' }),
            makeCredentialRequest({ type: 'LastNameCredential' }),
          ],
        }),
      ],
    );

    const result = toCreatePatchCredentials(form);

    expect(result).toHaveLength(0);
  });

  test('should map mix primitive and composite credentials correctly', () => {
    const ssn = makeCredential({
      type: 'ssn',
      value: { ssn: '123456789' },
    });
    const fullName = makeCredential({
      type: 'fullName',
      value: { firstName: 'John', lastName: 'Doe' },
    });
    const address = makeCredential({
      type: 'address',
      value: {
        line1: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'US',
        zipCode: '10001',
      },
    });
    const form = new FormBuilder().createFromCredentialAndRequests(
      [ssn, fullName, address],
      [
        makeCredentialRequest({
          type: 'SsnCredential',
        }),
        makeCredentialRequest({
          type: 'FullNameCredential',
          children: [
            makeCredentialRequest({ type: 'FirstNameCredential' }),
            makeCredentialRequest({ type: 'LastNameCredential' }),
          ],
        }),
        makeCredentialRequest({
          type: 'AddressCredential',
          children: [
            makeCredentialRequest({ type: 'Line1Credential' }),
            makeCredentialRequest({ type: 'Line2Credential' }),
            makeCredentialRequest({ type: 'CityCredential' }),
            makeCredentialRequest({ type: 'StateCredential' }),
            makeCredentialRequest({ type: 'CountryCredential' }),
            makeCredentialRequest({ type: 'ZipCodeCredential' }),
          ],
        }),
      ],
    );

    const result = toCreatePatchCredentials(form);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      uuid: ssn.uuid,
      value: {
        ssn: ssn.value.ssn,
      },
    });
    expect(result[1]).toEqual({
      uuid: fullName.uuid,
      value: {
        fullName: {
          firstName: fullName.value.firstName,
          lastName: fullName.value.lastName,
        },
      },
    });
    expect(result[2]).toEqual({
      uuid: address.uuid,
      value: {
        address: {
          line1: address.value.line1,
          city: address.value.city,
          state: address.value.state,
          country: address.value.country,
          zipCode: address.value.zipCode,
        },
      },
    });
  });

  test('should create value object with schema key for primitive values', () => {
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

    const result = toCreatePatchCredentials(form);

    expect(result).toHaveLength(1);
    expect(result[0].value).toEqual({ ssn: '123456789' });
  });

  test('should include uuid when field has id', () => {
    const credentialWithId = makeCredential({
      type: 'ssn',
      value: { ssn: '123456789' },
      uuid: 'test-uuid-123',
    });

    const form = new FormBuilder().createFromCredentialAndRequests(
      [credentialWithId],
      [makeCredentialRequest({ type: 'SsnCredential' })],
    );

    const result = toCreatePatchCredentials(form);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      uuid: 'test-uuid-123',
      value: { ssn: '123456789' },
    });
  });

  test('should omit uuid when is a new field', () => {
    const form = new FormBuilder().createFromCredentialAndRequests(
      [],
      [makeCredentialRequest({ type: 'SsnCredential' })],
    );

    form.fields.ssn.value = '123456789';

    const result = toCreatePatchCredentials(form);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      value: { ssn: '123456789' },
    });
    expect(result[0]).not.toHaveProperty('uuid');
  });

  test('should exclude empty objects with no keys', () => {
    const driversLicense = makeCredential({
      type: 'driversLicense',
      value: {
        documentNumber: '123456789',
        address: {
          line1: '123 Main St',
          city: 'New York',
        },
      },
    });

    const form = new FormBuilder().createFromCredentialAndRequests(
      [driversLicense],
      [
        makeCredentialRequest({
          type: 'DriversLicenseCredential',
          children: [
            makeCredentialRequest({
              type: 'DocumentNumberCredential',
            }),
            makeCredentialRequest({
              type: 'AddressCredential',
              children: [
                makeCredentialRequest({
                  type: 'Line1Credential',
                }),
                makeCredentialRequest({
                  type: 'CityCredential',
                }),
              ],
            }),
          ],
        }),
      ],
    );

    // Clear all address fields to make the address object empty
    (form.fields.driversLicense.children as any).address.children.line1.value =
      '';
    (form.fields.driversLicense.children as any).address.children.city.value =
      '';

    const result = toCreatePatchCredentials(form);

    expect(result).toHaveLength(1);
    // Should not include address property since it would be an empty object
    expect(result[0]).toEqual({
      uuid: driversLicense.uuid,
      value: {
        driversLicense: {
          documentNumber: '123456789',
          // address should be omitted - would be empty object
        },
      },
    });

    // Verify address property is not present at all
    expect(result[0].value.driversLicense).not.toHaveProperty('address');
  });
});
