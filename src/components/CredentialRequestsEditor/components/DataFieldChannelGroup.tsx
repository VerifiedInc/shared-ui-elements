import { type ReactNode } from 'react';
import { Divider, Stack, Typography } from '@mui/material';

interface DataFieldChannelGroupProps {
  children: ReactNode;
  title: string;
  description?: string;
}

/**
 * Groups the settings that only take effect on one request channel. The
 * controls stay editable for every brand - this just says where they land.
 */
export function DataFieldChannelGroup(
  props: Readonly<DataFieldChannelGroupProps>,
): React.JSX.Element {
  const { children, title, description } = props;

  return (
    <Stack spacing={2}>
      <Stack>
        <Divider textAlign='left' sx={{ '&::before': { width: 0 } }}>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
            data-testid='custom-demo-dialog-data-field-channel-group-title'
          >
            {title}
          </Typography>
        </Divider>
        {description && (
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mt: 0.5,
              textAlign: 'left !important',
              fontSize: '12px',
              fontWeight: '400',
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>
      {children}
    </Stack>
  );
}
