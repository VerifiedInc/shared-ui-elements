import { UseFormReturn } from 'react-hook-form';
import { CredentialFieldSet } from '../types';

import {
  extractChildrenFromCredentialFieldSet,
  isRequiredCredentialDisplayInfo,
} from '../utils';

/**
 * Checks if there is a invalid field.
 *
 * @param form The form instance to check field states.
 * @param fieldSet The field set to check.
 * @param path The path to the current field in the form.
 * @returns True if there is a invalid field, false otherwise.
 */
export function hasInvalidFieldEmpty(
  form: UseFormReturn,
  fieldSet: CredentialFieldSet,
  path?: string,
): boolean {
  const children = extractChildrenFromCredentialFieldSet(fieldSet);
  const childEntries = Object.entries(children);

  if (!childEntries.length) {
    const isMandatory = isRequiredCredentialDisplayInfo(
      fieldSet.credentialDisplayInfo.credentialRequest,
    );

    // Check if field is mandatory and empty, OR if field has validation errors
    const isEmpty = isMandatory && !fieldSet.value;
    const hasError = path ? form.getFieldState(path).error : false;

    return isEmpty || !!hasError;
  }

  return childEntries.some(([key, childFieldSet]) => {
    const childPath = path ? `${path}.${key}` : key;
    return hasInvalidFieldEmpty(form, childFieldSet, childPath);
  });
}
