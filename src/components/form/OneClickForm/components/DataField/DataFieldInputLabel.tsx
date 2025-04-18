import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Typography, SxProps } from '@mui/material';

import { useCredentialsDisplayItemValid } from '../CredentialsDisplay/hooks';

type DataFieldLabelInputProps = PropsWithChildren & {
  label?: ReactNode;
  sx?: SxProps;
};

/**
 * Component to display a credential label.
 * @param label
 * @param sx
 * @constructor
 */
export function DataFieldInputLabel({
  label,
  sx,
}: DataFieldLabelInputProps): ReactElement {
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <Typography
      component='span'
      color={itemValid.isValid ? 'primary' : 'error'}
      sx={{
        position: 'relative',
        transform: 'translateX(-14px) scale(0.75)',
        fontSize: 16,
        zIndex: 1,
        cursor: 'default',
        lineHeight: '23px',
        textOverflow: 'ellipsis',
        userSelect: 'none',
        whiteSpace: 'collapse',
        backgroundColor: 'background',
        alignSelf: 'flex-start',
        ...sx,
      }}
    >
      {label}
    </Typography>
  );
}
