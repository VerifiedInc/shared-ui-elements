import { z } from 'zod';

import {
  line1Schema,
  line2Schema,
  citySchema,
  stateSchema,
  countrySchema,
  zipCodeSchema,
} from '../validations';

import { toUSaddressPretty } from '../../../../../utils/address';

import type { TextFieldDefinition, CompositeFieldDefinition } from './types';

const addressKey = 'address';
const line1Key = 'line1';
const line2Key = 'line2';
const cityKey = 'city';
const stateKey = 'state';
const countryKey = 'country';
const zipCodeKey = 'zipCode';

export const line1: TextFieldDefinition<typeof line1Key, 'Line1Credential'> = {
  type: 'Line1Credential',
  key: line1Key,
  characteristics: {
    inputType: 'text',
    label: 'Address Line 1',
    placeholder: '123 Main Street',
  },
  zodSchema: line1Schema,
};

export const line2: TextFieldDefinition<typeof line2Key, 'Line2Credential'> = {
  type: 'Line2Credential',
  key: line2Key,
  characteristics: {
    inputType: 'text',
    label: 'Address Line 2',
    placeholder: 'Apt 4B, Suite 100',
  },
  zodSchema: line2Schema,
};

export const city: TextFieldDefinition<typeof cityKey, 'CityCredential'> = {
  type: 'CityCredential',
  key: cityKey,
  characteristics: {
    inputType: 'text',
    label: 'City',
    placeholder: 'New York',
  },
  zodSchema: citySchema,
};

export const state: TextFieldDefinition<typeof stateKey, 'StateCredential'> = {
  type: 'StateCredential',
  key: stateKey,
  characteristics: {
    inputType: 'text',
    label: 'State',
    placeholder: 'NY',
  },
  zodSchema: stateSchema,
};

export const country: TextFieldDefinition<
  typeof countryKey,
  'CountryCredential'
> = {
  type: 'CountryCredential',
  key: countryKey,
  characteristics: {
    inputType: 'text',
    label: 'Country',
    placeholder: 'US',
  },
  zodSchema: countrySchema,
};

export const zipCode: TextFieldDefinition<
  typeof zipCodeKey,
  'ZipCodeCredential'
> = {
  type: 'ZipCodeCredential',
  key: zipCodeKey,
  characteristics: {
    inputType: 'text',
    label: 'Zip Code',
    placeholder: '10001',
  },
  zodSchema: zipCodeSchema,
};

export const address: CompositeFieldDefinition<
  typeof addressKey,
  'AddressCredential'
> = {
  type: 'AddressCredential',
  key: addressKey,
  characteristics: {
    inputType: 'composite',
    label: 'Address',
    defaultOrder: [
      line1Key,
      line2Key,
      cityKey,
      stateKey,
      countryKey,
      zipCodeKey,
    ],
  },
  children: {
    line1,
    line2,
    city,
    state,
    country,
    zipCode,
  },
  zodSchema: z.object({
    line1: line1Schema,
    line2: line2Schema,
    city: citySchema,
    state: stateSchema,
    country: countrySchema,
    zipCode: zipCodeSchema,
  }),
  format: (value: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  }): string | null => {
    // Validate required fields
    if (
      !value?.line1?.trim() ||
      !value?.city?.trim() ||
      !value?.state?.trim() ||
      !value?.zipCode?.trim()
    ) {
      return null;
    }

    // Use toUSaddressPretty for consistent formatting
    return toUSaddressPretty({
      line1: value.line1.trim(),
      line2: value.line2?.trim(),
      city: value.city.trim(),
      state: value.state.trim(),
      zipCode: value.zipCode.trim(),
      country: value.country?.trim() ?? 'US',
    });
  },
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    address: CompositeFieldDefinition<typeof addressKey, 'AddressCredential'>;
    line1: TextFieldDefinition<typeof line1Key, 'Line1Credential'>;
    line2: TextFieldDefinition<typeof line2Key, 'Line2Credential'>;
    city: TextFieldDefinition<typeof cityKey, 'CityCredential'>;
    state: TextFieldDefinition<typeof stateKey, 'StateCredential'>;
    country: TextFieldDefinition<typeof countryKey, 'CountryCredential'>;
    zipCode: TextFieldDefinition<typeof zipCodeKey, 'ZipCodeCredential'>;
  }
}
