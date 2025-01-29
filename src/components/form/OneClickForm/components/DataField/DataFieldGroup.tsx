import { PropsWithChildren } from 'react';
import { Box, SxProps } from '@mui/material';

type DataFieldGroupProps = PropsWithChildren & {
  sx?: SxProps;
};

/**
 * Component used to group the other data field elements, should not use other than this.
 * @param children
 * @param sx
 * @constructor
 */
export function DataFieldGroup({ children, sx }: DataFieldGroupProps) {
  return (
    <Box mb={3.5} ml={1.75} sx={sx}>
      {children}
    </Box>
  );
}
