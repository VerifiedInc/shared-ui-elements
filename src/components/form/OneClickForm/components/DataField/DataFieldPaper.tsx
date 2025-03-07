import { PropsWithChildren, ReactElement } from 'react';
import { Paper, SxProps } from '@mui/material';

type DataFieldPaperProps = PropsWithChildren & {
  sx?: SxProps;
};

/**
 * Component used to wrap data field types.
 * @param children
 * @param sx
 * @constructor
 */
export function DataFieldPaper({
  children,
  sx,
}: DataFieldPaperProps): ReactElement {
  return (
    <Paper
      variant='elevation'
      elevation={0}
      sx={{
        py: 1,
        borderRadius: 0,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}
