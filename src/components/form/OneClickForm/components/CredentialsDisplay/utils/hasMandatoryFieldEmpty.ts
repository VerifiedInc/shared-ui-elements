import { CredentialFieldSet } from '../types';

import {
  extractChildrenFromCredentialFieldSet,
  isRequiredCredentialDisplayInfo,
} from '../utils';

/**
 * Checks if there is a invalid field.
 *
 * @param fieldSet The field set to check.
 * @param path The path to the current field in the form.
 * @returns True if there is a invalid field, false otherwise.
 */
export function hasMandatoryFieldEmpty(
  fieldSet: CredentialFieldSet,
  path?: string,
): boolean {
  const children = extractChildrenFromCredentialFieldSet(fieldSet);
  const childEntries = Object.entries(children);

  if (!childEntries.length) {
    const isMandatory = isRequiredCredentialDisplayInfo(
      fieldSet.credentialDisplayInfo.credentialRequest,
    );

    // Check if field is mandatory and empty
    const isEmpty = isMandatory && !fieldSet.value;

    return isEmpty;
  }

  return childEntries.some(([key, childFieldSet]) => {
    const childPath = path ? `${path}.${key}` : key;
    return hasMandatoryFieldEmpty(childFieldSet, childPath);
  });
}
