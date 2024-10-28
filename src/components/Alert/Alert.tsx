import MUIAlert from '@mui/material/Alert';
import type { AlertProps as MUIAlertProps } from '@mui/material/Alert';

export type AlertProps = MUIAlertProps;

export function Alert(props: AlertProps): React.JSX.Element {
  return <MUIAlert {...props} />;
}
