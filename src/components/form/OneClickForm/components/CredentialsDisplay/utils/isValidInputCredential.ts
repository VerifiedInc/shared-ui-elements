import { InputFormatEnum } from '../../../types/input-format';
import { when } from '../../../utils/when';

import {
  defaultTextSchema,
  emailSchema,
  phoneSchema,
  SSNSchema,
  timestampSchema,
} from '../../validations/fragments/credentials';

import { CredentialDisplayInfo } from '../types';

type Options = {
  phoneCredentialWhitelist?: string[];
  phoneCredentialRegexWhitelist?: string;
};

/**
 * Checks the validity of the credential based on the schema input pattern.
 */
export const isValidInputCredential = (
  value: string,
  schemaProperty: any | undefined,
  credentialDisplayInfo: CredentialDisplayInfo,
  options?: Options,
): boolean | undefined => {
  const { phoneCredentialWhitelist, phoneCredentialRegexWhitelist } =
    options ?? {};

  // Do need to validate composite credentials values since it will be empty.
  if (Array.isArray(credentialDisplayInfo.children)) return true;

  const stringValue = String(value);

  // Do check by the pattern of schema.
  if (schemaProperty?.input?.pattern) {
    return new RegExp(schemaProperty.input.pattern).test(stringValue);
  }

  return when(schemaProperty?.input?.type, {
    // Do check validator for Date type.
    [InputFormatEnum.Date]: () =>
      timestampSchema.safeParse(stringValue).success,
    // Do check validator for Email type.
    [InputFormatEnum.Email]: () => emailSchema.safeParse(stringValue).success,
    // Do check validator for Phone type.
    [InputFormatEnum.Phone]: () => {
      if (phoneCredentialRegexWhitelist) {
        const match = new RegExp(phoneCredentialRegexWhitelist).test(
          stringValue,
        );

        if (match) return match;
      }
      if (Array.isArray(phoneCredentialWhitelist)) {
        const match = phoneCredentialWhitelist.some((identifier) => {
          return identifier === stringValue;
        });
        // If the phone number is in the whitelist, return true.
        if (match) return match;
      }
      // Otherwise, use the default schema parse.
      return phoneSchema.safeParse(stringValue).success;
    },
    // Do check with default pattern for SSN type.
    [InputFormatEnum.SSN]: () => {
      // Indicates the default value comes from server and was redacted.
      if (stringValue.includes('•••-••-')) return true;

      // Touched values contains raw numbers, so validates with schema.
      return SSNSchema.safeParse(stringValue).success;
    },
    // Do check if field is empty
    else: () => defaultTextSchema.safeParse(stringValue).success,
  });
};
