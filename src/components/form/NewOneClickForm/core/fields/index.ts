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

export * from './constants';
export type * from './types';

export const fields = {
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

export const credentialKeys = Object.fromEntries(
  Object.keys(fields).map((key) => [key, key]),
) as {
  [K in keyof typeof fields]: K;
};
