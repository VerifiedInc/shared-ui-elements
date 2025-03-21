import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { OverridableStringUnion } from '@mui/types';
import { Variant } from '@mui/material/styles/createTypography';
import { Typography, SxProps } from '@mui/material';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';

type DataFieldLabelInputProps = PropsWithChildren & {
  label?: ReactNode;
  variant?: OverridableStringUnion<
    'inherit' | Variant,
    TypographyPropsVariantOverrides
  >;
  sx?: SxProps;
};

/**
 * Component to display a credential label.
 * @param variant
 * @param label
 * @param sx
 * @constructor
 */
export function DataFieldInputLabel({
  variant,
  label,
  sx,
}: DataFieldLabelInputProps): ReactElement {
  return (
    <Typography
      component='span'
      variant={variant ?? 'subtitle2'}
      textTransform='uppercase'
      color='text.secondary'
      sx={{
        position: 'relative',
        fontSize: 12,
        letterSpacing: 1,
        left: '2.4px',
        ...sx,
      }}
    >
      {label}
    </Typography>
  );
}
