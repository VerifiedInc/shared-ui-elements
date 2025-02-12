import { Typography } from '@mui/material';
import { formatExtendedDate } from '../form/OneClickForm/utils/date';

export function MetricLastUpdated({
  lastUpdated,
}: Readonly<{ lastUpdated?: number }>): JSX.Element {
  return (
    <Typography variant='caption' color='text.secondary' fontWeight='600'>
      The data was last updated on{' '}
      {formatExtendedDate(lastUpdated ?? Date.now(), {
        hour12: false,
      })}
      .
    </Typography>
  );
}
