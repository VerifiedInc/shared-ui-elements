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
    type: 'address',
    value: {
      line1: '123 Main Street',
      line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      country: 'US',
      zipCode: '10001',
    },
  });
};

const setupCredentialRequest = (
  { mandatory }: { mandatory: 'yes' | 'no' | 'if_available' } = {
    mandatory: 'no',
  },
) => {
  return makeCredentialRequest({
    type: 'AddressCredential',
    mandatory,
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
  });
};

describe('address', () => {
  let form: Form;

  beforeEach(() => {
    form = new FormBuilder().createFromCredentialAndRequests(
      [setupCredential()],
      [setupCredentialRequest()],
    );
  });

  describe('isValid', () => {
    describe('complete valid address', () => {
      test('full address with all components is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '123 Main Street',
          line2: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          country: 'US',
          zipCode: '10001',
        });
        expect(field.isValid).toBe(true);
      });

      test('address without optional line2 is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '456 Oak Avenue',
          line2: '',
          city: 'Los Angeles',
          state: 'CA',
          country: 'US',
          zipCode: '90210',
        });
        expect(field.isValid).toBe(true);
      });

      test('address with 9-digit zip code is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '789 Pine Street',
          line2: '',
          city: 'Chicago',
          state: 'IL',
          country: 'US',
          zipCode: '60601-1234',
        });
        expect(field.isValid).toBe(true);
      });
    });

    describe('required field validation', () => {
      test('address without line1 is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '',
          line2: 'Suite 100',
          city: 'Boston',
          state: 'MA',
          country: 'US',
          zipCode: '02101',
        });
        expect(field.isValid).toBe(false);
      });

      test('address without city is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '321 Elm Street',
          line2: '',
          city: '',
          state: 'TX',
          country: 'US',
          zipCode: '75201',
        });
        expect(field.isValid).toBe(false);
      });
    });

    describe('state validation', () => {
      test('valid US state code is accepted', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '555 Broadway',
          line2: '',
          city: 'Miami',
          state: 'FL',
          country: 'US',
          zipCode: '33101',
        });
        expect(field.isValid).toBe(true);
      });

      test('invalid state code is rejected', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '777 Market Street',
          line2: '',
          city: 'San Francisco',
          state: 'XX', // Invalid state
          country: 'US',
          zipCode: '94102',
        });
        expect(field.isValid).toBe(false);
      });

      test('full state name is rejected (must be code)', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '888 First Avenue',
          line2: '',
          city: 'Seattle',
          state: 'Washington', // Full name instead of code
          country: 'US',
          zipCode: '98101',
        });
        expect(field.isValid).toBe(false);
      });

      test('lowercase state code is rejected', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '999 Capitol Street',
          line2: '',
          city: 'Denver',
          state: 'co', // Lowercase
          country: 'US',
          zipCode: '80202',
        });
        expect(field.isValid).toBe(false);
      });
    });

    describe('country validation', () => {
      test('US country is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '111 Constitution Avenue',
          line2: '',
          city: 'Washington',
          state: 'DC',
          country: 'US',
          zipCode: '20001',
        });
        expect(field.isValid).toBe(true);
      });

      test('non-US country is rejected', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '222 International Street',
          line2: '',
          city: 'Toronto',
          state: 'ON',
          country: 'CA', // Canada
          zipCode: 'M5V 3A8',
        });
        expect(field.isValid).toBe(false);
      });

      test('empty country is rejected', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '333 Empty Country Street',
          line2: '',
          city: 'Phoenix',
          state: 'AZ',
          country: '',
          zipCode: '85001',
        });
        expect(field.isValid).toBe(false);
      });
    });

    describe('zip code validation', () => {
      test('5-digit zip code is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '444 Fifth Street',
          line2: '',
          city: 'Portland',
          state: 'OR',
          country: 'US',
          zipCode: '97201',
        });
        expect(field.isValid).toBe(true);
      });

      test('9-digit zip code with hyphen is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '555 Sixth Avenue',
          line2: '',
          city: 'Nashville',
          state: 'TN',
          country: 'US',
          zipCode: '37201-1234',
        });
        expect(field.isValid).toBe(true);
      });

      test('zip code with letters is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '666 Seventh Street',
          line2: '',
          city: 'Las Vegas',
          state: 'NV',
          country: 'US',
          zipCode: '8910A', // Contains letter
        });
        expect(field.isValid).toBe(false);
      });

      test('too short zip code is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '777 Eighth Avenue',
          line2: '',
          city: 'Salt Lake City',
          state: 'UT',
          country: 'US',
          zipCode: '8411', // Only 4 digits
        });
        expect(field.isValid).toBe(false);
      });

      test('too long zip code is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '888 Ninth Street',
          line2: '',
          city: 'Minneapolis',
          state: 'MN',
          country: 'US',
          zipCode: '554011234', // 9 digits without hyphen
        });
        expect(field.isValid).toBe(false);
      });

      test('empty zip code is invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '999 Tenth Avenue',
          line2: '',
          city: 'Detroit',
          state: 'MI',
          country: 'US',
          zipCode: '',
        });
        expect(field.isValid).toBe(false);
      });
    });

    describe('edge cases', () => {
      test('address with special characters in line1 is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: "123 O'Malley Street #5",
          line2: '',
          city: 'San Antonio',
          state: 'TX',
          country: 'US',
          zipCode: '78201',
        });
        expect(field.isValid).toBe(true);
      });

      test('address with long line2 is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '456 Corporate Boulevard',
          line2: 'Building A, Floor 12, Suite 1200, Room 1205',
          city: 'Atlanta',
          state: 'GA',
          country: 'US',
          zipCode: '30309',
        });
        expect(field.isValid).toBe(true);
      });

      test('address with territory state code is valid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '789 Caribbean Avenue',
          line2: '',
          city: 'San Juan',
          state: 'PR', // Puerto Rico
          country: 'US',
          zipCode: '00901',
        });
        expect(field.isValid).toBe(true);
      });

      test('missing address parts are invalid', () => {
        const field = form.fields.address as FormField<'address'>;
        updateFormFieldValues(field, {
          line1: '',
          line2: 'Apt 4B',
          city: '',
          state: '', // Puerto Rico
          country: '',
          zipCode: '',
        });

        expect(form.isValid).toBe(false);
        expect(field.isValid).toBe(false);
      });

      test('optional address parts errors are in the correct order', () => {
        form = new FormBuilder().createFromCredentialAndRequests(
          [setupCredential()],
          [setupCredentialRequest({ mandatory: 'no' })],
        );
        const field = form.fields.address as FormField<'address'>;

        updateFormFieldValues(field, {
          line1: '',
          line2: 'Apt 1A',
          city: '',
          state: '',
          country: 'US',
          zipCode: '',
        });

        expect(form.isValid).toBe(false);
        expect(field.isValid).toBe(false);

        const errors = field.errors;
        expect(errors).not.toBeNull();
        expect(errors?.error?.issues).toBeDefined();

        const issues = errors?.error?.issues || [];
        const errorMessages = issues.map((issue: any) => ({
          path: issue.path[0],
          message: issue.message,
        }));

        const errorPaths = errorMessages.map((e: any) => e.path);
        const expectedOrder = ['line1', 'city', 'state', 'zipCode'];

        // Verify the error order: line1, city, state, country, zipCode
        expectedOrder.forEach((expectedPath, index) => {
          const actualIndex = errorPaths.indexOf(expectedPath);
          expect(actualIndex).toBeGreaterThanOrEqual(0); // Error should exist

          // Check that this error comes before any subsequent expected errors
          for (let j = index + 1; j < expectedOrder.length; j++) {
            const subsequentIndex = errorPaths.indexOf(expectedOrder[j]);
            if (subsequentIndex >= 0) {
              expect(actualIndex).toBeLessThan(subsequentIndex);
            }
          }
        });
      });

      test('required address parts errors are in the correct order', () => {
        form = new FormBuilder().createFromCredentialAndRequests(
          [setupCredential()],
          [setupCredentialRequest({ mandatory: 'yes' })],
        );
        const field = form.fields.address as FormField<'address'>;

        updateFormFieldValues(field, {
          line1: '',
          line2: 'Apt 4B',
          city: '',
          state: '',
          country: '',
          zipCode: '',
        });

        expect(form.isValid).toBe(false);
        expect(field.isValid).toBe(false);

        const errors = field.errors;
        expect(errors).not.toBeNull();
        expect(errors?.error?.issues).toBeDefined();

        const issues = errors?.error?.issues || [];
        const errorMessages = issues.map((issue: any) => ({
          path: issue.path[0],
          message: issue.message,
        }));

        const errorPaths = errorMessages.map((e: any) => e.path);
        const expectedOrder = ['line1', 'city', 'state', 'country', 'zipCode'];

        // Verify the error order: line1, city, state, country, zipCode
        expectedOrder.forEach((expectedPath, index) => {
          const actualIndex = errorPaths.indexOf(expectedPath);
          expect(actualIndex).toBeGreaterThanOrEqual(0); // Error should exist

          // Check that this error comes before any subsequent expected errors
          for (let j = index + 1; j < expectedOrder.length; j++) {
            const subsequentIndex = errorPaths.indexOf(expectedOrder[j]);
            if (subsequentIndex >= 0) {
              expect(actualIndex).toBeLessThan(subsequentIndex);
            }
          }
        });
      });
    });
  });
});
