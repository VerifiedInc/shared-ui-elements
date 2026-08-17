import { type ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

interface DataFieldChannelGroupProps {
  children: ReactNode;
  description: string;
}

/**
 * Indents the settings that only take effect on one request channel. The controls stay
 * editable for every brand, the rule and the leading note only say where the value lands.
 */
export function DataFieldChannelGroup(
  props: Readonly<DataFieldChannelGroupProps>,
): React.JSX.Element {
  const { children, description } = props;

  return (
    <Stack
      spacing={2}
      sx={{
        ml: '2px',
        pl: 1.75,
        borderLeft: '2px solid',
        borderColor: 'rgba(0, 0, 0, 0.14)',
      }}
      data-testid='dialog-data-field-channel-group'
    >
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{
          textAlign: 'left !important',
          fontSize: '12px',
          fontWeight: '400',
        }}
      >
        {description}
      </Typography>
      {children}
    </Stack>
  );
}
