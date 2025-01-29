import { CredentialDisplayInfo } from '../types';

/**
 * Retrieves credential values from a list of CredentialDisplayInfo objects.
 *
 * @param {CredentialDisplayInfo | CredentialDisplayInfo[]} credentialDisplayInfo - The list or object of CredentialDisplayInfo objects to extract values from.
 * @param {string[]} [initialValue] - An optional initial array of values to concatenate the extracted values to.
 * @returns {string[]} An array of extracted credential values.
 */
export function getCredentialValues(
  credentialDisplayInfo: CredentialDisplayInfo | CredentialDisplayInfo[],
  initialValue?: string[],
): string[] {
  const list = Array.isArray(credentialDisplayInfo)
    ? credentialDisplayInfo
    : [credentialDisplayInfo];
  return list.reduce((acc, credentialDisplayInfo) => {
    if (Array.isArray(credentialDisplayInfo.children)) {
      return [
        ...acc,
        ...getCredentialValues(credentialDisplayInfo.children, acc),
      ];
    }

    // Don't need to add empty values to the list.
    if (!credentialDisplayInfo.value.length) return acc;

    return [...acc, credentialDisplayInfo.value];
  }, initialValue || []);
}
