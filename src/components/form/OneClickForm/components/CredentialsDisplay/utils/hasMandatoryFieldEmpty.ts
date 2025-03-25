import { CredentialFieldSet } from '../types';

import {
  extractChildrenFromCredentialFieldSet,
  isRequiredCredentialDisplayInfo,
} from '../utils';

/**
 * Checks if there is a mandatory field that is empty.
 *
 * @param fieldSet The field set to check.
 * @returns True if there is a mandatory field that is empty, false otherwise.
 */
export function hasMandatoryFieldEmpty(fieldSet: CredentialFieldSet): boolean {
  const children = extractChildrenFromCredentialFieldSet(fieldSet);
  const childEntries = Object.entries(children);
  if (!childEntries.length) {
    const isMandatory = isRequiredCredentialDisplayInfo(
      fieldSet.credentialDisplayInfo.credentialRequest,
    );
    return isMandatory && !fieldSet.value;
  }
  return childEntries.some(([_, childFieldSet]) =>
    hasMandatoryFieldEmpty(childFieldSet),
  );
}
