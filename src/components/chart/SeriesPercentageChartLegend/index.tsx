import { type ReactElement, useCallback, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { type LegendProps } from 'recharts';
import { AnimatePresence } from 'framer-motion';

import { usePrevious, useCopyToClipboard } from '../../../hooks';
import { MotionStack, Counter } from '../../animation';
import { useSnackbar } from '../../Snackbar';

type CustomPayload = {
  uuid: string;
  value: string;
  color: string;
  dataKey: string;
  payload: {
    latestData?: Record<string, number>;
    uuid?: string;
    integrationType?: string;
  };
};

function EntryBlock({
  entry,
  showUuid = true,
}: Readonly<{
  entry: CustomPayload;
  showUuid?: boolean;
}>): ReactElement {
  const getEntryPercentage = useCallback(
    (entry: CustomPayload): number => {
      const latestData = entry.payload.latestData;
      return latestData && entry.dataKey ? latestData[entry.dataKey] ?? 0 : 0;
    },
    [],
  );

  const entryPercentage = useMemo(() => getEntryPercentage(entry), [entry, getEntryPercentage]);
  const previousEntryPercentage = usePrevious(entryPercentage);

  const mapValue = useCallback((value: number) => value.toFixed(1), []);

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
        <Typography component='p' variant='caption'>
          <Stack component='span' direction='row' display='inline-flex'>
            <Counter
              from={previousEntryPercentage ?? 0}
              to={entryPercentage}
              map={mapValue}
            >
              0
            </Counter>
            %
          </Stack>
        </Typography>
        <Typography variant='body1'>{entry.value}</Typography>
        {entry.payload.integrationType && (
          <Typography variant='body2'>
            {entry.payload.integrationType}
          </Typography>
        )}
        {showUuid && entry.payload.uuid && (
          <Typography
            variant='body2'
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => {
              if (entry.payload.uuid) {
                copyToClipboard.copy(entry.payload.uuid).catch(() => undefined);
                snackbar.enqueueSnackbar('UUID copied to clipboard', 'success');
              }
            }}
          >
            {entry.payload.uuid.slice(0, 5)}...
          </Typography>
        )}
      </Stack>
    </MotionStack>
  );
}

interface SeriesPercentageChartLegendProps extends Omit<LegendProps, 'payload'> {
  showUuid?: boolean;
  payload?: CustomPayload[];
}

export function SeriesPercentageChartLegend(props: SeriesPercentageChartLegendProps): ReactElement {
  const { payload } = props;

  console.log(props);

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
          <Grid2 key={`item-${(entry.payload as any).uuid}-${entry.value}`}>
            <EntryBlock
              entry={entry}
              showUuid={props.showUuid}
            />
          </Grid2>
        ))}
      </AnimatePresence>
    </Grid2>
  );
}
