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

const setupCredential = () => {
  return makeCredential({
    uuid: 'drivers-license-id-1234',
    type: 'driversLicense',
    value: {
      documentNumber: '123456789',
      issuanceState: 'NY',
      issuanceDate: '1754049600000',
      expirationDate: '1765800000000',
      address: {
        line1: '123 Main Street',
        line2: 'Apt 1A',
        city: 'California',
        state: 'CA',
        country: 'US',
        zipCode: '10001',
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
    type: 'DriversLicenseCredential',
    mandatory,
    children: [
      makeCredentialRequest({
        type: 'DocumentNumberCredential',
      }),
      makeCredentialRequest({
        type: 'IssuanceStateCredential',
      }),
      makeCredentialRequest({
        type: 'IssuanceDateCredential',
      }),
      makeCredentialRequest({
        type: 'ExpirationDateCredential',
      }),
      makeCredentialRequest({
        type: 'AddressCredential',
        children: [
          makeCredentialRequest({
            type: 'Line1Credential',
          }),
          makeCredentialRequest({
            type: 'Line2Credential',
          }),
          makeCredentialRequest({
            type: 'CityCredential',
          }),
          makeCredentialRequest({
            type: 'StateCredential',
          }),
          makeCredentialRequest({
            type: 'CountryCredential',
          }),
          makeCredentialRequest({
            type: 'ZipCodeCredential',
          }),
        ],
      }),
    ],
  });
};

describe('driversLicense', () => {
  let form: Form;

  beforeEach(() => {
    form = new FormBuilder().createFromCredentialAndRequests(
      [setupCredential()],
      [setupCredentialRequest()],
    );
  });

  describe('value state', () => {
    test('value state changes', () => {
      const field = form.fields.driversLicense as FormField<'driversLicense'>;

      const newValues = {
        issuanceState: 'CA',
        address: {
          line1: '123 Main Street',
          line2: 'Apt 1A',
          city: 'New York',
          state: 'NY',
          country: 'US',
          zipCode: '10001',
        },
      };

      updateFormFieldValues(field, newValues);

      expect(form.isValid).toBe(true);
      expect(field.isValid).toBe(true);

      expect(form.fields.driversLicense.value).toMatchObject(newValues);
      expect(field.value).toMatchObject(newValues);
    });

    test('address zip code is not included', () => {
      form = new FormBuilder().createFromCredentialAndRequests(
        [setupCredential()],
        [
          makeCredentialRequest({
            type: 'DriversLicenseCredential',
            children: [
              makeCredentialRequest({
                type: 'DocumentNumberCredential',
              }),
              makeCredentialRequest({
                type: 'IssuanceStateCredential',
              }),
              makeCredentialRequest({
                type: 'IssuanceDateCredential',
              }),
              makeCredentialRequest({
                type: 'ExpirationDateCredential',
              }),
              makeCredentialRequest({
                type: 'AddressCredential',
                children: [
                  makeCredentialRequest({
                    type: 'Line1Credential',
                  }),
                  makeCredentialRequest({
                    type: 'Line2Credential',
                  }),
                  makeCredentialRequest({
                    type: 'CityCredential',
                  }),
                  makeCredentialRequest({
                    type: 'StateCredential',
                  }),
                  makeCredentialRequest({
                    type: 'CountryCredential',
                  }),
                ],
              }),
            ],
          }),
        ],
      );

      // Passes
      expect(
        (form.fields.driversLicense.children as any).address.value,
      ).not.toMatchObject({
        zipCode: '10001',
      });

      // Fails but should pass
      expect(form.fields.driversLicense.value).not.toMatchObject({
        address: {
          zipCode: '10001',
        },
      });

      // Test that defaultValue also doesn't include zipCode
      expect(form.fields.driversLicense.defaultValue).not.toMatchObject({
        address: {
          zipCode: '10001',
        },
      });
    });

    test('nested composite fields maintain structure with empty values', () => {
      form = new FormBuilder().createFromCredentialAndRequests(
        [setupCredential()],
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

      // Clear the address fields to make them empty
      (
        form.fields.driversLicense.children as any
      ).address.children.line1.value = '';
      (form.fields.driversLicense.children as any).address.children.city.value =
        '';

      // Nested composite field (address) should maintain its structure even when empty
      expect(form.fields.driversLicense.value).toMatchObject({
        documentNumber: '123456789',
        address: {
          line1: '',
          city: '',
        },
      });

      // Should include the properties in the nested object structure
      expect((form.fields.driversLicense.value as any).address).toHaveProperty(
        'line1',
        '',
      );
      expect((form.fields.driversLicense.value as any).address).toHaveProperty(
        'city',
        '',
      );
      expect(typeof (form.fields.driversLicense.value as any).address).toBe(
        'object',
      );
    });
  });

  describe('isValid', () => {
    describe('valid cases', () => {
      test('full credential is valid', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          documentNumber: '123456789',
          issuanceState: 'NY',
          issuanceDate: '1754049600000',
          expirationDate: '1765800000000',
          address: {
            line1: '123 Main Street',
            line2: 'Apt 1A',
            city: 'California',
            state: 'CA',
            country: 'US',
            zipCode: '10001',
          },
        });

        expect(field.isValid).toBe(true);
      });

      test('issuance date is 12 hour UTC', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          issuanceDate: '1754049600000',
        });

        expect(field.isValid).toBe(true);
      });

      test('expiration date is 12 hour UTC', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          issuanceDate: '1754049600000',
        });

        expect(field.isValid).toBe(true);
      });

      test('issuance date is 12 hour UTC future date', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          issuanceDate: '2554718400000',
        });

        expect(field.isValid).toBe(true);
      });

      test('expiration date is 12 hour UTC future date', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          issuanceDate: '2554718400000',
        });

        expect(field.isValid).toBe(true);
      });

      test('issuance state is valid', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          issuanceState: 'NY',
        });

        expect(form.isValid).toBe(true);
        expect(field.isValid).toBe(true);
      });

      describe('address', () => {
        test('address zipcode five digits is valid', () => {
          const field = form.fields
            .driversLicense as FormField<'driversLicense'>;

          updateFormFieldValues(field, {
            address: {
              zipCode: '10001',
            },
          });

          expect(field.isValid).toBe(true);
        });
        test('address zipcode nine digits is valid', () => {
          const field = form.fields
            .driversLicense as FormField<'driversLicense'>;

          updateFormFieldValues(field, {
            address: {
              zipCode: '10001-1234',
            },
          });

          expect(field.isValid).toBe(true);
        });

        test('address country is valid', () => {
          const field = form.fields
            .driversLicense as FormField<'driversLicense'>;

          updateFormFieldValues(field, {
            address: {
              country: 'US',
            },
          });

          expect(field.isValid).toBe(true);
        });
      });
    });

    describe('invalid cases', () => {
      test('issuance date is not 12 hour UTC', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          issuanceDate: '17540496000001',
        });

        expect(field.isValid).toBe(false);
      });
      test('expiration date is not 12 hour UTC', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          issuanceDate: '17540496000001',
        });

        expect(field.isValid).toBe(false);
      });
      test('issuance state is valid', () => {
        const field = form.fields.driversLicense as FormField<'driversLicense'>;

        updateFormFieldValues(field, {
          issuanceState: 'XX',
        });

        expect(form.isValid).toBe(false);
        expect(field.isValid).toBe(false);
      });
      describe('address', () => {
        test('address zipcode is invalid', () => {
          const field = form.fields
            .driversLicense as FormField<'driversLicense'>;

          updateFormFieldValues(field, {
            address: {
              zipCode: '100011',
            },
          });

          expect(field.isValid).toBe(false);
        });
        test('address state is invalid', () => {
          const field = form.fields
            .driversLicense as FormField<'driversLicense'>;

          updateFormFieldValues(field, {
            address: {
              zipCode: 'XX',
            },
          });

          expect(field.isValid).toBe(false);
        });
        test('address country is invalid', () => {
          const field = form.fields
            .driversLicense as FormField<'driversLicense'>;

          updateFormFieldValues(field, {
            address: {
              country: 'BR',
            },
          });

          expect(field.isValid).toBe(false);
        });

        test('missing address parts are invalid', () => {
          const field = form.fields
            .driversLicense as FormField<'driversLicense'>;

          updateFormFieldValues(field, {
            address: {
              line1: '',
              line2: 'Apt 4B',
              city: '',
              state: '', // Puerto Rico
              country: '',
              zipCode: '',
            },
          });

          expect(form.isValid).toBe(false);
          expect(field.isValid).toBe(false);
        });
      });
    });
  });
});
