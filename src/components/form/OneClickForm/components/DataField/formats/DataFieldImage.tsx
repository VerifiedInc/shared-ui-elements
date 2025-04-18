import { ReactElement } from 'react';
import { Stack } from '@mui/material';

import { useOneClickFormOptions } from '../../../contexts/one-click-form-options.context';

import { ImageEncoded } from '../../shared/ImageEncoded';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabel } from '..';

/**
 * This component is responsible to render the credential of type Image.
 * @constructor
 */
export function DataFieldImage(): ReactElement {
  const oneClickFormOptions = useOneClickFormOptions();
  const { credentialDisplayInfo } = useCredentialsDisplayItem();

  return (
    <Stack direction='row' width='100%'>
      <DataFieldLabel />
      <Stack direction='column' sx={{ flex: 1, maxWidth: 100 }}>
        <ImageEncoded
          servicePath={
            oneClickFormOptions.options.servicePaths.credentialImagePath
          }
          src={credentialDisplayInfo.value}
          alt={credentialDisplayInfo.label}
        />
      </Stack>
    </Stack>
  );
}
