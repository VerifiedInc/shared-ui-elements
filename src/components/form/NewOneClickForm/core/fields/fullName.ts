import { z } from 'zod';

import type { TextFieldDefinition, CompositeFieldDefinition } from './types';

const firstNameSchema = z.string();
const lastNameSchema = z.string();
const middleNameSchema = z.string();

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
  zodSchema: firstNameSchema,
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
  zodSchema: lastNameSchema,
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
  zodSchema: middleNameSchema,
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
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    middleName: middleNameSchema,
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
