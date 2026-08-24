import React, { useMemo, useState } from 'react';
import { Stack, ToggleButton, Typography, useTheme } from '@mui/material';
import { scaleSymlog } from 'd3-scale';
import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatDateMMYY } from '../../../utils/date';
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
import { SynchronizedChartTooltip } from './SynchronizedMetricsChart.tooltip';
import { trendSeries } from '../trend';
import type { MetricsIntervalType } from '../../../constants/metrics';

const SYNC_ID = 'synchronized-metrics';
const CHART_HEIGHT = 200;
const TOTAL_KEY = '__total__';
const TOTAL_NAME = 'Total';
const TREND_KEY = '__trend__';
const TREND_NAME = 'Trend';

/**
 * Which series the trend is fitted to.
 *
 * Percentage sub-charts have no summed Total, so they fit the pooled rate when
 * the mapper supplied one, and fall back to the only brand's own series when a
 * caller passes pre-mapped sub-charts without it.
 */
function trendTargetKey(subChart: SubChartConfig): string | null {
  if (!subChart.isPercentage) return TOTAL_KEY;
  if (subChart.totalByDate) return TOTAL_KEY;
  return subChart.data.length === 1 ? subChart.data[0].uuid : null;
}

/**
 * Merges per-brand SeriesChartData into a flat array for chart-level data.
 * Each entry: { date, [brand1.uuid]: value, [brand2.uuid]: value, ... }
 * This is required for Recharts syncId tooltip sync to work across charts.
 *
 * Exported for testing.
 */
