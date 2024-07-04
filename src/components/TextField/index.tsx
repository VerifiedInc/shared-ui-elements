import MUITextField from '@mui/material/TextField';
import type { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

export type TextFieldProps = MUITextFieldProps;

export function TextField(props: TextFieldProps): JSX.Element {
  return <MUITextField {...props} />;
}
