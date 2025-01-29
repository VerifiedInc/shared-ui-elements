import _ from 'lodash';

import { CredentialDisplayInfo } from '../types';
import { getCredentialValues } from '../utils/getCredentialValues';

/**
 * Checks if a `CredentialDisplayInfo` is a new credential instance.
 *
 * @param {CredentialDisplayInfo} credentialDisplayInfo - The `CredentialDisplayInfo` to check.
 * @returns {boolean} `true` if it's a new instance, `false` otherwise.
 * @throws {Error} Throws an error if `credentialDisplayInfo.originalInstance` is `null`.
 */
export function isNewCredentialAgainstInstance(
  credentialDisplayInfo: CredentialDisplayInfo,
): boolean {
  if (credentialDisplayInfo.originalInstance === null) {
    // If the original instance is null, it means that the credential is not new,
    // defaulted value credentials are defined with instances, selected instances are not to avoid max stack depth error.
    return false;
  }

  const currentValues = getCredentialValues(credentialDisplayInfo);
  const initialValues = getCredentialValues(
    credentialDisplayInfo.originalInstance,
  );

  return !_.isEqual(currentValues, initialValues);
}
