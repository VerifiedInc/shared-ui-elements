import { Box, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { AnimatePresence } from 'framer-motion';
import { type ReactElement } from 'react';
import { type LegendProps } from 'recharts';

import { useCopyToClipboard } from '../../../hooks';
import { MotionStack } from '../../animation';
import { useSnackbar } from '../../Snackbar';

type CustomPayload = {
  uuid: string;
  value: string;
  color: string;
  dataKey: string;
  integrationType?: string;
};

function EntryBlock({
  entry,
  showUuid = true,
}: Readonly<{
  entry: CustomPayload;
  showUuid?: boolean;
}>): ReactElement {
  const copyToClipboard = useCopyToClipboard({ type: 'text/plain' });
  const snackbar = useSnackbar();

  return (
    <MotionStack
      component='li'
      direction='row'
      spacing={1}
      sx={{
        color: entry.color,
      }}
      layout='position'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        sx={{
          width: '3px',
          height: '100%',
          backgroundColor: entry.color,
          borderRadius: 3,
        }}
      />
      <Stack>
        <Typography variant='body1'>{entry.value}</Typography>
        {entry.integrationType && (
          <Typography variant='body2'>{entry.integrationType}</Typography>
        )}
        {showUuid && entry.uuid && (
          <Typography
            variant='body2'
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => {
              if (entry.uuid) {
                copyToClipboard.copy(entry.uuid).catch(() => undefined);
                snackbar.enqueueSnackbar('UUID copied to clipboard', 'success');
              }
            }}
          >
            {entry.uuid.slice(0, 5)}...
          </Typography>
        )}
      </Stack>
    </MotionStack>
  );
}

interface SeriesPercentageChartLegendProps
  extends Omit<LegendProps, 'payload'> {
  showUuid?: boolean;
  payload?: CustomPayload[];
}

export function SeriesPercentageChartLegend(
  props: SeriesPercentageChartLegendProps,
): ReactElement {
  const { payload } = props;

  return (
    <Grid2
      container
      direction='row'
      component='ul'
      gap={2}
      sx={{
        mt: 2,
        justifyContent: 'flex-start',
        alignItem: 'center',
        flexWrap: 'wrap',
      }}
    >
      <AnimatePresence>
        {payload?.map((entry) => (
          <Grid2 key={`item-${entry.uuid}-${entry.value}`}>
            <EntryBlock entry={entry} showUuid={props.showUuid} />
          </Grid2>
        ))}
      </AnimatePresence>
    </Grid2>
  );
}
