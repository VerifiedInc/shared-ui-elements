import {
  firstSchema,
  fullNameSchema,
  lastSchema,
  middleSchema,
} from '../validations';

import type { TextFieldDefinition, CompositeFieldDefinition } from './types';

const fullNameKey = 'fullName';
const firstNameKey = 'firstName';
const lastNameKey = 'lastName';
const middleNameKey = 'middleName';

export const firstName: TextFieldDefinition<typeof firstNameKey> = {
  key: firstNameKey,
  characteristics: {
    inputType: 'text',
    label: 'First Name',
    placeholder: 'John',
  },
  zodSchema: firstSchema,
};

export const lastName: TextFieldDefinition<typeof lastNameKey> = {
  key: lastNameKey,
  characteristics: {
    inputType: 'text',
    label: 'Last Name',
    placeholder: 'Doe',
  },
  zodSchema: lastSchema,
};

export const middleName: TextFieldDefinition<typeof middleNameKey> = {
  key: middleNameKey,
  characteristics: {
    inputType: 'text',
    label: 'Middle Name',
    placeholder: 'William',
  },
  zodSchema: middleSchema,
};

export const fullName: CompositeFieldDefinition<typeof fullNameKey> = {
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
  zodSchema: fullNameSchema,
};

declare module '../declarations' {
  interface FieldSchemaDefinitions {
    fullName: CompositeFieldDefinition<typeof fullNameKey>;
    firstName: TextFieldDefinition<typeof firstNameKey>;
    lastName: TextFieldDefinition<typeof lastNameKey>;
    middleName: TextFieldDefinition<typeof middleNameKey>;
  }
}
