import { when } from '../../../utils/when';

/**
 * Gets the credential label based on the type.
 * @param label The credential label
 * @param type The credential type
 * @returns The credential label
 */
export function getCredentialLabel(
  label: string | undefined,
  type: string,
): string | undefined {
  return when(type, {
    SsnCredential: () => 'SSN',
    else: () => label,
  });
}
