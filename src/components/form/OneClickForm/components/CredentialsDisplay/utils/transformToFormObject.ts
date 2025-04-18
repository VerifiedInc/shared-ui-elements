import { stringUtils } from '../../../utils/string';
import { when } from '../../../utils/when';

import { CredentialDisplayInfo, CredentialFieldSet } from '../types';

/**
 * Get the proper property key for the given key, type and isParent.
 * This should NOT have every keys just to fix the discrepancy ones that may have
 * due to the computed way that extracts the key might have and parent/child having same credential type name.
 * @param key The key to use.
 * @param type The type of the credential.
 * @param isParent Whether the credential is a parent.
 * @returns The property key.
 */
const getPropertyKey = (key: string, type: string, isParent: boolean) => {
  return when(type, {
    GovernmentIdDocumentImageCredential: () => 'documentImage',
    else: () => key,
  }) as unknown as string;
};

/**
 * Transforms the display info list into a form object.
 * @param displayInfoList
 */
export function transformToFormObject(
  displayInfoList: CredentialDisplayInfo[],
): any {
  const formObject: CredentialFieldSet = {} as any;
  for (const item of displayInfoList) {
    const type = item.credentialRequest.type;
    const marshalKey = stringUtils.camelCase(type.split('Credential').join(''));
    const propertyKey = Object.keys(item.schema.properties ?? {})[0];
    const key = getPropertyKey(
      propertyKey ?? marshalKey,
      type,
      Array.isArray(item.children),
    );

    if (Array.isArray(item.children)) {
      // Recursively reduce the children to a single object
      formObject[key] = item.children.reduce(
        (acc, child) => {
          return {
            ...acc,
            ...transformToFormObject([child]),
          };
        },
        {
          id: item.id,
          value: item.value,
          type: item.credentialRequest.type,
          credentialDisplayInfo: item,
        },
      ) as any;
    } else {
      formObject[key] = {
        id: item.id,
        value: item.value,
        type: item.credentialRequest.type,
        credentialDisplayInfo: item,
      } as any;
    }
  }
  return formObject;
}
