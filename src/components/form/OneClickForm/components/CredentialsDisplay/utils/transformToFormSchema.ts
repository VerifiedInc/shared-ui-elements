import * as zod from 'zod';

import { OneClickFormOptions } from '../../../contexts/one-click-form-options.context';

import { CredentialFieldSet } from '../types';
import { isValidInputCredential } from './isValidInputCredential';
import { findCorrectSchemaProperty } from './findCorrectSchemaProperty';
import { extractChildrenFromCredentialFieldSet } from './extractChildrenFromCredentialFieldSet';

type Options = {
  schema: any;
};

type Context = {
  parentFieldSet?: CredentialFieldSet;
};

/**
 * Transforms the display info list into a form schema.
 * @param displayInfoList
 */
export function transformToFormSchema(
  fieldSet: CredentialFieldSet,
  options: Options,
  oneClickFormOptions: OneClickFormOptions,
  context?: Context,
): zod.ZodObject<any> {
  const formObject: Record<string, zod.ZodTypeAny> = {};
  const child = extractChildrenFromCredentialFieldSet(fieldSet);

  for (const [key, item] of Object.entries(child)) {
    const itemChild = extractChildrenFromCredentialFieldSet(item);
    const childOnlyEntries = Object.entries(itemChild);

    if (childOnlyEntries.length > 0) {
      // Recursively reduce the children to a single object
      formObject[key] = zod.object(
        childOnlyEntries.reduce<Record<string, zod.ZodTypeAny>>(
          (acc, [childKey, childValue]) => {
            const childFieldSet = { [childKey]: childValue };
            return {
              ...acc,
              ...transformToFormSchema(
                childFieldSet as CredentialFieldSet,
                options,
                oneClickFormOptions,
                {
                  parentFieldSet: item,
                },
              ).shape,
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
              const schemaProperty = findCorrectSchemaProperty(
                data.credentialDisplayInfo.schema,
                options.schema,
                context?.parentFieldSet ? context.parentFieldSet : undefined,
              );

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
