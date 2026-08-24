import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { formatSlope } from '../trend';
import type { MetricsIntervalType } from '../../../constants/metrics';

export interface TrendReadout {
  /** Series label the fit belongs to. */
  name: string;
  color?: string;
  /** Change per interval bucket, already in display units. */
  slope: number;
  stepMs: number;
}

interface PayloadEntry {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
}

interface ConversionChartTooltipProps {
  /** Keys of the fitted columns, excluded from the value rows. */
  trendDataKeys: string[];
  /** One entry per fitted series; empty when the trend is off. */
  trends: TrendReadout[];
  interval?: MetricsIntervalType;
  unit: 'count' | 'percent';
  sortByValueDesc: boolean;
  valueFormatter: (
    value: number | string,
    name: string | number,
    entry: PayloadEntry,
  ) => string;
  labelFormatter: (label: number) => string;
  /** Injected by Recharts. */
  active?: boolean;
  payload?: PayloadEntry[];
  label?: number;
}

const rowSx = { fontSize: '0.875rem', lineHeight: 1.5 } as const;

/**
 * Tooltip for the funnel charts. Mirrors the stock Recharts layout so nothing
 * shifts visually, then adds one slope row per fitted stage underneath.
 */
export function ConversionChartTooltip({
  trendDataKeys,
  trends,
  interval,
  unit,
  sortByValueDesc,
  valueFormatter,
  labelFormatter,
  active,
  payload,
  label,
}: Readonly<ConversionChartTooltipProps>): React.ReactNode {
  if (!active || !payload?.length) return null;

  const rows = payload.filter(
    (entry) =>
      entry.dataKey != null && !trendDataKeys.includes(String(entry.dataKey)),
  );

  const ordered = sortByValueDesc
    ? [...rows].sort((a, b) => Number(b.value ?? 0) - Number(a.value ?? 0))
    : rows;

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        boxShadow: 3,
        px: 1.5,
        py: 1.25,
        maxWidth: 360,
      }}
    >
      <Typography sx={{ ...rowSx, fontWeight: 700, mb: 0.5 }}>
        {labelFormatter(Number(label))}
      </Typography>
      {ordered.map((entry) => (
        <Typography
          key={String(entry.dataKey)}
          sx={{ ...rowSx, color: entry.color ?? 'inherit' }}
        >
          {String(entry.name ?? entry.dataKey)} :{' '}
          {valueFormatter(entry.value ?? 0, entry.name ?? '', entry)}
        </Typography>
      ))}
      {trends.length > 0 && (
        <Box
          sx={{
            mt: 0.75,
            pt: 0.75,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {trends.map((trend) => (
            <Stack
              key={trend.name}
              direction='row'
              spacing={2}
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography sx={{ ...rowSx, fontWeight: 700 }}>
                {trends.length > 1 ? `Trend (${trend.name})` : 'Trend'}
              </Typography>
              <Typography sx={{ ...rowSx, fontWeight: 700 }}>
                {formatSlope(trend.slope, {
                  unit,
                  interval,
                  stepMs: trend.stepMs,
                })}
              </Typography>
            </Stack>
          ))}
        </Box>
      )}
    </Box>
  );
}
