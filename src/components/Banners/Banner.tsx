import {
  AlertTitle,
  Box,
  type SxProps,
  useTheme,
  type AlertColor,
} from '@mui/material';

import { type ReactNode } from 'react';
import { FullWidthAlert } from '../Alert/FullWidthAlert';
import { Typography } from '../Typography';

interface BannerProps {
  title: string;
  severity: AlertColor;
  children: ReactNode;
  sx?: SxProps;
}

export function Banner({
  title,
  severity,
  children,
  sx,
}: BannerProps): React.JSX.Element {
  const theme = useTheme();
  return (
    <Box sx={{ mt: 3, ...sx }}>
      <FullWidthAlert severity={severity} sx={{ alignItems: 'start' }}>
        <AlertTitle>
          <Typography
            sx={{ color: theme.palette.info.contrastText }}
            fontWeight='bold'
          >
            {title}
          </Typography>
        </AlertTitle>
        {children}
      </FullWidthAlert>
    </Box>
  );
}
