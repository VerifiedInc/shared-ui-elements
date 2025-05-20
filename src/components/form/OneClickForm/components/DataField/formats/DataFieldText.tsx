import { ReactElement } from 'react';
import { Stack } from '@mui/material';

import { formatCredentialValue } from '../../../utils/formatCredentialValue';

import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabel, DataFieldValue } from '../';

/**
 * This component renders and manages the input value for display format Text or to strings.
 * @constructor
 */
export function DataFieldText(): ReactElement {
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  const formattedValue = formatCredentialValue(
    credentialDisplayInfo.value,
    credentialDisplayInfo.displayFormat,
  );

  return (
    <div style={{ width: '100%' }}>
      <Stack direction='row' width='100%'>
        <DataFieldLabel />
        <DataFieldValue>{formattedValue}</DataFieldValue>
      </Stack>
    </div>
  );
}
