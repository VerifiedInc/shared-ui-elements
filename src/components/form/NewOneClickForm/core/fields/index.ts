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

import type { FieldSchemaDefinitions } from '../declarations';

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
};
