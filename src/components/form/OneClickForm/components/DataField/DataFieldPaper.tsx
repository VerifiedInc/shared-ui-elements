import { PropsWithChildren } from 'react';
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
export function DataFieldPaper({ children, sx }: DataFieldPaperProps) {
  return (
    <Paper
      variant='elevation'
      elevation={0}
      sx={{
        py: 1,
        borderRadius: 0,
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: 'primary.main',
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}
