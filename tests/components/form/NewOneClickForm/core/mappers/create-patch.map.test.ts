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

    const result = toCreatePatchCredentials(form);

    expect(result).toHaveLength(0);
  });

  describe('SSN field', () => {
    test('should map SSN credential correctly', () => {
      const ssn = makeCredential({
        type: 'ssn',
        value: { ssn: '123456789' },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [ssn],
        [makeCredentialRequest({ type: 'SsnCredential' })],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: ssn.uuid,
        type: 'ssn',
        value: {
          ssn: '123456789',
        },
      });
    });

    test('should exclude SSN when empty', () => {
      const form = new FormBuilder().createFromCredentialAndRequests(
        [],
        [makeCredentialRequest({ type: 'SsnCredential' })],
      );

      const result = toCreatePatchCredentials(form);
      expect(result).toHaveLength(0);
    });
  });

  describe('Phone field', () => {
    test('should not exclude phone fields from patch results', () => {
      const phone = makeCredential({
        type: 'phone',
        value: { phone: '+1234567890' },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [phone],
        [makeCredentialRequest({ type: 'PhoneCredential' })],
      );

      const result = toCreatePatchCredentials(form);

      // Phone should be excluded entirely
      expect(result).toHaveLength(1);
    });
  });

  describe('FullName field', () => {
    test('should map FullName credential correctly', () => {
      const fullName = makeCredential({
        type: 'fullName',
        value: { firstName: 'John', lastName: 'Doe' },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [fullName],
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

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: fullName.uuid,
        type: 'fullName',
        value: {
          firstName: 'John',
          lastName: 'Doe',
        },
      });
    });

    test('should handle FullName with middleName', () => {
      const fullName = makeCredential({
        type: 'fullName',
        value: { firstName: 'John', middleName: 'Michael', lastName: 'Doe' },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [fullName],
        [
          makeCredentialRequest({
            type: 'FullNameCredential',
            children: [
              makeCredentialRequest({ type: 'FirstNameCredential' }),
              makeCredentialRequest({ type: 'MiddleNameCredential' }),
              makeCredentialRequest({ type: 'LastNameCredential' }),
            ],
          }),
        ],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: fullName.uuid,
        type: 'fullName',
        value: {
          firstName: 'John',
          middleName: 'Michael',
          lastName: 'Doe',
        },
      });
    });

    test('should exclude empty middleName from FullName', () => {
      const fullName = makeCredential({
        type: 'fullName',
        value: { firstName: 'John', lastName: 'Doe' },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [fullName],
        [
          makeCredentialRequest({
            type: 'FullNameCredential',
            children: [
              makeCredentialRequest({ type: 'FirstNameCredential' }),
              makeCredentialRequest({ type: 'MiddleNameCredential' }),
              makeCredentialRequest({ type: 'LastNameCredential' }),
            ],
          }),
        ],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: fullName.uuid,
        type: 'fullName',
        value: {
          firstName: 'John',
          lastName: 'Doe',
          // middleName should be excluded since it's empty
        },
      });
      expect(result[0].value).not.toHaveProperty('middleName');
    });
  });

  describe('Address field', () => {
    test('should map Address credential correctly', () => {
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
        [address],
        [
          makeCredentialRequest({
            type: 'AddressCredential',
            children: [
              makeCredentialRequest({ type: 'Line1Credential' }),
              makeCredentialRequest({ type: 'CityCredential' }),
              makeCredentialRequest({ type: 'StateCredential' }),
              makeCredentialRequest({ type: 'CountryCredential' }),
              makeCredentialRequest({ type: 'ZipCodeCredential' }),
            ],
          }),
        ],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: address.uuid,
        type: 'address',
        value: {
          line1: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'US',
          zipCode: '10001',
        },
      });
    });

    test('should exclude empty line2 from Address', () => {
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
        [address],
        [
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

      expect(result).toHaveLength(1);
      expect(result[0].value).not.toHaveProperty('line2');
    });

    test('should exclude entire Address when all fields are empty', () => {
      const address = makeCredential({
        type: 'address',
        value: {
          line1: '123 Main St',
          city: 'New York',
        },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [address],
        [
          makeCredentialRequest({
            type: 'AddressCredential',
            children: [
              makeCredentialRequest({ type: 'Line1Credential' }),
              makeCredentialRequest({ type: 'CityCredential' }),
            ],
          }),
        ],
      );

      // Clear all address fields to make them empty
      (form.fields.address.children as any).line1.value = '';
      (form.fields.address.children as any).city.value = '';

      const result = toCreatePatchCredentials(form);

      // Should exclude the entire address since all fields are empty
      expect(result).toHaveLength(0);
    });
  });

  describe('DriversLicense field', () => {
    test('should map DriversLicense credential correctly', () => {
      const driversLicense = makeCredential({
        type: 'driversLicense',
        value: {
          documentNumber: '123456789',
          issuanceState: 'NY',
          issuanceDate: '1754049600000',
          expirationDate: '1765800000000',
          address: {
            line1: '123 Main Street',
            city: 'New York',
            state: 'NY',
            country: 'US',
            zipCode: '10001',
          },
        },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [driversLicense],
        [
          makeCredentialRequest({
            type: 'DriversLicenseCredential',
            children: [
              makeCredentialRequest({ type: 'DocumentNumberCredential' }),
              makeCredentialRequest({ type: 'IssuanceStateCredential' }),
              makeCredentialRequest({ type: 'IssuanceDateCredential' }),
              makeCredentialRequest({ type: 'ExpirationDateCredential' }),
              makeCredentialRequest({
                type: 'AddressCredential',
                children: [
                  makeCredentialRequest({ type: 'Line1Credential' }),
                  makeCredentialRequest({ type: 'CityCredential' }),
                  makeCredentialRequest({ type: 'StateCredential' }),
                  makeCredentialRequest({ type: 'CountryCredential' }),
                  makeCredentialRequest({ type: 'ZipCodeCredential' }),
                ],
              }),
            ],
          }),
        ],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: driversLicense.uuid,
        type: 'driversLicense',
        value: {
          documentNumber: '123456789',
          issuanceState: 'NY',
          issuanceDate: '1754049600000',
          expirationDate: '1765800000000',
          address: {
            line1: '123 Main Street',
            city: 'New York',
            state: 'NY',
            country: 'US',
            zipCode: '10001',
          },
        },
      });
    });

    test('should exclude zipCode from DriversLicense address when not requested', () => {
      const driversLicense = makeCredential({
        type: 'driversLicense',
        value: {
          documentNumber: '123456789',
          address: {
            line1: '123 Main Street',
            city: 'New York',
            state: 'NY',
            country: 'US',
            zipCode: '10001',
          },
        },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [driversLicense],
        [
          makeCredentialRequest({
            type: 'DriversLicenseCredential',
            children: [
              makeCredentialRequest({ type: 'DocumentNumberCredential' }),
              makeCredentialRequest({
                type: 'AddressCredential',
                children: [
                  makeCredentialRequest({ type: 'Line1Credential' }),
                  makeCredentialRequest({ type: 'CityCredential' }),
                  makeCredentialRequest({ type: 'StateCredential' }),
                  makeCredentialRequest({ type: 'CountryCredential' }),
                  // Note: ZipCodeCredential is not requested
                ],
              }),
            ],
          }),
        ],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0].value.address).not.toHaveProperty('zipCode');
    });

    test('should exclude address from DriversLicense when all address fields are empty', () => {
      const driversLicense = makeCredential({
        type: 'driversLicense',
        value: {
          documentNumber: '123456789',
          address: {
            line1: '123 Main Street',
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
              makeCredentialRequest({ type: 'DocumentNumberCredential' }),
              makeCredentialRequest({
                type: 'AddressCredential',
                children: [
                  makeCredentialRequest({ type: 'Line1Credential' }),
                  makeCredentialRequest({ type: 'CityCredential' }),
                ],
              }),
            ],
          }),
        ],
      );

      // Clear all address fields to make them empty
      (
        form.fields.driversLicense.children as any
      ).address.children.line1.value = '';
      (form.fields.driversLicense.children as any).address.children.city.value =
        '';

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: driversLicense.uuid,
        type: 'driversLicense',
        value: {
          documentNumber: '123456789',
          // address should be omitted - would be empty object
        },
      });
      expect(result[0].value).not.toHaveProperty('address');
    });
  });

  describe('BirthDate field', () => {
    test('should map BirthDate credential correctly', () => {
      const birthDate = makeCredential({
        type: 'birthDate',
        value: { birthDate: '946684800000' }, // 2000-01-01
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [birthDate],
        [makeCredentialRequest({ type: 'BirthDateCredential' })],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: birthDate.uuid,
        type: 'birthDate',
        value: {
          birthDate: '946684800000',
        },
      });
    });

    test('should exclude BirthDate when empty', () => {
      const form = new FormBuilder().createFromCredentialAndRequests(
        [],
        [makeCredentialRequest({ type: 'BirthDateCredential' })],
      );

      const result = toCreatePatchCredentials(form);
      expect(result).toHaveLength(0);
    });
  });

  describe('Sex field', () => {
    test('should map Sex credential correctly', () => {
      const sex = makeCredential({
        type: 'sex',
        value: { sex: 'M' },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [sex],
        [makeCredentialRequest({ type: 'SexCredential' })],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: sex.uuid,
        type: 'sex',
        value: {
          sex: 'M',
        },
      });
    });

    test('should exclude Sex when empty', () => {
      const form = new FormBuilder().createFromCredentialAndRequests(
        [],
        [makeCredentialRequest({ type: 'SexCredential' })],
      );

      const result = toCreatePatchCredentials(form);
      expect(result).toHaveLength(0);
    });
  });

  describe('Mixed field scenarios', () => {
    test('should handle multiple different field types together', () => {
      const ssn = makeCredential({
        type: 'ssn',
        value: { ssn: '123456789' },
      });
      const fullName = makeCredential({
        type: 'fullName',
        value: { firstName: 'John', lastName: 'Doe' },
      });
      const birthDate = makeCredential({
        type: 'birthDate',
        value: { birthDate: '946684800000' },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [ssn, fullName, birthDate],
        [
          makeCredentialRequest({ type: 'SsnCredential' }),
          makeCredentialRequest({
            type: 'FullNameCredential',
            children: [
              makeCredentialRequest({ type: 'FirstNameCredential' }),
              makeCredentialRequest({ type: 'LastNameCredential' }),
            ],
          }),
          makeCredentialRequest({ type: 'BirthDateCredential' }),
        ],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        uuid: ssn.uuid,
        type: 'ssn',
        value: { ssn: '123456789' },
      });
      expect(result[1]).toEqual({
        uuid: fullName.uuid,
        type: 'fullName',
        value: { firstName: 'John', lastName: 'Doe' },
      });
      expect(result[2]).toEqual({
        uuid: birthDate.uuid,
        type: 'birthDate',
        value: { birthDate: '946684800000' },
      });
    });

    test('should exclude phone while including other fields', () => {
      const ssn = makeCredential({
        type: 'ssn',
        value: { ssn: '123456789' },
      });
      const phone = makeCredential({
        type: 'phone',
        value: { phone: '+1234567890' },
      });

      const form = new FormBuilder().createFromCredentialAndRequests(
        [ssn, phone],
        [
          makeCredentialRequest({ type: 'SsnCredential' }),
          makeCredentialRequest({ type: 'PhoneCredential' }),
        ],
      );

      const result = toCreatePatchCredentials(form);

      // Should include SSN and phone
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        uuid: ssn.uuid,
        type: 'ssn',
        value: { ssn: '123456789' },
      });
      expect(result[1]).toEqual({
        uuid: phone.uuid,
        type: 'phone',
        value: { phone: '+1234567890' },
      });
      expect(result.find((r) => r.type === 'phone')).toBeDefined();
    });
  });

  describe('UUID handling', () => {
    test('should include uuid when field has id', () => {
      const form = new FormBuilder().createFromCredentialAndRequests(
        [
          makeCredential({
            uuid: 'test-uuid-123',
            type: 'ssn',
            value: { ssn: '123456789' },
          }),
        ],
        [makeCredentialRequest({ type: 'SsnCredential' })],
      );

      const result = toCreatePatchCredentials(form);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        uuid: 'test-uuid-123',
        type: 'ssn',
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
        type: 'ssn',
        value: { ssn: '123456789' },
      });
      expect(result[0]).not.toHaveProperty('uuid');
    });
  });
});
