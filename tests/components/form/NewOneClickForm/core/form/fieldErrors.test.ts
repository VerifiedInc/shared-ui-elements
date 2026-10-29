import { describe, expect, it } from 'vitest';

import {
  FormBuilder,
  FormFieldBuilder,
} from '../../../../../../src/components/form/NewOneClickForm/core/form';
import type { FormField } from '../../../../../../src/components/form/NewOneClickForm/core/form';
import {
  makeCredential,
  makeCredentialRequest,
  updateFormFieldValues,
} from '../../utils/form';

const addressRequest = (mandatory: 'yes' | 'no') =>
  makeCredentialRequest({
    type: 'AddressCredential',
    mandatory,
    children: [
      makeCredentialRequest({ type: 'Line1Credential', mandatory: 'yes' }),
      makeCredentialRequest({ type: 'Line2Credential', mandatory: 'no' }),
      makeCredentialRequest({ type: 'CityCredential', mandatory: 'yes' }),
      makeCredentialRequest({ type: 'StateCredential', mandatory: 'yes' }),
      makeCredentialRequest({ type: 'CountryCredential', mandatory: 'yes' }),
      makeCredentialRequest({ type: 'ZipCodeCredential', mandatory: 'yes' }),
    ],
  });
const fullAddress = {
  line1: '1 Main St',
  line2: '',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62701',
  country: 'US',
};

const snapshot = (field: FormField) => ({
  isValid: field.isValid,
  errorMessage: field.errorMessage,
  issues: (field.errors?.error?.issues ?? []).map(({ path, message }: any) => ({
    path,
    message,
  })),
});

const addressField = (
  mandatory: 'yes' | 'no',
  values: Record<string, string>,
) => {
  const form = new FormBuilder().createFromCredentialAndRequests(
    [makeCredential({ type: 'address', value: fullAddress })],
    [addressRequest(mandatory)],
  );
  const field = form.fields.address;
  updateFormFieldValues(field, values);
  return snapshot(field);
};

const license = {
  documentNumber: 'D123',
  issuanceState: 'IL',
  issuanceDate: '2020-01-31',
  expirationDate: '2030-01-31',
};

const driversLicenseField = (values: Record<string, string>) => {
  const form = new FormBuilder().createFromCredentialAndRequests(
    [makeCredential({ type: 'driversLicense', value: license })],
    [
      makeCredentialRequest({
        type: 'DriversLicenseCredential',
        mandatory: 'yes',
        children: [
          makeCredentialRequest({
            type: 'DocumentNumberCredential',
            mandatory: 'yes',
          }),
          makeCredentialRequest({
            type: 'IssuanceStateCredential',
            mandatory: 'yes',
          }),
          makeCredentialRequest({
            type: 'IssuanceDateCredential',
            mandatory: 'yes',
          }),
          makeCredentialRequest({
            type: 'ExpirationDateCredential',
            mandatory: 'no',
          }),
        ],
      }),
    ],
  );
  const field = form.fields.driversLicense;
  updateFormFieldValues(field, values);
  return snapshot(field);
};

const single = (
  type: string,
  requestType: string,
  mandatory: 'yes' | 'no',
  value: unknown,
) => {
  const field = new FormFieldBuilder().createFromCredential(
    makeCredential({ type, value: { [type]: '' } as any }),
    undefined,
    makeCredentialRequest({
      type: requestType,
      mandatory,
      description: requestType,
    }),
  );
  field.value = value as any;
  return snapshot(field);
};

const whole = (
  type: string,
  requestType: string,
  mandatory: 'yes' | 'no',
  value: unknown,
) => {
  const form = new FormBuilder().createFromCredentialAndRequests(
    [],
    [makeCredentialRequest({ type: requestType, mandatory })],
  );
  const field = (form.fields as any)[type] as FormField;
  const defaultValue = field.value;
  if (value !== undefined) field.value = value as any;
  return { defaultValue, ...snapshot(field) };
};

