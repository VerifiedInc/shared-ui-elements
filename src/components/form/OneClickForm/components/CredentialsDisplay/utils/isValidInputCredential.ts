import { credentialTypes } from '../../../constants';
import { InputFormatEnum } from '../../../types/input-format';
import { when } from '../../../utils/when';

import {
  defaultTextSchema,
  emailSchema,
  phoneSchema,
  SSNSchema,
  timestampSchema,
} from '../../validations/fragments/credentials';
import {
  minimumAge18Schema,
  minimumDate1900Schema,
} from '../../validations/fragments/birthDate';

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
): { success: boolean; error?: string } | undefined => {
  const { phoneCredentialWhitelist, phoneCredentialRegexWhitelist } =
    options ?? {};

  // Do need to validate composite credentials values since it will be empty.
  if (Array.isArray(credentialDisplayInfo.children)) return { success: true };

  const stringValue = String(value);

  // Do check by the pattern of schema.
  if (schemaProperty?.input?.pattern) {
    return {
      success: new RegExp(schemaProperty.input.pattern).test(stringValue),
    };
  }

  return when(schemaProperty?.input?.type, {
    // Do check validator for Date type.
    [InputFormatEnum.Date]: () => {
      // Check if the value is a valid timestamp.
      const isTimestampValid = timestampSchema.safeParse(stringValue).success;
      if (!isTimestampValid) {
        return {
          success: false,
          error: '',
        };
      }

      // Check minimum date (1900)
      const minDateResult = minimumDate1900Schema.safeParse(stringValue);
      if (!minDateResult.success) {
        return {
          success: false,
          error: '',
        };
      }

      if (
        credentialDisplayInfo.credentialRequest.type ===
        credentialTypes.BirthDateCredential
      ) {
        // Then check age requirement (18+)
        const ageResult = minimumAge18Schema.safeParse(stringValue);
        if (!ageResult.success) {
          return {
            success: false,
            error: ageResult.error?.errors[0].message,
          };
        }
      }

      return {
        success: true,
      };
    },
    // Do check validator for Email type.
    [InputFormatEnum.Email]: () => ({
      success: emailSchema.safeParse(stringValue).success,
    }),
    // Do check validator for Phone type.
    [InputFormatEnum.Phone]: () => {
      if (phoneCredentialRegexWhitelist) {
        const match = new RegExp(phoneCredentialRegexWhitelist).test(
          stringValue,
        );

        if (match) {
          return {
            success: true,
          };
        }
      }
      if (Array.isArray(phoneCredentialWhitelist)) {
        const match = phoneCredentialWhitelist.some((identifier) => {
          return identifier === stringValue;
        });
        // If the phone number is in the whitelist, return true.
        if (match) {
          return {
            success: true,
          };
        }
      }
      // Otherwise, use the default schema parse.
      return {
        success: phoneSchema.safeParse(stringValue).success,
      };
    },
    // Do check with default pattern for SSN type.
    [InputFormatEnum.SSN]: () => {
      // Indicates the default value comes from server and was redacted.
      if (stringValue.includes('•••-••-')) {
        return { success: true };
      }

      // Touched values contains raw numbers, so validates with schema.
      return {
        success: SSNSchema.safeParse(stringValue).success,
      };
    },
    // Do check if field is empty
    else: () => ({
      success: defaultTextSchema.safeParse(stringValue).success,
    }),
  });
};
