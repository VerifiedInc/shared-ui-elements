import { ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';

import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

import { getCredentialLabel } from './utils';

export function DataFieldLabel(): ReactElement {
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  const label = getCredentialLabel(
    credentialDisplayInfo.label,
    credentialDisplayInfo.credentialRequest.type,
  );
  return (
    <Stack
      sx={{
        alignItems: 'flex-start',
        width: 100,
        flexShrink: 0,
        mt: 0.7,
      }}
    >
      <Typography
        component='span'
        variant={'subtitle2'}
        textTransform='uppercase'
        color='text.primary'
        sx={{
          position: 'relative',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}
