import _ from 'lodash';

import { CredentialDisplayInfo } from '../types';
import { getCredentialValues } from './getCredentialValues';

/**
 * Filter out repeated credentials by looking at the credential's values,
 * when a composite it extracts each of child values in a O(n^n) and compare with the others from the list.
 * @param credentialDisplayInfoList
 */
export function filterRepeatedCredentials(
  credentialDisplayInfoList: CredentialDisplayInfo[],
) {
  return _.uniqWith(
    credentialDisplayInfoList,
    function iterateUniqWith(
      leftCredentialDisplayInfo,
      rightCredentialDisplayInfo,
    ) {
      // Extract all the values a credential may have when atomic/composite and put in a list.
      const leftValues = getCredentialValues(leftCredentialDisplayInfo);
      const rightValues = getCredentialValues(rightCredentialDisplayInfo);
      // Compare the given list of the credentials from left and right.
      const isEqual = _.isEqual(leftValues, rightValues);
      // Compare the type of the credentials from left and right.
      const isSameType =
        leftCredentialDisplayInfo.credentialRequest?.type ===
        rightCredentialDisplayInfo.credentialRequest?.type;

      return isSameType && isEqual;
    },
  );
}
