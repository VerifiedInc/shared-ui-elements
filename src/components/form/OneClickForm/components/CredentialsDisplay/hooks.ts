import { useMemo } from 'react';

import { useCredentialsDisplayItem } from './CredentialsDisplayItemContext';

/**
 * Hook to get validity for the given credential.
 */
export function useCredentialsDisplayItemValid() {
  const { objectController, credentialDisplayInfo } =
    useCredentialsDisplayItem();
  const { isTouched, error } = objectController.fieldState;
  // console.log(objectController.field.value, isTouched, error);

  // Check validation against the credential value and the pattern.
  const isValid = useMemo(() => {
    if (!isTouched && !error) return true;
    return !error;
  }, [isTouched, error]);

  const errorMessage = useMemo(() => {
    if (isValid) return '';
    if (error) {
      return error.message;
    }
    return `${credentialDisplayInfo.label} is not valid`;
  }, [isValid, error, credentialDisplayInfo.label]);

  return {
    isValid,
    errorMessage,
  };
}
