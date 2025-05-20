import { ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';

import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

import { getCredentialLabel } from './utils';

interface DataFieldLabelProps {
  id?: string;
}

export function DataFieldLabel({ id }: DataFieldLabelProps): ReactElement {
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  const label = getCredentialLabel(
    credentialDisplayInfo.label,
    credentialDisplayInfo.credentialRequest.type,
  );
  return (
    <Stack
      sx={{
        flexShrink: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 100,
        mt: 0.7,
      }}
    >
      <Typography
        component='label'
        variant={'subtitle2'}
        textTransform='uppercase'
        color='text.primary'
        id={id}
        sx={{
          position: 'relative',
          fontSize: 12,
          fontWeight: 700,
          textAlign: 'left',
          alignSelf: 'flex-start',
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}
