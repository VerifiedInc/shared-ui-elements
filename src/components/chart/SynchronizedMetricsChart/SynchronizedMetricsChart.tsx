import React, { useState, useCallback, useMemo } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import {
  AreaChart as RechartsAreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';
import { DEFAULT_TIMEZONE } from '../../form/TimezoneInput/timezones';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { SimpleLegend, type Payload } from '../SimpleLegend';
import {
  chartDefaultProps,
  xAxisDefaultProps,
  yAxisDefaultProps,
} from '../shared';
import type { SeriesChartData } from '../SeriesChart';
import type { SynchronizedMetricsChartProps } from './SynchronizedMetricsChart.types';

const SYNC_ID = 'synchronized-metrics';
const CHART_HEIGHT = 200;

/**
 * Merges per-brand SeriesChartData into a flat array for chart-level data.
 * Each entry: { date, [brand1.uuid]: value, [brand2.uuid]: value, ... }
 * This is required for Recharts syncId tooltip sync to work across charts.
 */
function mergeChartData(
  seriesData: SeriesChartData[],
): Array<Record<string, number>> {
  const dateMap = new Map<number, Record<string, number>>();

  for (const series of seriesData) {
    for (const point of series.chartData) {
      let entry = dateMap.get(point.date);
      if (!entry) {
        entry = { date: point.date };
        dateMap.set(point.date, entry);
      }
      entry[series.uuid] = point.value;
    }
  }

  return Array.from(dateMap.values()).sort((a, b) => a.date - b.date);
}

interface SubChartProps {
  title: string;
  mergedData: Array<Record<string, number>>;
  brands: SeriesChartData[];
  hiddenBrands: Set<string>;
  timezone: string;
  tooltipFormatter?: (value: number | string) => string;
  yAxisTickFormatter?: (value: number) => string;
  yAxisDomain?: [number | string, number | string];
}

function SubChart({
  title,
  mergedData,
  brands,
  hiddenBrands,
  timezone,
  tooltipFormatter,
  yAxisTickFormatter,
  yAxisDomain,
}: SubChartProps): React.ReactNode {
  const theme = useTheme();
  const visibleBrands = brands.filter((b) => !hiddenBrands.has(b.uuid));

  return (
    <Stack>
      <Typography variant='subtitle2' sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <ResponsiveContainer width='100%' height={CHART_HEIGHT}>
        <RechartsAreaChart
          data={mergedData}
          syncId={SYNC_ID}
          margin={chartDefaultProps.margin}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='date'
            tickFormatter={(value) =>
              formatDateMMYY(value, {
                timeZone: timezone,
                hour12: false,
                hour: 'numeric',
              })
            }
            {...xAxisDefaultProps}
          />
          <YAxis
            tickFormatter={
              yAxisTickFormatter ?? ((value) => Number(value).toLocaleString())
            }
            allowDecimals={false}
            domain={yAxisDomain}
            {...yAxisDefaultProps}
          />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            formatter={
              tooltipFormatter ??
              ((value: number | string) => Number(value).toLocaleString())
            }
            labelFormatter={(value) =>
              formatExtendedDate(value, {
                timeZone: timezone,
                hour12: false,
              })
            }
            itemSorter={(item) => -Number(item?.value ?? 0)}
          />
          {visibleBrands.map((brand) => (
            <Area
              key={brand.uuid}
              dataKey={brand.uuid}
              name={brand.name}
              stroke={brand.color}
              fill={brand.color}
              fillOpacity={0.1}
              type='monotone'
              strokeWidth={2}
              isAnimationActive={false}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Stack>
  );
}

export function SynchronizedMetricsChart({
  startedData,
  succeededData,
  percentageData,
  isLoading,
  isSuccess,
  isFetching,
  filter,
  sx,
}: Readonly<SynchronizedMetricsChartProps>): React.ReactNode {
  const [hiddenBrands, setHiddenBrands] = useState<Set<string>>(new Set());
  const timezone = filter.timezone ?? DEFAULT_TIMEZONE;

  const noData =
    !startedData.length && !succeededData.length && !percentageData.length;

  const mergedStarted = useMemo(
    () => mergeChartData(startedData),
    [startedData],
  );
  const mergedSucceeded = useMemo(
    () => mergeChartData(succeededData),
    [succeededData],
  );
  const mergedPercentage = useMemo(
    () => mergeChartData(percentageData),
    [percentageData],
  );

  const totalBrands = startedData.length;

  const handleToggle = useCallback(
    (payload: Payload) => {
      setHiddenBrands((prev) => {
        const isCurrentlyHidden = prev.has(payload.name);

        // Prevent hiding the last visible brand
        if (!isCurrentlyHidden && totalBrands - prev.size <= 1) {
          return prev;
        }

        const next = new Set(prev);
        if (isCurrentlyHidden) {
          next.delete(payload.name);
        } else {
          next.add(payload.name);
        }
        return next;
      });
    },
    [totalBrands],
  );

  const legendPayload = startedData.map((b) => ({
    value: b.name,
    color: b.color,
    payload: { name: b.uuid },
  }));

  if (noData && isLoading) {
    return <LoadingChartSection />;
  }

  if (noData || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <Stack sx={{ width: '100%', ...sx }}>
      <Stack sx={{ opacity: isFetching ? 0.4 : 1, gap: 2 }}>
        <SubChart
          title='Started Over Time'
          mergedData={mergedStarted}
          brands={startedData}
          hiddenBrands={hiddenBrands}
          timezone={timezone}
        />
        <SubChart
          title='Succeeded Over Time'
          mergedData={mergedSucceeded}
          brands={succeededData}
          hiddenBrands={hiddenBrands}
          timezone={timezone}
        />
        <SubChart
          title='Success Percentage Over Time'
          mergedData={mergedPercentage}
          brands={percentageData}
          hiddenBrands={hiddenBrands}
          timezone={timezone}
          tooltipFormatter={(value) => `${Number(value).toFixed(1)}%`}
          yAxisTickFormatter={(value) => `${Number(value).toFixed(0)}%`}
          yAxisDomain={['auto', 'auto']}
        />
        <SimpleLegend
          payload={legendPayload}
          hiddenItems={hiddenBrands}
          onToggle={handleToggle}
        />
      </Stack>
    </Stack>
  );
}
