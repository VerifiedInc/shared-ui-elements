import { describe, it } from 'vitest';
import type { ZodType } from 'zod';

import {
  addressSchema,
  citySchema,
  countrySchema,
  documentNumberSchema,
  driversLicenseSchema,
  employerSchema,
  fullNameSchema,
  healthInsuranceSchema,
  line1Schema,
  memberIdSchema,
  payerNameSchema,
  requiredAddressSchema,
  sexSchema,
  ssnSchema,
} from '../../../../../../src/components/form/NewOneClickForm/core/validations';
import { employerNameSchema } from '../../../../../../src/components/form/NewOneClickForm/core/validations/employer/employerName.schema';
import { legalNameSchema } from '../../../../../../src/components/form/NewOneClickForm/core/validations/employer/legalName.schema';

import {
  type Outcome,
  expectOutcome,
  invalid,
  valid,
  validAs,
} from '../../../../../utils/schemaOutcome';

// Every message here is the one these schemas gave on zod 3, word for word: the 1-Click form shows them.
const fullAddress = {
  line1: '1 Main St',
  line2: '',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62701',
  country: 'US',
};

const cases: Array<[string, ZodType, unknown, Outcome]> = [
  ['line1Schema', line1Schema, '', invalid([[], 'Line 1 is required'])],
  ['citySchema', citySchema, '', invalid([[], 'City is required'])],
  ['countrySchema', countrySchema, 'US', valid],
  ['countrySchema', countrySchema, 'CA', invalid([[], 'Country must be US'])],
  ['addressSchema', addressSchema, {}, valid],
  ['addressSchema', addressSchema, fullAddress, valid],
  [
    'addressSchema',
    addressSchema,
    { line1: '1 Main St', city: '' },
    invalid([['city'], 'City is required'], [['city'], 'City is required']),
  ],
  [
    'addressSchema',
    addressSchema,
    { ...fullAddress, country: 'CA' },
    invalid(
      [['country'], 'Country must be US'],
      [['country'], 'Country must be US'],
    ),
  ],
  [
    'addressSchema',
    addressSchema,
    { ...fullAddress, state: 'ZZ', zipCode: '1' },
    invalid([['state'], 'Invalid state'], [['zipCode'], 'Invalid zip code']),
  ],
  ['requiredAddressSchema', requiredAddressSchema, fullAddress, valid],
  [
    'requiredAddressSchema',
    requiredAddressSchema,
    { line1: '1 Main St' },
    invalid(
      [['city'], 'City is required'],
      [['state'], 'Invalid state'],
      [['zipCode'], 'Invalid zip code'],
      [['country'], 'Country must be US'],
    ),
  ],
  [
    'fullNameSchema',
    fullNameSchema,
    { firstName: 'Ada', lastName: 'Lovelace', middleName: '' },
    valid,
  ],
  ['sexSchema', sexSchema, 'Female', valid],
  [
    'sexSchema',
    sexSchema,
    '',
    invalid([
      [],
      "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received ''",
    ]),
  ],
  [
    'sexSchema',
    sexSchema,
    'Other',
    invalid([
      [],
      "Invalid enum value. Expected 'Male' | 'Female' | 'Non-Binary', received 'Other'",
    ]),
  ],
  ['ssnSchema', ssnSchema, '***-**-1234', valid],
  ['ssnSchema', ssnSchema, '•••-••-1234', valid],
  ['ssnSchema', ssnSchema, '123456789', valid],
  ['ssnSchema', ssnSchema, '123', invalid([[], 'Invalid SSN'])],
  ['documentNumberSchema', documentNumberSchema, '', valid],
  [
    'driversLicenseSchema',
    driversLicenseSchema,
    {
      documentNumber: 'D123',
      issuanceState: 'IL',
      issuanceDate: '2020-01-31',
      expirationDate: '2030-01-31',
      address: fullAddress,
    },
    valid,
  ],
  [
    'driversLicenseSchema',
    driversLicenseSchema,
    {
      documentNumber: 'D123',
      issuanceState: 'ZZ',
      issuanceDate: 'abc',
      expirationDate: '2030-01-31',
      address: {},
    },
    invalid(
      [['issuanceState'], 'Invalid state'],
      [['issuanceDate'], ''],
      [['issuanceDate'], ''],
    ),
  ],
  [
    'employerNameSchema',
    employerNameSchema,
    '  ',
    invalid([[], 'Employer name is required']),
  ],
  ['employerNameSchema', employerNameSchema, ' Acme ', validAs('Acme')],
  [
    'legalNameSchema',
    legalNameSchema,
    'x'.repeat(256),
    invalid([[], 'Legal name is required']),
  ],
  [
    'employerSchema',
    employerSchema,
    { employer: { name: ' Acme ', logoUrl: '' } },
    validAs({ employer: { name: 'Acme', logoUrl: '' } }),
  ],
  [
    'employerSchema',
    employerSchema,
    {
      employer: {
        name: 'Acme',
        logoUrl: 'https://acme.com/logo.png',
        address: fullAddress,
      },
    },
    valid,
  ],
  [
    'employerSchema',
    employerSchema,
    { employer: { name: '', logoUrl: 'nope' } },
    invalid(
      [['employer', 'name'], 'Employer name is required'],
      [['employer', 'logoUrl'], 'Invalid url'],
    ),
  ],
  [
    'employerSchema',
    employerSchema,
    { employer: { name: 'Acme', address: { line1: '1 Main St' } } },
    invalid(
      [['employer', 'address', 'city'], 'City is required'],
      [['employer', 'address', 'state'], 'Invalid state'],
      [['employer', 'address', 'zipCode'], 'Invalid zip code'],
      [['employer', 'address', 'country'], 'Country must be US'],
    ),
  ],
  [
    'memberIdSchema',
    memberIdSchema,
    '',
    invalid([[], 'Member ID is required']),
  ],
  [
    'memberIdSchema',
    memberIdSchema,
    'x'.repeat(256),
    invalid([[], 'Member ID is required']),
  ],
  ['payerNameSchema', payerNameSchema, '  ', validAs('')],
  ['payerNameSchema', payerNameSchema, ' Aetna ', validAs('Aetna')],
  [
    'healthInsuranceSchema',
    healthInsuranceSchema,
    {
      memberId: 'M1',
      payer: { verifiedId: 'V1', name: 'Aetna', logoUrl: null },
    },
    valid,
  ],
  [
    'healthInsuranceSchema',
    healthInsuranceSchema,
    {
      memberId: '',
      payer: { verifiedId: 'X1', name: 'Aetna', logoUrl: 'nope' },
    },
    invalid(
      [['memberId'], 'Member ID is required'],
      [['payer', 'verifiedId'], 'Invalid'],
      [['payer', 'logoUrl'], 'Invalid url'],
    ),
  ],
  [
    'healthInsuranceSchema',
    healthInsuranceSchema,
    {
      id: 7,
      memberId: 'M1',
      payer: { verifiedId: 'V1', name: '', logoUrl: '' },
    },
    invalid([['payer', 'name'], 'Payer name is required']),
  ],
];

describe('1-Click field validations', () => {
  it.each(
    cases.map(
      ([name, schema, input, expected]) =>
        [name, input, schema, expected] as const,
    ),
  )('%s with %j', (_name, input, schema, expected) => {
    expectOutcome(schema, input, expected);
  });
});
