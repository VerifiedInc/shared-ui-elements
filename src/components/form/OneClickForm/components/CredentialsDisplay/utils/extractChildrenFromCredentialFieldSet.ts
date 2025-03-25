import { CredentialFieldSet } from '../types';

/**
 * Extracts all nested children credential field sets from a CredentialFieldSet object.
 *
 * @param {CredentialFieldSet} credentialFieldSet - The credential field set to extract children from.
 * @returns {Record<string, CredentialFieldSet>} An object containing only the nested credential field sets,
 *          where keys are the property names and values are the corresponding CredentialFieldSet objects.
 */
export function extractChildrenFromCredentialFieldSet(
  credentialFieldSet: CredentialFieldSet,
): Record<string, CredentialFieldSet> {
  // Destructure the input object to separate base properties from nested child fields
  const { id, value, type, credentialDisplayInfo, ...children } =
    credentialFieldSet;

  // Return only the nested child credential field sets
  return children;
}
