import { Alert, type AlertProps } from '@mui/material';

interface FullWidthAlertProps extends AlertProps {}

export function FullWidthAlert({
  children,
  sx,
  ...props
}: FullWidthAlertProps): React.JSX.Element {
  return (
    <>
      <Alert
        severity='info'
        sx={{
          maxWidth: '100%',
          width: '100%',
          textAlign: 'left',
          alignItems: 'center',
          ...sx,
        }}
        {...props}
      >
        {children}
      </Alert>
    </>
  );
}
