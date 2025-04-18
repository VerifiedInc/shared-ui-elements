import { CredentialFieldSet } from '../types';

import { extractChildrenFromCredentialFieldSet } from './extractChildrenFromCredentialFieldSet';

/**
 * Recursively checks if any child in the credential field set has allowUserInput set to true
 * in its credentialDisplayInfo.credentialRequest property.
 */
export function isSomeFieldInputAllowed(fieldSet: CredentialFieldSet): boolean {
  const hasEditableChild = (fieldSet: CredentialFieldSet): boolean => {
    if (fieldSet.type === 'PhoneCredential') return false;

    // Check if current field is editable
    if (fieldSet.credentialDisplayInfo?.credentialRequest?.allowUserInput) {
      return true;
    }

    // Extract all children from the field set
    const children = extractChildrenFromCredentialFieldSet(fieldSet);

    // Recursively check each child
    return Object.values(children).some((child) => hasEditableChild(child));
  };

  // Return true if any child has allowUserInput=true, false otherwise
  return hasEditableChild(fieldSet);
}
