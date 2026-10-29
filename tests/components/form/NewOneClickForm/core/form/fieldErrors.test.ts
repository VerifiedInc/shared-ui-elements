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

const valid = { isValid: true, errorMessage: null, issues: [] };

const invalid = (
  errorMessage: string,
  ...issues: Array<[PropertyKey[], string]>
) => ({
  isValid: false,
  errorMessage,
  issues: issues.map(([path, message]) => ({ path, message })),
});

const emptyCity = invalid(
  'City is required',
  [['city'], 'City is required'],
  [['city'], 'City is required'],
);
const outsideTheUS = invalid(
  'Country must be US',
  [['country'], 'Country must be US'],
  [['country'], 'Country must be US'],
);
const addressLeftEmpty = invalid(
  'Line 1 is required',
  [['line1'], 'Line 1 is required'],
  [['city'], 'City is required'],
  [['state'], 'Invalid state'],
  [['country'], 'Country must be US'],
  [['zipCode'], 'Invalid zip code'],
);

// What each field shows on zod 3, as the 1-Click form reads it: whether it is valid, the message it
// displays (the first one), every issue in order and, for fields built without a credential, the
// empty value the inputs bind to.
const cases: Array<[string, () => unknown, unknown]> = [
  ['required address, complete', () => addressField('yes', fullAddress), valid],
  [
    'required address with an empty city',
    () => addressField('yes', { ...fullAddress, city: '' }),
    emptyCity,
  ],
  [
    'required address outside the US',
    () => addressField('yes', { ...fullAddress, country: 'CA' }),
    outsideTheUS,
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
    addressLeftEmpty,
  ],
  [
    'optional address with an empty city',
    () => addressField('no', { ...fullAddress, city: '' }),
    emptyCity,
  ],
  [
    'optional address outside the US',
    () => addressField('no', { ...fullAddress, country: 'CA' }),
    outsideTheUS,
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
    addressLeftEmpty,
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
    invalid(
      'City is required',
      [['city'], 'City is required'],
      [['state'], 'Invalid state'],
      [['country'], 'Country must be US'],
      [['zipCode'], 'Invalid zip code'],
    ),
  ],
  [
    'required SSN that is too short',
    () => single('ssn', 'SsnCredential', 'yes', '123'),
    invalid('Invalid SSN', [[], 'Invalid SSN']),
  ],
  [
    'required SSN left empty',
    () => single('ssn', 'SsnCredential', 'yes', ''),
    invalid('Invalid SSN', [[], 'Invalid SSN'], [[], 'SSN is required']),
  ],
  [
    'optional SSN left empty',
    () => single('ssn', 'SsnCredential', 'no', ''),
    valid,
  ],
  [
    'required sex left empty',
    () => single('sex', 'SexCredential', 'yes', ''),
    invalid(
      "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received ''",
      [
        [],
        "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received ''",
      ],
    ),
  ],
  [
    'required sex outside the options',
    () => single('sex', 'SexCredential', 'yes', 'Other'),
    invalid(
      "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received 'Other'",
      [
        [],
        "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received 'Other'",
      ],
    ),
  ],
  [
    'required sex, chosen',
    () => single('sex', 'SexCredential', 'yes', 'Male'),
    valid,
  ],
  [
    'required phone left empty',
    () => single('phone', 'PhoneCredential', 'yes', ''),
    invalid(
      'Phone is invalid',
      [[], 'Phone is invalid'],
      [[], 'Phone is required'],
    ),
  ],
  [
    'required phone without a country code',
    () => single('phone', 'PhoneCredential', 'yes', '2125551234'),
    invalid('Phone is invalid', [[], 'Phone is invalid']),
  ],
  [
    'required birth date left empty',
    () => single('birthDate', 'BirthDateCredential', 'yes', ''),
    invalid(
      '',
      [[], ''],
      [[], ''],
      [[], 'Must be 18 years or older'],
      [[], 'Birthday is required'],
    ),
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
    invalid('Must be 18 years or older', [[], 'Must be 18 years or older']),
  ],
  [
    'required health insurance without a credential',
    () =>
      whole('healthInsurance', 'HealthInsuranceCredential', 'yes', undefined),
    {
      defaultValue: { memberId: '', payer: { verifiedId: '', name: '' } },
      ...invalid(
        'Member ID is required',
        [['memberId'], 'Member ID is required'],
        [['payer', 'verifiedId'], 'Invalid'],
        [['payer', 'name'], 'Payer name is required'],
      ),
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
      ...invalid(
        'Invalid',
        [['payer', 'verifiedId'], 'Invalid'],
        [['payer', 'logoUrl'], 'Invalid url'],
      ),
    },
  ],
  [
    'required employer without a credential',
    () => whole('employer', 'EmployerCredential', 'yes', undefined),
    {
      defaultValue: { employer: { name: '' } },
      ...invalid('Employer name is required', [
        ['employer', 'name'],
        'Employer name is required',
      ]),
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
      ...invalid(
        'City is required',
        [['employer', 'address', 'city'], 'City is required'],
        [['employer', 'address', 'state'], 'Invalid state'],
        [['employer', 'address', 'zipCode'], 'Invalid zip code'],
        [['employer', 'address', 'country'], 'Country must be US'],
      ),
    },
  ],
  [
    'optional employer without a credential',
    () => whole('employer', 'EmployerCredential', 'no', undefined),
    { defaultValue: { employer: { name: '' } }, ...valid },
  ],
  [
    'required license with an empty document number',
    () => driversLicenseField({ ...license, documentNumber: '' }),
    invalid('Number is required', [['documentNumber'], 'Number is required']),
  ],
  [
    'required license with an empty issuance date',
    () => driversLicenseField({ ...license, issuanceDate: '' }),
    invalid('', [['issuanceDate'], ''], [['issuanceDate'], '']),
  ],
  [
    'required license with an optional expiration date left empty',
    () => driversLicenseField({ ...license, expirationDate: '' }),
    valid,
  ],
];

describe('1-Click field errors', () => {
  it.each(cases)('%s', (_name, field, expected) => {
    expect(field()).toEqual(expected);
  });
});
