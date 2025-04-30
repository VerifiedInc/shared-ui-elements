import {
  Chip,
  Radio,
  RadioProps,
  Stack,
  type SxProps,
  Typography,
  Box,
} from '@mui/material';

import { useCallback } from 'react';
import { green } from '../../styles';

type RadioOptionProps = RadioProps & {
  isDefault?: boolean;
  title: string;
  description?: string;
  sx?: SxProps;
};
export function RadioOption(props: RadioOptionProps) {
  const {
    isDefault,
    title,
    description,
    sx,
    onChange,
    checked,
    disabled,
    ...radioProps
  } = props;

  const handleCheck = useCallback(() => {
    if (disabled) return;
    if (onChange && !checked) {
      // Create a synthetic event object similar to what Radio would produce
      const syntheticEvent = {
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent, true);
    }
  }, [onChange, checked]);

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1, ...(sx as SxProps) }}
    >
      <Stack sx={{ alignItems: 'flex-start' }}>
        <Stack direction='row' spacing={1}>
          <Radio
            checked={checked}
            onChange={handleCheck}
            {...radioProps}
            sx={{
              mt: '1px',
              width: 34,
              height: 34,
              '&.Mui-checked': {
                color: green,
              },
            }}
          />
          <Stack onClick={handleCheck} sx={{ cursor: 'pointer' }}>
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
