import MUITextField, {
  TextFieldProps as MUITextFieldProps,
} from '@mui/material/TextField';

export type TextFieldProps = MUITextFieldProps;

export function TextField(props: TextFieldProps) {
  return <MUITextField {...props} />;
}
