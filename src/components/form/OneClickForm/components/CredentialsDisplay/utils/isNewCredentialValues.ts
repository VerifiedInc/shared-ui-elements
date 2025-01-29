import { CredentialDisplayInfo } from '../types';
import { getCredentialValues } from '../utils/getCredentialValues';

/**
 * Returns true if all the values in the credential display info are empty.
 * @param credentialDisplayInfo
 */
export function isNewCredentialValues(
  credentialDisplayInfo: CredentialDisplayInfo,
) {
  const values = getCredentialValues(credentialDisplayInfo);
  return values.every((value) => !value);
}
