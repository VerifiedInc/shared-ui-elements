import { Typography } from '@mui/material';

import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

export function DataFieldDescription() {
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  return (
    <Typography
      variant='body1'
      color='text.secondary'
      sx={{
        fontSize: 12,
        fontWeight: 400,
        wordBreak: 'break-word',
        mt: 0.5,
        mr: 1.75,
        textAlign: 'left',
      }}
    >
      {credentialDisplayInfo.credentialRequest?.description}
    </Typography>
  );
}