export function mergeChartData(
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

/** Exported for testing. */
export const TOTAL_DATA_KEY = TOTAL_KEY;

export function enrichWithTotal(
  entries: Array<Record<string, number>>,
  visibleBrandKeys: string[],
): Array<Record<string, number>> {
  if (!visibleBrandKeys.length) return entries;
  return entries.map((entry) => ({
    ...entry,
    [TOTAL_KEY]: visibleBrandKeys.reduce(
      (sum, key) => sum + (Number(entry[key]) || 0),
      0,
    ),
  }));
}

interface SubChartProps {
  title: string;
  mergedData: Array<Record<string, number>>;
  brands: SeriesChartData[];
  timezone: string;
  syncId: string;
  isPercentage: boolean;
  showTotal: boolean;
  showTrend: boolean;
  /** Series the fit is drawn for; null when this sub-chart has none. */
  trendTarget: string | null;
  interval?: MetricsIntervalType;
  logScale: boolean;
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
  isPercentage,
  showTotal,
  showTrend,
  trendTarget,
  interval,
  logScale,
  tooltipFormatter,
  yAxisTickFormatter,
  yAxisDomain,
}: Readonly<SubChartProps>): React.ReactNode {
  const theme = useTheme();
  const useLogScale = logScale && !isPercentage;
  const showTotalLine = showTotal && !isPercentage && brands.length > 1;
  const yAxisScale = useLogScale ? scaleSymlog() : undefined;

  const trend = useMemo(
    () =>
      trendTarget
        ? trendSeries(mergedData, trendTarget, {
            clampTo: isPercentage ? [0, 100] : undefined,
            interval,
          })
        : null,
    [mergedData, trendTarget, isPercentage, interval],
  );

  // A straight fit is two endpoints, so it rides along as a computed column
  // rather than needing its own dataset.
  const chartData = useMemo(
    () =>
      showTrend && trend
        ? mergedData.map((entry, i) => ({
            ...entry,
            [TREND_KEY]: trend.values[i],
          }))
        : mergedData,
    [mergedData, showTrend, trend],
  );

  return (
    <Stack>
      <Typography variant='h5' sx={{ mb: 0.5, fontSize: '1.15rem' }}>
        {title}
      </Typography>
      <ResponsiveContainer width='100%' height={CHART_HEIGHT}>
        <RechartsLineChart
          data={chartData}
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
            scale={yAxisScale}
            {...yAxisDefaultProps}
          />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            // Lifts the box above sibling sections, which otherwise paint over
            // it - `.recharts-tooltip-wrapper` carries no stacking order.
            wrapperStyle={{ zIndex: theme.zIndex.tooltip }}
            content={
              <SynchronizedChartTooltip
                timezone={timezone}
                totalDataKey={TOTAL_KEY}
                trendDataKey={TREND_KEY}
                trendSlope={showTrend ? trend?.slopePerInterval : undefined}
                trendStepMs={trend?.stepMs}
                trendInterval={interval}
                trendUnit={isPercentage ? 'percent' : 'count'}
                valueFormatter={
                  tooltipFormatter ??
                  ((value: number | string) => Number(value).toLocaleString())
                }
              />
            }
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
          {showTotalLine && (
            <Line
              key={TOTAL_KEY}
              dataKey={TOTAL_KEY}
              name={TOTAL_NAME}
              stroke={theme.palette.text.primary}
              strokeWidth={2}
              strokeDasharray='4 4'
              type='monotone'
              isAnimationActive={false}
              dot={false}
            />
          )}
          {showTrend && trend && (
            <Line
              key={TREND_KEY}
              dataKey={TREND_KEY}
              name={TREND_NAME}
              stroke={theme.palette.secondary.main}
              strokeWidth={2}
              strokeDasharray='7 5'
              type='linear'
              isAnimationActive={false}
              dot={false}
              activeDot={false}
              legendType='none'
            />
          )}
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
  const [showTotal, setShowTotal] = useState(false);
  const [showTrend, setShowTrend] = useState(false);
  const [logScale, setLogScale] = useState(false);

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
    () =>
      resolvedSubCharts.map((sc) => {
        const merged = mergeChartData(sc.data);
        if (sc.isPercentage) {
          // Rates can't be summed, so the pooled rate comes from the mapper,
          // which still has the raw numerator and denominator counts.
          const pooled = sc.totalByDate;
          return pooled
            ? merged.map((entry) => ({
                ...entry,
                [TOTAL_KEY]: pooled[entry.date] ?? 0,
              }))
            : merged;
        }
        const visibleKeys = sc.data.map((brand) => brand.uuid);
        return enrichWithTotal(merged, visibleKeys);
      }),
    [resolvedSubCharts],
  );

  const hasAbsoluteSubChart = resolvedSubCharts.some((sc) => !sc.isPercentage);
  const hasAbsoluteMultiBrand = resolvedSubCharts.some(
    (sc) => !sc.isPercentage && sc.data.length > 1,
  );
  const trendTargets = resolvedSubCharts.map((sc) => trendTargetKey(sc));
  const hasTrendableSubChart = trendTargets.some((target) => target !== null);

  const legendPayload = useMemo(
    () =>
      resolvedSubCharts[0].data.map((b) => ({
        uuid: b.brandUuid ?? b.uuid,
        value: b.name,
        color: b.color,
        dataKey: b.uuid,
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

  const showControls =
    hasAbsoluteSubChart || hasAbsoluteMultiBrand || hasTrendableSubChart;

  return (
    <Stack sx={{ width: '100%', ...sx }}>
      {showControls && (
        <Stack
          direction='row'
          spacing={1}
          justifyContent='flex-end'
          sx={{ mb: 1 }}
        >
          {hasAbsoluteMultiBrand && (
            <ToggleButton
              value='total'
              selected={showTotal}
              onChange={() => setShowTotal((v) => !v)}
              size='small'
              aria-label='Show Total line'
              aria-pressed={showTotal}
            >
              Show Total
            </ToggleButton>
          )}
          {hasTrendableSubChart && (
            <ToggleButton
              value='trend'
              selected={showTrend}
              onChange={() => setShowTrend((v) => !v)}
              size='small'
              aria-label='Show trend line'
              aria-pressed={showTrend}
            >
              Show Trend
            </ToggleButton>
          )}
          {hasAbsoluteSubChart && (
            <ToggleButton
              value='log'
              selected={logScale}
              onChange={() => setLogScale((v) => !v)}
              size='small'
              aria-label='Toggle logarithmic scale'
              aria-pressed={logScale}
            >
              Log Scale
            </ToggleButton>
          )}
        </Stack>
      )}
      <Stack sx={{ opacity: isFetching ? 0.4 : 1, gap: 2 }}>
        {resolvedSubCharts.map((sc, i) => (
          <SubChart
            key={sc.title}
            title={sc.title}
            mergedData={mergedSubCharts[i]}
            brands={sc.data}
            timezone={timezone}
            syncId={syncId}
            isPercentage={sc.isPercentage ?? false}
            showTotal={showTotal}
            showTrend={showTrend}
            trendTarget={trendTargets[i]}
            interval={filter.interval}
            logScale={logScale}
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
