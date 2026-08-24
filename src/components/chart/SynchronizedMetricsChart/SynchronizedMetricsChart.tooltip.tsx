import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { formatExtendedDate } from '../../../utils/date';
import { formatSlope } from '../trend';
import type { MetricsIntervalType } from '../../../constants/metrics';

/**
 * Brand rows rendered before the remainder is collapsed into a count. Sized so
 * the tallest column stays within a sub-chart's height.
 */
export const TOOLTIP_BRAND_CAP = 24;

/** Row counts above which the rows wrap into an extra column. */
const ONE_COLUMN_MAX = 8;
const TWO_COLUMN_MAX = 16;

function columnCount(rows: number): number {
  if (rows <= ONE_COLUMN_MAX) return 1;
  if (rows <= TWO_COLUMN_MAX) return 2;
  return 3;
}

interface PayloadEntry {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
}

interface TooltipRow {
  key: string;
  name: string;
  color: string;
  value: number | string;
}

interface SynchronizedChartTooltipProps {
  timezone: string;
  totalDataKey: string;
  /** Excluded from the ranked rows; reported as a slope instead. */
  trendDataKey: string;
  /** Change per interval bucket. Undefined when the trend is off. */
  trendSlope?: number;
  /** Measured bucket spacing, used to name the interval if it isn't given. */
  trendStepMs?: number;
  trendInterval?: MetricsIntervalType;
  trendUnit: 'count' | 'percent';
  valueFormatter: (value: number | string) => string;
  /** Injected by Recharts. */
  active?: boolean;
  payload?: PayloadEntry[];
  label?: number | string;
}

const rowTextSx = { fontSize: '0.8125rem', lineHeight: 1.4 } as const;

function Row({
  row,
  bold,
  valueFormatter,
}: Readonly<{
  row: TooltipRow;
  bold?: boolean;
  valueFormatter: (value: number | string) => string;
}>): React.ReactNode {
  return (
    <Stack
      direction='row'
      spacing={1.5}
      sx={{
        minWidth: 0,
        alignItems: 'baseline',
        justifyContent: 'space-between',
        color: row.color,
      }}
    >
      <Typography
        component='span'
        sx={{
          ...rowTextSx,
          fontWeight: bold ? 700 : 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {row.name}
      </Typography>
      <Typography
        component='span'
        sx={{ ...rowTextSx, fontWeight: 700, flexShrink: 0 }}
      >
        {valueFormatter(row.value ?? 0)}
      </Typography>
    </Stack>
  );
}

/**
 * Tooltip for a synchronized sub-chart. Ranks brands by their value at the
 * hovered point, lays them out in columns and caps the list, so a chart with
 * every brand selected stays readable inside its own height instead of running
 * over the charts below it.
 */
export function SynchronizedChartTooltip({
  timezone,
  totalDataKey,
  trendDataKey,
  trendSlope,
  trendStepMs,
  trendInterval,
  trendUnit,
  valueFormatter,
  active,
  payload,
  label,
}: Readonly<SynchronizedChartTooltipProps>): React.ReactNode {
  if (!active || !payload?.length) return null;

  const rows: TooltipRow[] = payload
    .filter((entry) => entry.dataKey != null && entry.dataKey !== trendDataKey)
    .map((entry) => ({
      key: String(entry.dataKey),
      name: String(entry.name ?? entry.dataKey),
      color: entry.color ?? 'inherit',
      value: entry.value ?? 0,
    }))
    .sort((a, b) => Number(b.value) - Number(a.value));

  // Total is a summary of the rest, so it's pinned rather than ranked among it.
  const totalRow = rows.find((row) => row.key === totalDataKey);
  const brandRows = rows.filter((row) => row.key !== totalDataKey);
  const shown = brandRows.slice(0, TOOLTIP_BRAND_CAP);
  const hidden = brandRows.length - shown.length;

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        boxShadow: 3,
        px: 1.25,
        py: 1,
        maxWidth: 560,
      }}
    >
      <Typography
        sx={{
          fontSize: '0.8125rem',
          lineHeight: 1.4,
          fontWeight: 700,
          mb: 0.5,
        }}
      >
        {formatExtendedDate(label ?? 0, { timeZone: timezone, hour12: false })}
      </Typography>
      {totalRow && (
        <Box
          sx={{
            pb: 0.5,
            mb: 0.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Row row={totalRow} bold valueFormatter={valueFormatter} />
        </Box>
      )}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columnCount(shown.length)}, minmax(0, 1fr))`,
          columnGap: 2,
        }}
      >
        {shown.map((row) => (
          <Row key={row.key} row={row} valueFormatter={valueFormatter} />
        ))}
      </Box>
      {hidden > 0 && (
        <Typography
          sx={{
            fontSize: '0.75rem',
            lineHeight: 1.4,
            color: 'text.secondary',
            mt: 0.5,
          }}
        >
          + {hidden} more
        </Typography>
      )}
      {trendSlope !== undefined && (
        <Stack
          direction='row'
          spacing={2}
          sx={{
            mt: 0.75,
            pt: 0.75,
            borderTop: '1px solid',
            borderColor: 'divider',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ ...rowTextSx, fontWeight: 700 }}>Trend</Typography>
          <Typography sx={{ ...rowTextSx, fontWeight: 700 }}>
            {formatSlope(trendSlope, {
              unit: trendUnit,
              interval: trendInterval,
              stepMs: trendStepMs,
            })}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
