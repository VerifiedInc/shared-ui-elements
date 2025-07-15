import { PropsWithChildren, ReactElement } from 'react';
import { SxProps, Typography } from '@mui/material';

type DataFieldValueProps = PropsWithChildren & {
  sx?: SxProps;
};

/**
 * Component to display a credential value of display type Text.
 * @param children
 * @param sx
 * @constructor
 */
export function DataFieldValue({
  children,
  sx,
}: DataFieldValueProps): ReactElement {
  return (
    <Typography
      variant='body1'
      sx={
        {
          ...sx,
          fontSize: 20,
          fontWeight: 300,
          wordBreak: 'break-word',
          textAlign: 'left',
        } as any
      }
    >
      {children}
    </Typography>
  );
}
