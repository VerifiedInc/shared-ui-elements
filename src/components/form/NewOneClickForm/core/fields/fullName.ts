import { z } from 'zod';
import type { TextFieldDefinition, CompositeFieldDefinition } from './types';

const firstNameSchema = z.string();
const lastNameSchema = z.string();
const middleNameSchema = z.string();

export const firstName: TextFieldDefinition<
  'firstName',
  'FirstNameCredential'
> = {
  type: 'FirstNameCredential',
  key: 'firstName',
  characteristics: {
    inputType: 'text',
    label: 'First Name',
    placeholder: 'John',
  },
  zodSchema: firstNameSchema,
};

export const lastName: TextFieldDefinition<'lastName', 'LastNameCredential'> = {
  type: 'LastNameCredential',
  key: 'lastName',
  characteristics: {
    inputType: 'text',
    label: 'Last Name',
    placeholder: 'Doe',
  },
  zodSchema: lastNameSchema,
};

export const middleName: TextFieldDefinition<
  'middleName',
  'MiddleNameCredential'
> = {
  type: 'MiddleNameCredential',
  key: 'middleName',
  characteristics: {
    inputType: 'text',
    label: 'Middle Name',
    placeholder: 'William',
  },
  zodSchema: middleNameSchema,
};

export const fullName: CompositeFieldDefinition<
  'fullName',
  'FullNameCredential'
> = {
  type: 'FullNameCredential',
  key: 'fullName',
  characteristics: {
    inputType: 'composite',
    label: 'Full Name',
  },
  children: {
    firstName,
    lastName,
    middleName,
  },
  zodSchema: z
    .object({
      firstName: firstNameSchema.optional(),
      lastName: lastNameSchema.optional(),
      middleName: middleNameSchema.optional(),
    })
    .optional(),
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    fullName: CompositeFieldDefinition<'fullName', 'FullNameCredential'>;
    firstName: TextFieldDefinition<'firstName', 'FirstNameCredential'>;
    lastName: TextFieldDefinition<'lastName', 'LastNameCredential'>;
    middleName: TextFieldDefinition<'middleName', 'MiddleNameCredential'>;
  }
}
