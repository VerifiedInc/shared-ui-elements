import MUIButton from '@mui/material/Button';
import type { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export type ButtonProps = MUIButtonProps;

export function Button(props: ButtonProps): React.JSX.Element {
  return <MUIButton {...props} />;
}
