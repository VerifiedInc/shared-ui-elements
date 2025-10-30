import _ from 'lodash';
import { CredentialRequests } from '../types/form';
import { MandatoryEnum } from '../types/mandatoryEnum';

import { fields } from '../../form/NewOneClickForm/core/fields';

/**
 * Converts a field key to a Credential type name
 * Example: 'fullName' -> 'FullNameCredential'
 */
function toCredentialType(fieldKey: string): string {
  return _.upperFirst(_.camelCase(fromCredentialType(fieldKey))) + 'Credential';
}

function fromCredentialType(credentialType: string): string {
  const withoutSuffix = credentialType.replace('Credential', '');
  return _.lowerFirst(_.camelCase(withoutSuffix));
}

/**
 * Recursively builds a CredentialRequests object from a field key
 * @param fieldKey - The key of the field to build (e.g., 'fullName', 'address')
 * @returns A CredentialRequests object with nested children if applicable
 */
export function buildDataFieldValue(fieldKey: string): CredentialRequests {
  const key = fromCredentialType(fieldKey);
  const type = toCredentialType(fieldKey);
  const field = fields[key as keyof typeof fields];

  if (!field) {
    // If field doesn't exist, return a simple credential request
    return {
      type: fieldKey,
      mandatory: MandatoryEnum.NO,
      description: '',
      allowUserInput: true,
      multi: false,
    };
  }

  // Check if field has children (composite field)
  if ('children' in field && field.children) {
    const childrenObj = field.children as Record<string, any>;
    const children = Object.keys(childrenObj)
      .map((childKey) => buildDataFieldValue(childKey))
      .filter((child): child is CredentialRequests => child !== null);

    return {
      type,
      mandatory: MandatoryEnum.NO,
      description: '',
      allowUserInput: true,
      multi: false,
      children,
    };
  }

  // Simple field without children
  return {
    type,
    mandatory: MandatoryEnum.NO,
    description: '',
    allowUserInput: true,
    multi: false,
  };
}
