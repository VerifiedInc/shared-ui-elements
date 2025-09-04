import { fullName, firstName, lastName, middleName } from './fullName';
import { ssn } from './ssn';
import { phone } from './phone';
import { sex } from './sex';

import type { FieldSchemaDefinitions } from '../declarations';

export const fields: FieldSchemaDefinitions = {
  fullName,
  firstName,
  lastName,
  middleName,
  ssn,
  phone,
  sex,
};

export const fieldsFromCredentialTypes = {
  FullNameCredential: fullName,
  FirstNameCredential: firstName,
  LastNameCredential: lastName,
  MiddleNameCredential: middleName,
  SsnCredential: ssn,
  PhoneCredential: phone,
  SexCredential: sex,
};
