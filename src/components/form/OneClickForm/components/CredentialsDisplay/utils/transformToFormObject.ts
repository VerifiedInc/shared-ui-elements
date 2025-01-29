import { stringUtils } from '../../../utils/string';
import { CredentialDisplayInfo, CredentialFieldSet } from '../types';

/**
 * Transforms the display info list into a form object.
 * @param displayInfoList
 */
export function transformToFormObject(
  displayInfoList: CredentialDisplayInfo[],
): any {
  const formObject: CredentialFieldSet = {} as any;
  for (const item of displayInfoList) {
    const key = stringUtils.camelCase(
      item.credentialRequest.type.split('Credential').join(''),
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
          credentialDisplayInfo: item,
        },
      ) as any;
    } else {
      formObject[key] = {
        id: item.id,
        value: item.value,
        credentialDisplayInfo: item,
      } as any;
    }
  }
  return formObject;
}
