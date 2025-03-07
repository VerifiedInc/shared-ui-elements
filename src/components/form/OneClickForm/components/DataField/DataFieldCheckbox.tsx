import { Checkbox } from '@mui/material';

import { useOneClickFormOptions } from '../../contexts/one-click-form-options.context';

import { isRequiredCredentialDisplayInfo } from '../CredentialsDisplay/utils';
import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';
import { ReactElement } from 'react';

/**
 * This component renders and manages the check for atomic and composite level,
 * when composite, it controls the children also by selecting/deselecting them.
 * @constructor
 */
export function DataFieldCheckbox(): ReactElement | null {
  const {
    options: {
      features: { selectableCredentials },
    },
  } = useOneClickFormOptions();

  const {
    credentialDisplayInfo,
    isChecked,
    isAllChecked,
    handleSelectCredential,
  } = useCredentialsDisplayItem();

  const isRequired = isRequiredCredentialDisplayInfo({
    mandatory: credentialDisplayInfo.credentialRequest?.mandatory,
  });

  // Do not render checkbox when selectableCredentials is disabled
  if (!selectableCredentials) {
    return null;
  }

  return (
    <Checkbox
      sx={{ mr: 1 }}
      checked={isChecked}
      indeterminate={isChecked && !isAllChecked}
      onChange={() => handleSelectCredential(!isChecked)}
      disabled={isRequired}
      inputProps={{
        tabIndex: -1,
      }}
    />
  );
}