// What each field shows on zod 3, as the 1-Click form reads it: whether it is valid, the message it
// displays (the first one), every issue in order and, for fields built without a credential, the
// empty value the inputs bind to.
const cases: Array<[string, () => unknown, unknown]> = [
  [
    'required address, complete',
    () => addressField('yes', fullAddress),
    { isValid: true, errorMessage: null, issues: [] },
  ],
  [
    'required address with an empty city',
    () => addressField('yes', { ...fullAddress, city: '' }),
    {
      isValid: false,
      errorMessage: 'City is required',
      issues: [
        { path: ['city'], message: 'City is required' },
        { path: ['city'], message: 'City is required' },
      ],
    },
  ],
  [
    'required address outside the US',
    () => addressField('yes', { ...fullAddress, country: 'CA' }),
    {
      isValid: false,
      errorMessage: 'Country must be US',
      issues: [
        { path: ['country'], message: 'Country must be US' },
        { path: ['country'], message: 'Country must be US' },
      ],
    },
  ],
  [
    'required address left empty',
    () =>
      addressField('yes', {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      }),
    {
      isValid: false,
      errorMessage: 'Line 1 is required',
      issues: [
        { path: ['line1'], message: 'Line 1 is required' },
        { path: ['city'], message: 'City is required' },
        { path: ['state'], message: 'Invalid state' },
        { path: ['country'], message: 'Country must be US' },
        { path: ['zipCode'], message: 'Invalid zip code' },
      ],
    },
  ],
  [
    'optional address with an empty city',
    () => addressField('no', { ...fullAddress, city: '' }),
    {
      isValid: false,
      errorMessage: 'City is required',
      issues: [
        { path: ['city'], message: 'City is required' },
        { path: ['city'], message: 'City is required' },
      ],
    },
  ],
  [
    'optional address outside the US',
    () => addressField('no', { ...fullAddress, country: 'CA' }),
    {
      isValid: false,
      errorMessage: 'Country must be US',
      issues: [
        { path: ['country'], message: 'Country must be US' },
        { path: ['country'], message: 'Country must be US' },
      ],
    },
  ],
  [
    'optional address left empty',
    () =>
      addressField('no', {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      }),
    {
      isValid: false,
      errorMessage: 'Line 1 is required',
      issues: [
        { path: ['line1'], message: 'Line 1 is required' },
        { path: ['city'], message: 'City is required' },
        { path: ['state'], message: 'Invalid state' },
        { path: ['country'], message: 'Country must be US' },
        { path: ['zipCode'], message: 'Invalid zip code' },
      ],
    },
  ],
  [
    'optional address with only line 1',
    () =>
      addressField('no', {
        line1: '1 Main St',
        line2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      }),
    {
      isValid: false,
      errorMessage: 'City is required',
      issues: [
        { path: ['city'], message: 'City is required' },
        { path: ['state'], message: 'Invalid state' },
        { path: ['country'], message: 'Country must be US' },
        { path: ['zipCode'], message: 'Invalid zip code' },
      ],
    },
  ],
  [
    'required SSN that is too short',
    () => single('ssn', 'SsnCredential', 'yes', '123'),
    {
      isValid: false,
      errorMessage: 'Invalid SSN',
      issues: [{ path: [], message: 'Invalid SSN' }],
    },
  ],
  [
    'required SSN left empty',
    () => single('ssn', 'SsnCredential', 'yes', ''),
    {
      isValid: false,
      errorMessage: 'Invalid SSN',
      issues: [
        { path: [], message: 'Invalid SSN' },
        { path: [], message: 'SSN is required' },
      ],
    },
  ],
  [
    'optional SSN left empty',
    () => single('ssn', 'SsnCredential', 'no', ''),
    { isValid: true, errorMessage: null, issues: [] },
  ],
  [
    'required sex left empty',
    () => single('sex', 'SexCredential', 'yes', ''),
    {
      isValid: false,
      errorMessage:
        "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received ''",
      issues: [
        {
          path: [],
          message:
            "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received ''",
        },
      ],
    },
  ],
  [
    'required sex outside the options',
    () => single('sex', 'SexCredential', 'yes', 'Other'),
    {
      isValid: false,
      errorMessage:
        "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received 'Other'",
      issues: [
        {
          path: [],
          message:
            "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received 'Other'",
        },
      ],
    },
  ],
  [
    'required sex, chosen',
    () => single('sex', 'SexCredential', 'yes', 'Male'),
    { isValid: true, errorMessage: null, issues: [] },
  ],
  [
    'required phone left empty',
    () => single('phone', 'PhoneCredential', 'yes', ''),
    {
      isValid: false,
      errorMessage: 'Phone is invalid',
      issues: [
        { path: [], message: 'Phone is invalid' },
        { path: [], message: 'Phone is required' },
      ],
    },
  ],
  [
    'required phone without a country code',
    () => single('phone', 'PhoneCredential', 'yes', '2125551234'),
    {
      isValid: false,
      errorMessage: 'Phone is invalid',
      issues: [{ path: [], message: 'Phone is invalid' }],
    },
  ],
  [
    'required birth date left empty',
    () => single('birthDate', 'BirthDateCredential', 'yes', ''),
    {
      isValid: false,
      errorMessage: '',
      issues: [
        { path: [], message: '' },
        { path: [], message: '' },
        { path: [], message: 'Must be 18 years or older' },
        { path: [], message: 'Birthday is required' },
      ],
    },
  ],
  [
    'required birth date under 18',
    () =>
      single(
        'birthDate',
        'BirthDateCredential',
        'yes',
        new Date().toISOString().slice(0, 10),
      ),
    {
      isValid: false,
      errorMessage: 'Must be 18 years or older',
      issues: [{ path: [], message: 'Must be 18 years or older' }],
    },
  ],
  [
    'required health insurance without a credential',
    () =>
      whole('healthInsurance', 'HealthInsuranceCredential', 'yes', undefined),
    {
      defaultValue: { memberId: '', payer: { verifiedId: '', name: '' } },
      isValid: false,
      errorMessage: 'Member ID is required',
      issues: [
        { path: ['memberId'], message: 'Member ID is required' },
        { path: ['payer', 'verifiedId'], message: 'Invalid' },
        { path: ['payer', 'name'], message: 'Payer name is required' },
      ],
    },
  ],
  [
    'required health insurance with a malformed payer',
    () =>
      whole('healthInsurance', 'HealthInsuranceCredential', 'yes', {
        memberId: 'M1',
        payer: { verifiedId: 'X1', name: 'Aetna', logoUrl: 'nope' },
      }),
    {
      defaultValue: { memberId: '', payer: { verifiedId: '', name: '' } },
      isValid: false,
      errorMessage: 'Invalid',
      issues: [
        { path: ['payer', 'verifiedId'], message: 'Invalid' },
        { path: ['payer', 'logoUrl'], message: 'Invalid url' },
      ],
    },
  ],
  [
    'required employer without a credential',
    () => whole('employer', 'EmployerCredential', 'yes', undefined),
    {
      defaultValue: { employer: { name: '' } },
      isValid: false,
      errorMessage: 'Employer name is required',
      issues: [
        { path: ['employer', 'name'], message: 'Employer name is required' },
      ],
    },
  ],
  [
    'required employer with a partial address',
    () =>
      whole('employer', 'EmployerCredential', 'yes', {
        employer: { name: 'Acme', address: { line1: '1 Main St' } },
      }),
    {
      defaultValue: { employer: { name: '' } },
      isValid: false,
      errorMessage: 'City is required',
      issues: [
        { path: ['employer', 'address', 'city'], message: 'City is required' },
        { path: ['employer', 'address', 'state'], message: 'Invalid state' },
        {
          path: ['employer', 'address', 'zipCode'],
          message: 'Invalid zip code',
        },
        {
          path: ['employer', 'address', 'country'],
          message: 'Country must be US',
        },
      ],
    },
  ],
  [
    'optional employer without a credential',
    () => whole('employer', 'EmployerCredential', 'no', undefined),
    {
      defaultValue: { employer: { name: '' } },
      isValid: true,
      errorMessage: null,
      issues: [],
    },
  ],
  [
    'required license with an empty document number',
    () => driversLicenseField({ ...license, documentNumber: '' }),
    {
      isValid: false,
      errorMessage: 'Number is required',
      issues: [{ path: ['documentNumber'], message: 'Number is required' }],
    },
  ],
  [
    'required license with an empty issuance date',
    () => driversLicenseField({ ...license, issuanceDate: '' }),
    {
      isValid: false,
      errorMessage: '',
      issues: [
        { path: ['issuanceDate'], message: '' },
        { path: ['issuanceDate'], message: '' },
      ],
    },
  ],
  [
    'required license with an optional expiration date left empty',
    () => driversLicenseField({ ...license, expirationDate: '' }),
    { isValid: true, errorMessage: null, issues: [] },
  ],
];

describe('1-Click field errors', () => {
  it.each(cases)('%s', (_name, field, expected) => {
    expect(field()).toEqual(expected);
  });
});
