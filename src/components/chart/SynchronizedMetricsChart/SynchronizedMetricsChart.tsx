import React, { useMemo } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import {
  LineChart as RechartsLineChart,
  Line,
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
import { SeriesPercentageChartLegend } from '../SeriesPercentageChartLegend';
import {
  chartDefaultProps,
  xAxisDefaultProps,
  yAxisDefaultProps,
} from '../shared';
import type { SeriesChartData } from '../SeriesChart';
import type {
  SubChartConfig,
  SynchronizedMetricsChartProps,
} from './SynchronizedMetricsChart.types';
import { mapSynchronizedSubCharts } from './SynchronizedMetricsChart.map';

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
  const dateMap = new Map<number, Record<string, number> & { date: number }>();

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
  timezone: string;
  syncId: string;
  tooltipFormatter?: (value: number | string) => string;
  yAxisTickFormatter?: (value: number) => string;
  yAxisDomain?: [number | string, number | string];
}

function SubChart({
  title,
  mergedData,
  brands,
  timezone,
  syncId,
  tooltipFormatter,
  yAxisTickFormatter,
  yAxisDomain,
}: SubChartProps): React.ReactNode {
  const theme = useTheme();

  return (
    <Stack>
      <Typography variant='h5' sx={{ mb: 0.5, fontSize: '1.15rem' }}>
        {title}
      </Typography>
      <ResponsiveContainer width='100%' height={CHART_HEIGHT}>
        <RechartsLineChart
          data={mergedData}
          syncId={syncId}
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
          {brands.map((brand) => (
            <Line
              key={brand.uuid}
              dataKey={brand.uuid}
              name={brand.name}
              stroke={brand.color}
              type='monotone'
              strokeWidth={2}
              isAnimationActive={false}
              dot={false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Stack>
  );
}

export function SynchronizedMetricsChart({
  subCharts,
  chartData,
  subChartConfig,
  colorMap,
  syncId = SYNC_ID,
  isLoading,
  isSuccess,
  isFetching,
  filter,
  sx,
}: Readonly<SynchronizedMetricsChartProps>): React.ReactNode {
  const timezone = filter.timezone ?? DEFAULT_TIMEZONE;

  const resolvedSubCharts: readonly [SubChartConfig, ...SubChartConfig[]] =
    chartData
      ? mapSynchronizedSubCharts({
          chartData,
          subChartConfig,
          brands: filter.brands,
          colorMap,
          isLoading,
        })
      : subCharts;

  const noData = resolvedSubCharts.every((sc) => sc.data.length === 0);

  const mergedSubCharts = useMemo(
    () => resolvedSubCharts.map((sc) => mergeChartData(sc.data)),
    [resolvedSubCharts],
  );

  const legendPayload = useMemo(
    () =>
      resolvedSubCharts[0].data.map((b) => ({
        uuid: b.brandUuid ?? b.uuid,
        value: b.name,
        color: b.color,
        dataKey: b.uuid,
        integrationType: b.description ?? undefined,
        brandName: b.brandName,
      })),
    [resolvedSubCharts],
  );

  if (noData && isLoading) {
    return <LoadingChartSection />;
  }

  if (noData || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <Stack sx={{ width: '100%', ...sx }}>
      <Stack sx={{ opacity: isFetching ? 0.4 : 1, gap: 2 }}>
        {resolvedSubCharts.map((sc, i) => (
          <SubChart
            key={sc.title}
            title={sc.title}
            mergedData={mergedSubCharts[i]}
            brands={sc.data}
            timezone={timezone}
            syncId={syncId}
            tooltipFormatter={sc.tooltipFormatter}
            yAxisTickFormatter={sc.yAxisTickFormatter}
            yAxisDomain={sc.yAxisDomain}
          />
        ))}
        <SeriesPercentageChartLegend payload={legendPayload} />
      </Stack>
    </Stack>
  );
}
