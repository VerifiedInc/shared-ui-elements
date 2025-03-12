import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

import { isRequiredCredentialDisplayInfo } from '../CredentialsDisplay/utils';
import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';
import { getCredentialLabelInput } from './utils/getCredentialLabelInput';

type DataFieldLabelTextProps = {
  prefix?: string;
  hideRequired?: boolean;
};

/**
 * Component to display a credential label text, when required it renders an asterisk.
 * @constructor
 */
export function DataFieldLabelText(
  props: DataFieldLabelTextProps,
): ReactElement {
  const { credentialDisplayInfo } = useCredentialsDisplayItem();
  const label = getCredentialLabelInput(
    credentialDisplayInfo.label,
    credentialDisplayInfo.credentialRequest.type,
  );

  if (
    isRequiredCredentialDisplayInfo({
      mandatory: credentialDisplayInfo.credentialRequest?.mandatory,
    })
  ) {
    return (
      <Box
        component='span'
        sx={{
          display: 'block',
          alignItems: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whitespace: 'pre',
        }}
      >
        {(props.prefix ?? '') + label}{' '}
        {!props.hideRequired && (
          <Typography
            data-asterisk
            component='span'
            color='error'
            variant='subtitle2'
            sx={{ fontSize: 'inherit' }}
          >
            ✽
          </Typography>
        )}
      </Box>
    );
  }

  return <>{(props.prefix ?? '') + label}</>;
}
