import { type ReactNode } from 'react';
import { Stack, SxProps, Typography } from '@mui/material';

import { Alert } from '../../Alert';
import { Tip } from '../../Tip';

interface DataFieldSectionProps {
  children: ReactNode;
  title: string;
  description?: string;
  // Explains a channel-specific caveat that the backend enforces per request, so the
  // control stays editable while the user learns when the value actually applies.
  admonition?: ReactNode;
  tip?: ReactNode;
  sx?: SxProps;
}

export function DataFieldSection(
  props: DataFieldSectionProps,
): React.JSX.Element {
  const { children, title, description, admonition, tip, sx } = props;

  return (
    <Stack sx={sx}>
      <Stack direction='row' alignItems='center' spacing={0.5}>
        <Typography
          variant='body1'
          sx={{ fontSize: '16px', fontWeight: '700' }}
          data-testid='custom-demo-dialog-data-field-title'
        >
          {title}
        </Typography>
        <Tip>{tip}</Tip>
      </Stack>
      {description && (
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            textAlign: 'left !important',
            fontSize: '12px',
            fontWeight: '400',
          }}
          data-testid='custom-demo-dialog-data-field-description'
        >
          {description}
        </Typography>
      )}
      {admonition && (
        <Alert
          severity='info'
          variant='outlined'
          sx={{ mt: 1, py: 0, fontSize: '12px' }}
          data-testid='custom-demo-dialog-data-field-admonition'
        >
          {admonition}
        </Alert>
      )}
      <Stack sx={{ mt: 3 }}>{children}</Stack>
    </Stack>
  );
}
