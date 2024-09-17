import type { ReactNode } from 'react';
import {
  Chip,
  Radio,
  type RadioProps,
  Stack,
  type SxProps,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import { Tip } from '../../Tip';

type RadioOptionProps = RadioProps & {
  isDefault?: boolean;
  title: string;
  description?: string;
  tip?: ReactNode;
  sx?: SxProps;
};
export function RadioOption(props: RadioOptionProps): React.JSX.Element {
  const { isDefault, title, description, tip, sx, ...radioProps } = props;
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1, ...sx }}
    >
      <Stack sx={{ alignItems: 'flex-start' }}>
        <Stack direction='row' spacing={1}>
          <Radio
            {...radioProps}
            sx={{
              mt: '1px',
              width: 34,
              height: 34,
              ...radioProps.sx,
              '&.Mui-checked': {
                color: '#0dbc3d',
              },
            }}
          />
          <Stack>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography
                variant='body1'
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  textAlign: 'left !important',
                }}
              >
                {title}
              </Typography>
              <Tip>{tip}</Tip>
            </Stack>
            {description && (
              <Typography
                variant='body2'
                color='text.disabled'
                sx={{
                  textAlign: 'left !important',
                  alignSelf: 'flex-start',
                  fontSize: '12px',
                  fontWeight: '400',
                  mt: 0.5,
                }}
              >
                {description}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ mt: 1, alignSelf: 'flex-start' }}>
        {isDefault && (
          <Chip
            size='small'
            label='Default'
            color='info'
            variant='outlined'
            sx={{ fontFamily: 'Lato', fontWeight: 700 }}
          />
        )}
      </Box>
    </Stack>
  );
}
