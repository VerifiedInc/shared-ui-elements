import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useCredentialsDisplayItem } from './CredentialsDisplayItemContext';

/**
 * Hook to get validity for the given credential.
 */
export function useCredentialsDisplayItemValid(): {
  isValid: boolean;
  isFormInvalid: boolean;
  errorMessage: string | undefined;
} {
  const form = useFormContext();
  const { isValid: isFormValid, errors: formErrors } = form.formState;

  const { objectController, credentialDisplayInfo } =
    useCredentialsDisplayItem();
  const { isTouched, error } = objectController.fieldState;

  const isFormInvalid = useMemo(
    () => !isFormValid || Object.keys(formErrors).length > 0,
    [isFormValid, formErrors],
  );

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
    isFormInvalid,
    errorMessage,
  };
}
