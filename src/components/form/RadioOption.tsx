import {
  Chip,
  Radio,
  RadioProps,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';

import { Box } from '@mui/system';
import { green } from '../../styles';

type RadioOptionProps = RadioProps & {
  isDefault?: boolean;
  title: string;
  description?: string;
  sx?: SxProps;
};
export function RadioOption(props: RadioOptionProps) {
  const { isDefault, title, description, sx, ...radioProps } = props;
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
                color: green,
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
            variant='outlined'
            color='success'
            sx={{ fontFamily: 'Lato' }}
          />
        )}
      </Box>
    </Stack>
  );
}
