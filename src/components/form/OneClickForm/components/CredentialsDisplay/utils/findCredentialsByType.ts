import { CredentialDisplayInfo } from '../types';

/**
 * Find credentials by type.
 * @param types
 * @param credentialDisplayInfo
 * @returns
 */
export function findCredentialsByType(
  types: string[],
  credentialDisplayInfo: CredentialDisplayInfo,
): Record<string, CredentialDisplayInfo | undefined> {
  return types
    .map((type) => {
      if (!Array.isArray(credentialDisplayInfo.children)) {
        throw new Error(
          `${credentialDisplayInfo.credentialRequest?.type} is not an array`,
        );
      }

      const credential = credentialDisplayInfo.children.find(
        (credential) => credential.credentialRequest?.type === type,
      );

      if (!credential) return {};

      return {
        [credential.credentialRequest?.type as string]: credential,
      };
    })
    .reduce((acc, credential) => {
      if (credential) {
        return {
          ...acc,
          ...credential,
        };
      }
      return acc;
    }, {});
}
