import MUITypography from '@mui/material/Typography';
import type { TypographyProps as MUITypographyProps } from '@mui/material/Typography';

export type TypographyProps = MUITypographyProps;

export function Typography(props: TypographyProps): JSX.Element {
  return <MUITypography {...props} />;
}
