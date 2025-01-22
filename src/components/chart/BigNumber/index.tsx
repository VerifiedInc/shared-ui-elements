import { type ReactElement } from 'react';
import { Paper, Stack, Typography, type SxProps } from '@mui/material';

import { useCounter, usePrevious } from '../../../hooks';

interface BigNumberProps {
  label: string;
  initialValue: number;
  value: number;
  map?: (value: number) => string;
  sx?: SxProps;
}

/**
 * Component that animates a number from one value to another.
 */
export function BigNumber(props: BigNumberProps): ReactElement {
  const previousValue = usePrevious(props.value);
  const { ref: counterRef } = useCounter({
    from: previousValue ?? 0,
    to: props.value,
    duration: 1,
    map: props.map,
  });

  return (
    <Paper sx={{ p: 3, flex: 1, ...props.sx }}>
      <Stack spacing={1} alignItems='center'>
        <Typography ref={counterRef} variant='h4' fontWeight='bold'>
          {props.initialValue}
        </Typography>
        <Typography color='text.secondary'>{props.label}</Typography>
      </Stack>
    </Paper>
  );
}
