import { addressFormat } from '../formats';
import {
  addressSchema,
  line1Schema,
  line2Schema,
  citySchema,
  stateSchema,
  countrySchema,
  zipCodeSchema,
} from '../validations';

import type {
  TextFieldDefinition,
  CompositeFieldDefinition,
  ExtractedFieldValueType,
} from './types';

const addressKey = 'address';
const line1Key = 'line1';
const line2Key = 'line2';
const cityKey = 'city';
const stateKey = 'state';
const countryKey = 'country';
const zipCodeKey = 'zipCode';

export const line1 = {
  key: line1Key,
  characteristics: {
    inputType: 'text' as const,
    label: 'Line 1',
    placeholder: '123 Main Street',
  },
  zodSchema: line1Schema,
};

export const line2 = {
  key: line2Key,
  characteristics: {
    inputType: 'text' as const,
    label: 'Line 2',
    placeholder: 'Apt 4B, Suite 100',
  },
  zodSchema: line2Schema,
};

export const city = {
  key: cityKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'City',
    placeholder: 'New York',
  },
  zodSchema: citySchema,
};

export const state = {
  key: stateKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'State',
    placeholder: 'NY',
  },
  zodSchema: stateSchema,
};

export const country = {
  key: countryKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'Country',
    placeholder: 'US',
  },
  zodSchema: countrySchema,
};

export const zipCode = {
  key: zipCodeKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'Zip Code',
    placeholder: '10001',
  },
  zodSchema: zipCodeSchema,
};

export const address = {
  key: addressKey,
  characteristics: {
    inputType: 'composite' as const,
    label: 'Address',
    defaultOrder: [
      line1Key,
      line2Key,
      cityKey,
      stateKey,
      countryKey,
      zipCodeKey,
    ] as const,
  },
  children: {
    line1,
    line2,
    city,
    state,
    country,
    zipCode,
  },
  zodSchema: addressSchema,
  format: addressFormat,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    address: CompositeFieldDefinition<typeof addressKey>;
    line1: TextFieldDefinition<typeof line1Key>;
    line2: TextFieldDefinition<typeof line2Key>;
    city: TextFieldDefinition<typeof cityKey>;
    state: TextFieldDefinition<typeof stateKey>;
    country: TextFieldDefinition<typeof countryKey>;
    zipCode: TextFieldDefinition<typeof zipCodeKey>;
  }

  interface FieldValueDefinitions {
    address: ExtractedFieldValueType<typeof address>;
  }
}
