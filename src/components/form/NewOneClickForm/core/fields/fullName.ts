import {
  firstSchema,
  fullNameSchema,
  lastSchema,
  middleSchema,
} from '../validations';

import type {
  TextFieldDefinition,
  CompositeFieldDefinition,
  ExtractedFieldValueType,
} from './types';

const fullNameKey = 'fullName';
const firstNameKey = 'firstName';
const lastNameKey = 'lastName';
const middleNameKey = 'middleName';

export const firstName = {
  key: firstNameKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'First Name',
    placeholder: 'John',
  },
  zodSchema: firstSchema,
};

export const lastName = {
  key: lastNameKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'Last Name',
    placeholder: 'Doe',
  },
  zodSchema: lastSchema,
};

export const middleName = {
  key: middleNameKey,
  characteristics: {
    inputType: 'text' as const,
    label: 'Middle Name',
    placeholder: 'William',
  },
  zodSchema: middleSchema,
};

export const fullName = {
  key: fullNameKey,
  characteristics: {
    inputType: 'composite' as const,
    label: 'Full Name',
    defaultOrder: [firstNameKey, middleNameKey, lastNameKey] as const,
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

  interface FieldValueDefinitions {
    fullName: ExtractedFieldValueType<typeof fullName>;
  }
}
