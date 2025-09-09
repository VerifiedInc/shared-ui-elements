import { z } from 'zod';

import { firstSchema, lastSchema, middleSchema } from '../validations';

import type { TextFieldDefinition, CompositeFieldDefinition } from './types';

const fullNameKey = 'fullName';
const firstNameKey = 'firstName';
const lastNameKey = 'lastName';
const middleNameKey = 'middleName';

export const firstName: TextFieldDefinition<
  typeof firstNameKey,
  'FirstNameCredential'
> = {
  type: 'FirstNameCredential',
  key: firstNameKey,
  characteristics: {
    inputType: 'text',
    label: 'First Name',
    placeholder: 'John',
  },
  zodSchema: firstSchema,
};

export const lastName: TextFieldDefinition<
  typeof lastNameKey,
  'LastNameCredential'
> = {
  type: 'LastNameCredential',
  key: lastNameKey,
  characteristics: {
    inputType: 'text',
    label: 'Last Name',
    placeholder: 'Doe',
  },
  zodSchema: lastSchema,
};

export const middleName: TextFieldDefinition<
  typeof middleNameKey,
  'MiddleNameCredential'
> = {
  type: 'MiddleNameCredential',
  key: middleNameKey,
  characteristics: {
    inputType: 'text',
    label: 'Middle Name',
    placeholder: 'William',
  },
  zodSchema: middleSchema,
};

export const fullName: CompositeFieldDefinition<
  typeof fullNameKey,
  'FullNameCredential'
> = {
  type: 'FullNameCredential',
  key: fullNameKey,
  characteristics: {
    inputType: 'composite',
    label: 'Full Name',
    defaultOrder: [firstNameKey, middleNameKey, lastNameKey],
  },
  children: {
    firstName,
    lastName,
    middleName,
  },
  zodSchema: z.object({
    firstName: firstSchema,
    lastName: lastSchema,
    middleName: middleSchema,
  }),
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    fullName: CompositeFieldDefinition<
      typeof fullNameKey,
      'FullNameCredential'
    >;
    firstName: TextFieldDefinition<typeof firstNameKey, 'FirstNameCredential'>;
    lastName: TextFieldDefinition<typeof lastNameKey, 'LastNameCredential'>;
    middleName: TextFieldDefinition<
      typeof middleNameKey,
      'MiddleNameCredential'
    >;
  }
}
