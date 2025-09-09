import { fullName, firstName, lastName, middleName } from './fullName';
import {
  address,
  line1,
  line2,
  city,
  state,
  country,
  zipCode,
} from './address';
import { ssn } from './ssn';
import { phone } from './phone';
import { sex } from './sex';
import { birthDate } from './birthDate';

import type { FieldSchemaDefinitions } from '../declarations';

export * from './constants';
export type * from './types';

export const fields: FieldSchemaDefinitions = {
  fullName,
  firstName,
  lastName,
  middleName,
  address,
  line1,
  line2,
  city,
  state,
  country,
  zipCode,
  ssn,
  phone,
  sex,
  birthDate,
};

export const fieldsFromCredentialTypes = {
  FullNameCredential: fullName,
  FirstNameCredential: firstName,
  LastNameCredential: lastName,
  MiddleNameCredential: middleName,
  AddressCredential: address,
  Line1Credential: line1,
  Line2Credential: line2,
  CityCredential: city,
  StateCredential: state,
  CountryCredential: country,
  ZipCodeCredential: zipCode,
  SsnCredential: ssn,
  PhoneCredential: phone,
  SexCredential: sex,
  BirthDateCredential: birthDate,
};

export const credentialTypes = Object.fromEntries(
  Object.keys(fieldsFromCredentialTypes).map((key) => [key, key]),
) as {
  [K in keyof typeof fieldsFromCredentialTypes]: K;
};
