import { Close } from '@mui/icons-material';
import {
  Alert,
  type AlertColor,
  Box,
  IconButton,
  type SxProps,
} from '@mui/material';
import {
  closeSnackbar,
  type CustomContentProps,
  enqueueSnackbar as _enqueueSnackbar,
  SnackbarContent,
  type SnackbarKey,
  SnackbarProvider,
} from 'notistack';
import { forwardRef } from 'react';
import { When } from '../When';

declare module 'notistack' {
  interface VariantOverrides {
    default: false;
    success: false;
    info: false;
    warning: false;
    error: false;
    customAlertComponent: {
      onAction?: (id: SnackbarKey) => void;
      icon?: JSX.Element;
      severity?: AlertColor;
    };
  }
}

export { SnackbarProvider };
export type { SnackbarKey };

interface AlertAction {
  onAction?: (id: SnackbarKey) => void;
  icon?: JSX.Element;
}

interface CustomAlertComponentProps extends Partial<CustomContentProps> {
  severity: AlertColor;
  alertAction?: AlertAction;
  showCloseIcon?: boolean;
  sx?: SxProps;
}

/**
 * Hook to manage snackbar messages
 * It wraps the enqueueSnackbar and closeSnackbar functions from the notistack library
 * @returns
 *  - enqueueSnackbar: Function to enqueue a snackbar message
 *  - closeSnackbar: Function to close one or all snackbar messages
 *  @see https://notistack.com/api-reference
 */
export function useSnackbar(): {
  enqueueSnackbar: (
    message: string,
    severity?: AlertColor,
    options?: Omit<CustomAlertComponentProps, 'severity'>,
  ) => void;
  closeSnackbar: (key?: SnackbarKey) => void;
} {
  const enqueueSnackbar = (
    message: string,
    severity: AlertColor = 'success',
    options?: Omit<CustomAlertComponentProps, 'severity'>,
  ): void => {
    _enqueueSnackbar(message, {
      severity,
      variant: 'customAlertComponent',
      persist: true,
      ...options,
    });
  };

  return { enqueueSnackbar, closeSnackbar };
}

/**
 * Custom Alert component to show snackbar messages
 * This is a wrapper around the notistack SnackbarContent component
 *
 * Use it in the SnackbarProvider Components prop:
 * @see https://notistack.com/features/customization#custom-component
 * @example
 * <SnackbarProvider
 *   Components={{ customAlertComponent: CustomAlertComponent }}
 * />
 */
export const CustomAlertComponent = forwardRef<
  HTMLDivElement,
  CustomAlertComponentProps
>(
  (
    {
      id,
      message,
      severity,
      alertAction,
      sx,
      showCloseIcon = true,

      // remove these props because they were triggering warnings. They are not used in this component anyway
      persist,
      hideIconVariant,
      autoHideDuration,
      anchorOrigin,
      iconVariant,

      ...props
    },
    ref,
  ) => {
    return (
      <SnackbarContent ref={ref} {...props}>
        <Alert
          severity={severity}
          action={
            <Box ml={1}>
              <When value={alertAction}>
                <IconButton
                  size='small'
                  onClick={() => id && alertAction?.onAction?.(id)}
                  color='inherit'
                >
                  {alertAction?.icon}
                </IconButton>
              </When>
              <When value={!alertAction && showCloseIcon}>
                <IconButton
                  size='small'
                  onClick={() => {
                    closeSnackbar(id);
                  }}
                  color='inherit'
                >
                  <Close />
                </IconButton>
              </When>
            </Box>
          }
          sx={{
            alignItems: 'center',
            width: '320px',
            ...sx,
          }}
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  },
);
