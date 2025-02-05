import * as zod from 'zod';

import { OneClickFormOptions } from '../../../contexts/one-click-form-options.context';
import { stringUtils } from '../../../utils/string';

import { CredentialDisplayInfo } from '../types';
import { isValidInputCredential } from './isValidInputCredential';

/**
 * Transforms the display info list into a form schema.
 * @param displayInfoList
 */
export function transformToFormSchema(
  displayInfoList: CredentialDisplayInfo[],
  oneClickFormOptions: OneClickFormOptions,
): zod.ZodObject<any> {
  const formObject: Record<string, zod.ZodTypeAny> = {};

  for (const item of displayInfoList) {
    const marshalKey = stringUtils.camelCase(
      item.credentialRequest.type.split('Credential').join(''),
    );
    const propertyKey = Object.keys(item.schema.properties ?? {})[0];
    const key = propertyKey ?? marshalKey;

    if (Array.isArray(item.children)) {
      // Recursively reduce the children to a single object
      formObject[key] = zod.object(
        item.children.reduce<Record<string, zod.ZodTypeAny>>(
          (acc, child) => {
            return {
              ...acc,
              ...transformToFormSchema([child], oneClickFormOptions).shape,
            };
          },
          {
            id: zod.string(),
            value: zod.string(),
            type: zod.string(),
            credentialDisplayInfo: zod.any(),
          },
        ),
      );
    } else {
      formObject[key] = zod
        .object({
          id: zod.string(),
          value: zod.string(),
          type: zod.string(),
          credentialDisplayInfo: zod.any(),
        })
        .superRefine((data, ctx) => {
          if (data.credentialDisplayInfo.uiState?.isChecked) {
            if (data.value === '') {
              ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: `${data.credentialDisplayInfo.label} is empty`,
              });
            } else {
              // Check validation against the credential value and the pattern.
              const schemaProperty = Object.values(
                data.credentialDisplayInfo.schema.properties,
              )[0];

              const isValid = isValidInputCredential(
                data.value,
                schemaProperty,
                data.credentialDisplayInfo,
                {
                  phoneCredentialWhitelist:
                    oneClickFormOptions.features.phoneCredentialWhitelist,
                  phoneCredentialRegexWhitelist:
                    oneClickFormOptions.features.phoneCredentialRegexWhitelist,
                },
              );

              if (!isValid) {
                ctx.addIssue({
                  code: zod.ZodIssueCode.custom,
                  message: `${data.credentialDisplayInfo.label} is invalid`,
                });
              }
            }
          }
        });
    }
  }

  return zod.object(formObject);
}
