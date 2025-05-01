import { Box } from '@mui/material';
import React from 'react';

export const InvisibleWhen = ({
  value,
  children,
}: {
  value: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        visibility: value ? 'hidden' : 'visible',
        position: value ? 'absolute' : 'static',
        pointerEvents: value ? 'none' : 'auto',
      }}
    >
      {children}
    </Box>
  );
};
