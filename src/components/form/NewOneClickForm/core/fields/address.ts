import { z } from 'zod';
import type { TextFieldDefinition, CompositeFieldDefinition } from './types';

const line1Schema = z.string().min(1, 'Address line 1 is required');
const line2Schema = z.string().optional();
const citySchema = z.string().min(1, 'City is required');
const stateSchema = z.string().min(1, 'State is required');
const countrySchema = z.string().min(1, 'Country is required');
const zipCodeSchema = z.string().min(1, 'Zip code is required');

export const line1: TextFieldDefinition<'line1', 'Line1Credential'> = {
  type: 'Line1Credential',
  key: 'line1',
  characteristics: {
    inputType: 'text',
    label: 'Address Line 1',
    placeholder: '123 Main Street',
  },
  zodSchema: line1Schema,
};

export const line2: TextFieldDefinition<'line2', 'Line2Credential'> = {
  type: 'Line2Credential',
  key: 'line2',
  characteristics: {
    inputType: 'text',
    label: 'Address Line 2',
    placeholder: 'Apt 4B, Suite 100',
  },
  zodSchema: line2Schema,
};

export const city: TextFieldDefinition<'city', 'CityCredential'> = {
  type: 'CityCredential',
  key: 'city',
  characteristics: {
    inputType: 'text',
    label: 'City',
    placeholder: 'New York',
  },
  zodSchema: citySchema,
};

export const state: TextFieldDefinition<'state', 'StateCredential'> = {
  type: 'StateCredential',
  key: 'state',
  characteristics: {
    inputType: 'text',
    label: 'State',
    placeholder: 'NY',
  },
  zodSchema: stateSchema,
};

export const country: TextFieldDefinition<'country', 'CountryCredential'> = {
  type: 'CountryCredential',
  key: 'country',
  characteristics: {
    inputType: 'text',
    label: 'Country',
    placeholder: 'United States',
  },
  zodSchema: countrySchema,
};

export const zipCode: TextFieldDefinition<'zipCode', 'ZipCodeCredential'> = {
  type: 'ZipCodeCredential',
  key: 'zipCode',
  characteristics: {
    inputType: 'text',
    label: 'Zip Code',
    placeholder: '10001',
  },
  zodSchema: zipCodeSchema,
};

export const address: CompositeFieldDefinition<'address', 'AddressCredential'> =
  {
    type: 'AddressCredential',
    key: 'address',
    characteristics: {
      inputType: 'composite',
      label: 'Address',
    },
    children: {
      line1,
      line2,
      city,
      state,
      country,
      zipCode,
    },
    zodSchema: z
      .object({
        line1: line1Schema.optional(),
        line2: line2Schema.optional(),
        city: citySchema.optional(),
        state: stateSchema.optional(),
        country: countrySchema.optional(),
        zipCode: zipCodeSchema.optional(),
      })
      .optional(),
  };

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    address: CompositeFieldDefinition<'address', 'AddressCredential'>;
    line1: TextFieldDefinition<'line1', 'Line1Credential'>;
    line2: TextFieldDefinition<'line2', 'Line2Credential'>;
    city: TextFieldDefinition<'city', 'CityCredential'>;
    state: TextFieldDefinition<'state', 'StateCredential'>;
    country: TextFieldDefinition<'country', 'CountryCredential'>;
    zipCode: TextFieldDefinition<'zipCode', 'ZipCodeCredential'>;
  }
}
