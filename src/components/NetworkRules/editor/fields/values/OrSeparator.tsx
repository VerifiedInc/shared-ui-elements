import { Typography } from '@mui/material';

/**
 * Sits between the chips of a multi-value condition so the inclusive OR between
 * them is spelled out rather than implied.
 */
export function OrSeparator() {
  return (
    <Typography
      component='span'
      variant='body2'
      color='text.primary'
      sx={{ alignSelf: 'center', mx: 0.5 }}
    >
      OR
    </Typography>
  );
}
