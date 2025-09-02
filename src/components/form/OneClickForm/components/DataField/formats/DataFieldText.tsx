import { ReactElement } from 'react';
import { Stack } from '@mui/material';

import { formatCredentialValue } from '../../../utils/formatCredentialValue';

import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabel, DataFieldValue } from '../';

import { DataFieldDescription } from '../DataFieldDescription';
import { MandatoryEnum } from '../../CredentialsDisplay/types';

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
  const isOptional =
    credentialDisplayInfo.credentialRequest.mandatory === MandatoryEnum.NO;

  return (
    <div style={{ width: '100%' }}>
      <Stack direction='row' width='100%'>
        <DataFieldLabel />
        <Stack direction='column'>
          <DataFieldValue>
            {formattedValue || isOptional ? '-' : undefined}
          </DataFieldValue>
          <DataFieldDescription />
        </Stack>
      </Stack>
    </div>
  );
}
