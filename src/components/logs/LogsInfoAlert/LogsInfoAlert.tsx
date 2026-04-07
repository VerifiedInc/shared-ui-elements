import type { ReactNode } from 'react';
import { Alert } from '@mui/material';
import type { AlertProps } from '@mui/material';

interface LogsInfoAlertProps extends Pick<AlertProps, 'sx'> {
  /** URL to the errors documentation page. Shown in the default message. */
  docsUrl?: string;
  /** Override the entire alert content. */
  children?: ReactNode;
}

export function LogsInfoAlert({ docsUrl, children, sx }: LogsInfoAlertProps) {
  return (
    <Alert severity='info' sx={sx}>
      {children ?? (
        <>
          Note that some Verified error codes are expected and don't indicate
          anything wrong with your integration.
          {docsUrl && (
            <>
              {' '}
              For details, see{' '}
              <a href={docsUrl} target='_blank' rel='noreferrer'>
                Errors
              </a>
              .
            </>
          )}
        </>
      )}
    </Alert>
  );
}
