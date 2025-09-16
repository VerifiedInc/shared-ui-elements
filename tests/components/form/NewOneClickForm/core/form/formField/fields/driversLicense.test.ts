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

describe('driversLicense', () => {
  let form: Form;

  beforeEach(() => {
    form = new FormBuilder().createFromCredentialAndRequests(
      [
        makeCredential({
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
        }),
      ],
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
                makeCredentialRequest({
                  type: 'ZipCodeCredential',
                }),
              ],
            }),
          ],
        }),
      ],
    );
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
      });
    });
  });
});
