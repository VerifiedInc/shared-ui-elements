import { test, describe, expect, beforeEach } from 'vitest';

import {
  Form,
  FormBuilder,
  FormField,
} from '../../../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../../../utils/form';

describe('address', () => {
  let form: Form;

  beforeEach(() => {
    form = new FormBuilder().createFromCredentialAndRequests(
      [
        makeCredential({
          type: 'address',
          value: {
            line1: '123 Main Street',
            line2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            country: 'US',
            zipCode: '10001',
          },
        }),
      ],
      [
        makeCredentialRequest({
          type: 'AddressCredential',
          children: [
            makeCredentialRequest({
              type: 'Line1Credential',
              mandatory: 'yes',
              allowUserInput: true,
            }),
            makeCredentialRequest({
              type: 'Line2Credential',
              mandatory: 'no',
              allowUserInput: true,
            }),
            makeCredentialRequest({
              type: 'CityCredential',
              mandatory: 'yes',
              allowUserInput: true,
            }),
            makeCredentialRequest({
              type: 'StateCredential',
              mandatory: 'yes',
              allowUserInput: true,
            }),
            makeCredentialRequest({
              type: 'CountryCredential',
              mandatory: 'yes',
              allowUserInput: true,
            }),
            makeCredentialRequest({
              type: 'ZipCodeCredential',
              mandatory: 'yes',
              allowUserInput: true,
            }),
          ],
        }),
      ],
    );
  });

  describe('isValid', () => {
    describe('complete valid address', () => {
      test('full address with all components is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '123 Main Street';
        field.value.line2 = 'Apt 4B';
        field.value.city = 'New York';
        field.value.state = 'NY';
        field.value.country = 'US';
        field.value.zipCode = '10001';
        expect(field.isValid).toBe(true);
      });

      test('address without optional line2 is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '456 Oak Avenue';
        field.value.line2 = '';
        field.value.city = 'Los Angeles';
        field.value.state = 'CA';
        field.value.country = 'US';
        field.value.zipCode = '90210';
        expect(field.isValid).toBe(true);
      });

      test('address with 9-digit zip code is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '789 Pine Street';
        field.value.line2 = '';
        field.value.city = 'Chicago';
        field.value.state = 'IL';
        field.value.country = 'US';
        field.value.zipCode = '60601-1234';
        expect(field.isValid).toBe(true);
      });
    });

    describe('required field validation', () => {
      test('address without line1 is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '';
        field.value.line2 = 'Suite 100';
        field.value.city = 'Boston';
        field.value.state = 'MA';
        field.value.country = 'US';
        field.value.zipCode = '02101';
        expect(field.isValid).toBe(false);
      });

      test('address without city is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '321 Elm Street';
        field.value.line2 = '';
        field.value.city = '';
        field.value.state = 'TX';
        field.value.country = 'US';
        field.value.zipCode = '75201';
        expect(field.isValid).toBe(false);
      });
    });

    describe('state validation', () => {
      test('valid US state code is accepted', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '555 Broadway';
        field.value.line2 = '';
        field.value.city = 'Miami';
        field.value.state = 'FL';
        field.value.country = 'US';
        field.value.zipCode = '33101';
        expect(field.isValid).toBe(true);
      });

      test('invalid state code is rejected', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '777 Market Street';
        field.value.line2 = '';
        field.value.city = 'San Francisco';
        field.value.state = 'XX'; // Invalid state
        field.value.country = 'US';
        field.value.zipCode = '94102';
        expect(field.isValid).toBe(false);
      });

      test('full state name is rejected (must be code)', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '888 First Avenue';
        field.value.line2 = '';
        field.value.city = 'Seattle';
        field.value.state = 'Washington'; // Full name instead of code
        field.value.country = 'US';
        field.value.zipCode = '98101';
        expect(field.isValid).toBe(false);
      });

      test('lowercase state code is rejected', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '999 Capitol Street';
        field.value.line2 = '';
        field.value.city = 'Denver';
        field.value.state = 'co'; // Lowercase
        field.value.country = 'US';
        field.value.zipCode = '80202';
        expect(field.isValid).toBe(false);
      });
    });

    describe('country validation', () => {
      test('US country is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '111 Constitution Avenue';
        field.value.line2 = '';
        field.value.city = 'Washington';
        field.value.state = 'DC';
        field.value.country = 'US';
        field.value.zipCode = '20001';
        expect(field.isValid).toBe(true);
      });

      test('non-US country is rejected', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '222 International Street';
        field.value.line2 = '';
        field.value.city = 'Toronto';
        field.value.state = 'ON';
        field.value.country = 'CA'; // Canada
        field.value.zipCode = 'M5V 3A8';
        expect(field.isValid).toBe(false);
      });

      test('empty country is rejected', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '333 Empty Country Street';
        field.value.line2 = '';
        field.value.city = 'Phoenix';
        field.value.state = 'AZ';
        field.value.country = '';
        field.value.zipCode = '85001';
        expect(field.isValid).toBe(false);
      });
    });

    describe('zip code validation', () => {
      test('5-digit zip code is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '444 Fifth Street';
        field.value.line2 = '';
        field.value.city = 'Portland';
        field.value.state = 'OR';
        field.value.country = 'US';
        field.value.zipCode = '97201';
        expect(field.isValid).toBe(true);
      });

      test('9-digit zip code with hyphen is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '555 Sixth Avenue';
        field.value.line2 = '';
        field.value.city = 'Nashville';
        field.value.state = 'TN';
        field.value.country = 'US';
        field.value.zipCode = '37201-1234';
        expect(field.isValid).toBe(true);
      });

      test('zip code with letters is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '666 Seventh Street';
        field.value.line2 = '';
        field.value.city = 'Las Vegas';
        field.value.state = 'NV';
        field.value.country = 'US';
        field.value.zipCode = '8910A'; // Contains letter
        expect(field.isValid).toBe(false);
      });

      test('too short zip code is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '777 Eighth Avenue';
        field.value.line2 = '';
        field.value.city = 'Salt Lake City';
        field.value.state = 'UT';
        field.value.country = 'US';
        field.value.zipCode = '8411'; // Only 4 digits
        expect(field.isValid).toBe(false);
      });

      test('too long zip code is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '888 Ninth Street';
        field.value.line2 = '';
        field.value.city = 'Minneapolis';
        field.value.state = 'MN';
        field.value.country = 'US';
        field.value.zipCode = '554011234'; // 9 digits without hyphen
        expect(field.isValid).toBe(false);
      });

      test('empty zip code is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '999 Tenth Avenue';
        field.value.line2 = '';
        field.value.city = 'Detroit';
        field.value.state = 'MI';
        field.value.country = 'US';
        field.value.zipCode = '';
        expect(field.isValid).toBe(false);
      });
    });

    describe('edge cases', () => {
      test('address with special characters in line1 is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = "123 O'Malley Street #5";
        field.value.line2 = '';
        field.value.city = 'San Antonio';
        field.value.state = 'TX';
        field.value.country = 'US';
        field.value.zipCode = '78201';
        expect(field.isValid).toBe(true);
      });

      test('address with long line2 is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '456 Corporate Boulevard';
        field.value.line2 = 'Building A, Floor 12, Suite 1200, Room 1205';
        field.value.city = 'Atlanta';
        field.value.state = 'GA';
        field.value.country = 'US';
        field.value.zipCode = '30309';
        expect(field.isValid).toBe(true);
      });

      test('address with territory state code is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        field.value.line1 = '789 Caribbean Avenue';
        field.value.line2 = '';
        field.value.city = 'San Juan';
        field.value.state = 'PR'; // Puerto Rico
        field.value.country = 'US';
        field.value.zipCode = '00901';
        expect(field.isValid).toBe(true);
      });
    });
  });
});
