import { describe, it } from 'vitest';
import type { ZodType } from 'zod';

import {
  MaskedAndUnmaskedSSNSchema,
  SSNSchema,
  USDateSchema,
  birthDateSchema,
  businessEmailSchema,
  dateSchema,
  descriptionSchema,
  emailSchema,
  fieldSchema,
  getDateSchemaWithPastValidation,
  getUnixSchema,
  npiSchema,
  phoneSchema,
  stateSchema,
  zipCodeSchema,
} from '../../src/validations';

import {
  type Outcome,
  expectOutcome,
  invalid,
  valid,
} from '../utils/schemaOutcome';

// Every message here is the one these schemas gave on zod 3, word for word: the forms show them.
const day = 24 * 60 * 60 * 1000;
const isoToday = new Date().toISOString().slice(0, 10);

const cases: Array<[string, ZodType, unknown, Outcome]> = [
  ['emailSchema', emailSchema, 'jane@acme.com', valid],
  ['emailSchema', emailSchema, 'nope', invalid([[], 'Invalid email'])],
  ['emailSchema', emailSchema, '', invalid([[], 'Invalid email'])],
  [
    'emailSchema',
    emailSchema,
    'jane..doe@acme.com',
    invalid([[], 'Invalid email']),
  ],
  ['emailSchema', emailSchema, 'Jane.Doe+tag@Sub.Acme.IO', valid],
  ['businessEmailSchema', businessEmailSchema, 'jane@acme.com', valid],
  [
    'businessEmailSchema',
    businessEmailSchema,
    'jane@gmail.com',
    invalid([[], 'Invalid input']),
  ],
  [
    'businessEmailSchema',
    businessEmailSchema,
    'nope',
    invalid([[], 'Invalid input']),
  ],
  [
    'fieldSchema',
    fieldSchema,
    '',
    invalid([[], 'String must contain at least 1 character(s)']),
  ],
  ['fieldSchema', fieldSchema, 'x', valid],
  [
    'descriptionSchema',
    descriptionSchema,
    'ab',
    invalid([[], 'Must have enough description']),
  ],
  ['descriptionSchema', descriptionSchema, 'abc', valid],
  ['npiSchema', npiSchema, '1234567890', valid],
  ['npiSchema', npiSchema, '123', invalid([[], 'Invalid NPI'])],
  ['phoneSchema', phoneSchema, '+12125551234', valid],
  ['phoneSchema', phoneSchema, '2125551234', invalid([[], 'Phone is invalid'])],
  [
    'phoneSchema',
    phoneSchema,
    '+442071838750',
    invalid([[], 'Phone is invalid']),
  ],
  ['SSNSchema', SSNSchema, '123456789', valid],
  ['SSNSchema', SSNSchema, '123', invalid([[], 'Invalid'])],
  ['SSNSchema', SSNSchema, '666123456', invalid([[], 'Invalid'])],
  [
    'MaskedAndUnmaskedSSNSchema',
    MaskedAndUnmaskedSSNSchema,
    '•••-••-1234',
    valid,
  ],
  [
    'MaskedAndUnmaskedSSNSchema',
    MaskedAndUnmaskedSSNSchema,
    '123456789',
    valid,
  ],
  [
    'MaskedAndUnmaskedSSNSchema',
    MaskedAndUnmaskedSSNSchema,
    '123',
    invalid([[], 'Invalid SSN']),
  ],
  ['getUnixSchema()', getUnixSchema(), '1700000000', valid],
  [
    'getUnixSchema()',
    getUnixSchema(),
    '123',
    invalid([[], 'Invalid Unix string timestamp']),
  ],
  [
    'getUnixSchema()',
    getUnixSchema(),
    'abc',
    invalid([[], 'Invalid Unix string timestamp']),
  ],
  [
    "getUnixSchema('Bad time')",
    getUnixSchema('Bad time'),
    'abc',
    invalid([[], 'Bad time']),
  ],
  ['USDateSchema', USDateSchema, '01/31/2000', valid],
  [
    'USDateSchema',
    USDateSchema,
    '2000-01-31',
    invalid([[], 'Date is invalid']),
  ],
  [
    'USDateSchema',
    USDateSchema,
    '13/45/2000',
    invalid([[], 'Date is invalid']),
  ],
  ['dateSchema', dateSchema, '2000-01-31', valid],
  ['dateSchema', dateSchema, '••••-01-31', valid],
  ['dateSchema', dateSchema, String(Date.UTC(2000, 0, 1, 12)), valid],
  [
    'dateSchema',
    dateSchema,
    String(Date.UTC(2000, 0, 1, 13)),
    invalid([[], '']),
  ],
  [
    'dateSchema',
    dateSchema,
    String(Date.UTC(1899, 0, 1, 12)),
    invalid([[], '']),
  ],
  ['dateSchema', dateSchema, 'abc', invalid([[], ''], [[], ''])],
  ['birthDateSchema', birthDateSchema, '2000-01-31', valid],
  ['birthDateSchema', birthDateSchema, '1850-01-31', invalid([[], ''])],
  [
    'birthDateSchema',
    birthDateSchema,
    isoToday,
    invalid([[], 'Must be 18 years or older']),
  ],
  ['birthDateSchema', birthDateSchema, String(Date.UTC(2000, 0, 1, 12)), valid],
  [
    'birthDateSchema',
    birthDateSchema,
    'abc',
    invalid([[], ''], [[], ''], [[], 'Must be 18 years or older']),
  ],
  [
    'getDateSchemaWithPastValidation',
    getDateSchemaWithPastValidation('Must be in the past'),
    new Date(Date.now() - day),
    valid,
  ],
  [
    'getDateSchemaWithPastValidation',
    getDateSchemaWithPastValidation('Must be in the past'),
    new Date(Date.now() + day),
    invalid([[], 'Must be in the past']),
  ],
  ['stateSchema', stateSchema, 'CA', valid],
  ['stateSchema', stateSchema, 'ZZ', invalid([[], 'Invalid state'])],
  ['stateSchema', stateSchema, '', invalid([[], 'Invalid state'])],
  ['zipCodeSchema', zipCodeSchema, '12345', valid],
  ['zipCodeSchema', zipCodeSchema, '12345-6789', valid],
  ['zipCodeSchema', zipCodeSchema, '1234', invalid([[], 'Invalid zip code'])],
];

describe('validations', () => {
  it.each(
    cases.map(
      ([name, schema, input, expected]) =>
        [name, input, schema, expected] as const,
    ),
  )('%s with %j', (_name, input, schema, expected) => {
    expectOutcome(schema, input, expected);
  });
});
