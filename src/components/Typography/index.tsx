import MUITypography, {
  TypographyProps as MUITypographyProps,
} from '@mui/material/Typography';

export type TypographyProps = MUITypographyProps;

export function Typography(props: TypographyProps) {
  return <MUITypography {...props} />;
}
