import { dateFormat, stateFormat } from '../formats';
import { US_STATES } from '../shared/us-states';
import {
  dateSchema,
  documentNumberSchema,
  driversLicenseSchema,
  stateSchema,
} from '../validations';

import type {
  TextFieldDefinition,
  CompositeFieldDefinition,
  ExtractedFieldValueType,
  SelectFieldDefinition,
  DateFieldDefinition,
} from './types';
import { address } from './address';

const driversLicenseKey = 'driversLicense';
const documentNumberKey = 'documentNumber';
const issuanceStateKey = 'issuanceState';
const issuanceDateKey = 'issuanceDate';
const expirationDateKey = 'expirationDate';
const addressKey = 'address';

export const documentNumber = {
  key: documentNumberKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'Number',
    placeholder: 'John',
  },
  zodSchema: documentNumberSchema,
};

export const issuanceState = {
  key: issuanceStateKey,
  characteristics: {
    inputType: 'select' as const,
    label: 'State',
    placeholder: 'NY',
    options: US_STATES,
  },
  zodSchema: stateSchema,
  format: stateFormat,
};

export const issuanceDate = {
  key: issuanceDateKey,
  characteristics: {
    inputType: 'date' as const,
    label: 'Issued',
    placeholder: '__/__/____',
  },
  zodSchema: dateSchema,
  format: dateFormat,
};

export const expirationDate = {
  key: expirationDateKey,
  characteristics: {
    inputType: 'date' as const,
    label: 'Expired',
    placeholder: '__/__/____',
  },
  zodSchema: dateSchema,
  format: dateFormat,
};

export const driversLicense = {
  key: driversLicenseKey,
  characteristics: {
    inputType: 'composite' as const,
    label: "Driver's License",
    defaultOrder: [
      documentNumberKey,
      issuanceStateKey,
      issuanceDateKey,
      expirationDateKey,
      addressKey,
    ] as const,
  },
  children: {
    documentNumber,
    issuanceState,
    issuanceDate,
    expirationDate,
    address,
  },
  zodSchema: driversLicenseSchema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    driversLicense: CompositeFieldDefinition<typeof driversLicenseKey>;
    documentNumber: TextFieldDefinition<typeof documentNumberKey>;
    issuanceState: SelectFieldDefinition<typeof issuanceStateKey>;
    issuanceDate: DateFieldDefinition<typeof issuanceDateKey>;
    expirationDate: DateFieldDefinition<typeof expirationDateKey>;
    // Address is registered in it field declaration file
  }

  interface FieldValueDefinitions {
    driversLicense: ExtractedFieldValueType<typeof driversLicense>;
  }
}
