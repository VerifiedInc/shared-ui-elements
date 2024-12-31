import { type PropsWithChildren } from 'react';
import { Box } from '@mui/material';

import { useCounter } from '../../hooks/useCounter';

type CounterProps = PropsWithChildren & {
  from: number;
  to: number;
  map?: (value: number) => string;
};

export function Counter({
  children,
  from,
  to,
  map,
}: CounterProps): React.ReactElement {
  const { ref } = useCounter({ from, to, map });

  return (
    <Box ref={ref} component='span'>
      {children}
    </Box>
  );
}
