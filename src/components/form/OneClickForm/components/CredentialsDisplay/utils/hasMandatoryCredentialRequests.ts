import { CredentialFieldSet } from '../types';

import {
  extractChildrenFromCredentialFieldSet,
  isRequiredCredentialDisplayInfo,
} from '../utils';

export function hasMandatoryCredentialRequests(
  fieldSet: CredentialFieldSet,
): boolean {
  const children = extractChildrenFromCredentialFieldSet(fieldSet);
  const childEntries = Object.entries(children);
  if (!childEntries.length) {
    return isRequiredCredentialDisplayInfo(
      fieldSet.credentialDisplayInfo.credentialRequest,
    );
  }
  return childEntries.some(([_, childFieldSet]) =>
    hasMandatoryCredentialRequests(childFieldSet),
  );
}
