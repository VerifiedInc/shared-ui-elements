import { type ReactElement, useCallback, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { type LegendProps } from 'recharts';
import { Decimal } from 'decimal.js';
import { AnimatePresence } from 'framer-motion';

import { usePrevious, useCopyToClipboard } from '../../../hooks';

import { MotionStack, Counter } from '../../animation';
import { useSnackbar } from '../../Snackbar';

function EntryBlock({
  entry,
  payload,
}: Readonly<{ entry: any; payload: any }>): ReactElement {
  const getEntryTotal = useCallback((entry: any): number => {
    return entry.payload?.data?.reduce?.(
      (acc: number, curr: any) => acc + curr.value,
      0,
    );
  }, []);

  const getEntryTotalPercentage = useCallback(
    (entry: any): number | string => {
      const entryTotal = new Decimal(getEntryTotal(entry) || 0);
      const total =
        payload?.reduce((acc: number, entry: any) => {
          return acc + getEntryTotal(entry);
        }, 0) || 0;
      const totalDecimal = new Decimal(total);
      const totalPercentage = Number(
        // Round down to prevent overshooting 100%
        entryTotal.div(totalDecimal).times(100).toFixed(2, Decimal.ROUND_DOWN),
      );
      if (isNaN(totalPercentage) || !isFinite(totalPercentage)) return 0;
      return totalPercentage;
    },
    [getEntryTotal, payload],
  );

  const entryTotal = useMemo(
    () => getEntryTotal(entry),
    [entry, getEntryTotal],
  );
  const previousEntryTotal = usePrevious(entryTotal);

  const entryTotalPercentage = useMemo(
    () => Number(getEntryTotalPercentage(entry)),
    [entry, getEntryTotalPercentage],
  );
  const previousEntryTotalPercentage = usePrevious(entryTotalPercentage);

  const mapValue = useCallback(
    (value: number) => Math.floor(value).toLocaleString(),
    [],
  );

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
          <Stack component='span' display='inline-flex' mr={0.5}>
            <Counter
              from={previousEntryTotal ?? 0}
              to={entryTotal}
              map={mapValue}
            >
              0
            </Counter>
          </Stack>
          <Stack component='span' direction='row' display='inline-flex'>
            (
            <Counter
              from={previousEntryTotalPercentage ?? 0}
              to={entryTotalPercentage}
              map={mapValue}
            >
              0
            </Counter>
            %)
          </Stack>
        </Typography>
        <Typography variant='body1'>{entry.value}</Typography>
        {entry.payload.uuid && (
          <Typography
            variant='body2'
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => {
              // Safe to ignore
              copyToClipboard.copy(entry.payload.uuid).catch(() => undefined);
              snackbar.enqueueSnackbar('UUID copied to clipboard', 'success');
            }}
          >
            {entry.payload.uuid.slice(0, 5)}...
          </Typography>
        )}
      </Stack>
    </MotionStack>
  );
}

export function SeriesChartLegend(props: LegendProps): ReactElement {
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
          <Grid2>
            <EntryBlock
              key={`item-${entry.value}`}
              entry={entry}
              payload={payload}
            />
          </Grid2>
        ))}
      </AnimatePresence>
    </Grid2>
  );
}
