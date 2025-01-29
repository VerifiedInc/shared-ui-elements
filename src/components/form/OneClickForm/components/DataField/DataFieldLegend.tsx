import { PropsWithChildren } from 'react';
import { FormHelperText, SxProps } from '@mui/material';

type DataFieldLegendProps = PropsWithChildren & {
  sx?: SxProps;
  error?: boolean;
};

/**
 * Component to display a credential legend.
 * @param children
 * @param sx
 * @constructor
 */
export function DataFieldLegend({
  children,
  sx,
  ...props
}: DataFieldLegendProps) {
  return (
    <FormHelperText {...props} sx={{ mt: 1, ...sx }}>
      {children}
    </FormHelperText>
  );
}
