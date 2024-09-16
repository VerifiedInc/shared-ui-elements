import { type PropsWithChildren } from 'react';
import { Box } from '@mui/material';

export function RequiredLabel(props: Readonly<PropsWithChildren>) {
  return (
    <span>
      {props.children}
      <Box component='span' color='error.main' sx={{ ml: 0.5 }}>
        *
      </Box>
    </span>
  );
}
