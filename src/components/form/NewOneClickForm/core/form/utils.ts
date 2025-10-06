import { fields } from '../fields';

/**
 * Normalizes a credential type string to its corresponding field key.
 * @param credentialType - The credential type (e.g., "FullNameCredential")
 * @returns The normalized field key (e.g., "fullName")
 */
export function normalizeCredentialType(
  credentialType: string,
): keyof typeof fields {
  const fieldKey = credentialType.replace(/Credential$/, '');
  const requestType = (fieldKey.charAt(0).toLowerCase() +
    fieldKey.slice(1)) as keyof typeof fields;
  return requestType;
}
