import React, { useState } from 'react';
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  type SxProps,
} from '@mui/material';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { AreaChart, type AreaSeriesChartData } from '../AreaChart';
import { SeriesPercentageChartLegend } from '../SeriesPercentageChartLegend';
import { useStyle } from '../styles';
import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';
import { DEFAULT_TIMEZONE } from '../../form/TimezoneInput/timezones';
import type { BrandFilter } from '../../BrandFilterInput';

export type { AreaSeriesChartData } from '../AreaChart';

type ViewMode = 'absolute' | 'percent';

export interface BrandIntervalData {
  brandUuid: string;
  brandName: string;
  interval?: Array<Record<string, number | string>>;
}

/**
 * A single entry in the chart's toggle button group. Selecting it swaps the
 * data, series, and display configuration the chart renders.
 */
export interface ConversionOverTimeChartView {
  key: string;
  label: string;
  /** Raw bucketed data; will be mapped via {@link mapBrandIntervalData}. */
  chartData?: BrandIntervalData[];
  /** Pre-mapped data points (alternative to `chartData`). */
  data?: Array<Record<string, number | string>>;
  /** Series definitions for pre-mapped `data`. */
  series?: AreaSeriesChartData[];
  /** Series config used to map `chartData`. */
  seriesConfig?: AreaSeriesChartData[];
  /** Display mode for this view. Defaults to 'absolute'. */
  mode?: ViewMode;
  /** Stacking mode for this view. Defaults to the top-level `stackMode`. */
  stackMode?: 'stack' | 'none';
}

/**
 * Auxiliary boolean toggle rendered to the left of the built-in
 * Numbers / Percentages group. Consumer owns the selected state so the toggle
 * can drive consumer-side data or rendering decisions.
 */
export interface ConversionOverTimeChartToggle {
  id: string;
  label: string;
  selected: boolean;
  onChange: (selected: boolean) => void;
  ariaLabel?: string;
}

function mapBrandIntervalData({
  brands,
  data,
  seriesConfig,
}: {
  brands?: BrandFilter[];
  data: BrandIntervalData[];
  seriesConfig: AreaSeriesChartData[];
}): {
  series: AreaSeriesChartData[];
  data: Array<Record<string, number | string>>;
} {
  const dateMap = new Map<number, Record<string, number | string>>();
  const brandUuids = brands
    ? new Set(brands.map((b) => b._raw.brandUuid))
    : null;

  for (const brand of data) {
    if (brandUuids && !brandUuids.has(brand.brandUuid)) continue;
    for (const item of brand.interval ?? []) {
      const date = +new Date(item.date);
      let entry = dateMap.get(date);
      if (!entry) {
        entry = { date };
        for (const s of seriesConfig) entry[s.dataKey] = 0;
        dateMap.set(date, entry);
      }
      for (const s of seriesConfig) {
        entry[s.dataKey] =
          (entry[s.dataKey] as number) + Number(item[s.dataKey] || 0);
      }
    }
  }

  return {
    series: seriesConfig,
    data: Array.from(dateMap.values()).sort(
      (a, b) => (a.date as number) - (b.date as number),
    ),
  };
}

export interface ConversionOverTimeChartLegendBrand {
  uuid: string;
  value: string;
  color: string;
  dataKey?: string;
  brandName?: string;
  integrationType?: string;
}

export interface ConversionOverTimeChartProps {
  data?: Array<Record<string, number | string>>;
  series?: AreaSeriesChartData[];
  chartData?: BrandIntervalData[];
  seriesConfig?: AreaSeriesChartData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
  stackMode?: 'stack' | 'none';
  /**
   * Single-brand legend entry. When provided, renders a brand legend row
   * beneath the chart with name, optional metadata, and a copyable UUID.
   */
  legendBrand?: ConversionOverTimeChartLegendBrand;
  /** Whether the legend displays the copyable UUID. Defaults to true. */
  showLegendUuid?: boolean;
  /**
   * Configurable toggle button group. Each view defines its own data, series,
   * and display mode. Consumers control the order — including inserting custom
   * views (e.g. 'Data Providers') between the built-in Numbers / Percentages.
   *
   * When omitted, the chart falls back to the built-in
   * `[Numbers, Percentages]` toggles driven by the top-level
   * `chartData`/`seriesConfig`.
   */
  views?: ConversionOverTimeChartView[];
  /** Key of the initially selected view. Defaults to the first view. */
  defaultViewKey?: string;
  /**
   * Optional auxiliary toggles rendered left of the Numbers / Percentages
   * group. Each toggle is independent and controlled by the consumer.
   */
  extraToggles?: ConversionOverTimeChartToggle[];
}

export function ConversionOverTimeChart({
  data,
  series,
  chartData,
  seriesConfig,
  stackMode: stackModeProp = 'stack',
  isLoading,
  isFetching,
  isSuccess,
  filter,
  sx,
  legendBrand,
  showLegendUuid = true,
  views,
  defaultViewKey,
  extraToggles,
}: Readonly<ConversionOverTimeChartProps>): React.ReactNode {
  const style = useStyle();
  const timezone = filter.timezone ?? DEFAULT_TIMEZONE;

  // Effective views: explicit `views` prop takes precedence; otherwise fall
  // back to the legacy built-in Numbers / Percentages toggles backed by the
  // top-level chartData/seriesConfig.
  const effectiveViews: ConversionOverTimeChartView[] = views ?? [
    { key: 'absolute', label: 'Numbers', mode: 'absolute' },
    { key: 'percent', label: 'Percentages', mode: 'percent' },
  ];

  const [activeViewKey, setActiveViewKey] = useState<string>(
    defaultViewKey ?? effectiveViews[0]?.key ?? 'absolute',
  );

  const activeView =
    effectiveViews.find((v) => v.key === activeViewKey) ?? effectiveViews[0];
  const mode: ViewMode = activeView?.mode ?? 'absolute';
  const stackMode = activeView?.stackMode ?? stackModeProp;

  // Resolve the data + series for the active view. A view can override the
  // top-level chartData/seriesConfig/data/series; otherwise fall back to them.
  const viewChartData = activeView?.chartData ?? chartData;
  const viewSeriesConfig = activeView?.seriesConfig ?? seriesConfig;
  const viewData = activeView?.data ?? data;
  const viewSeries = activeView?.series ?? series;

  const resolved =
    viewChartData !== undefined
      ? isLoading
        ? {
            series: [] as AreaSeriesChartData[],
            data: [] as Array<Record<string, number | string>>,
          }
        : mapBrandIntervalData({
            brands: filter.brands,
            data: viewChartData,
            seriesConfig: viewSeriesConfig ?? [],
          })
      : { series: viewSeries ?? [], data: viewData ?? [] };

  const isEmpty = !resolved.data.length || !isSuccess;
  const isLoadingEmpty = !resolved.data.length && isLoading;

  // Legacy path (no `views` prop): preserve the original early-return UX so
  // existing consumers don't see a layout shift.
  if (!views) {
    if (isLoadingEmpty) return <LoadingChartSection />;
    if (isEmpty) return <EmptyChartSection />;
  }

  const normalizedData =
    stackMode === 'none' && mode === 'percent'
      ? resolved.data.map((d) => {
          const localMax = Math.max(
            0,
            ...resolved.series.map((s) => Number(d[s.dataKey]) || 0),
          );
          const normalized: Record<string, number | string> = { date: d.date };
          for (const s of resolved.series) {
            normalized[s.dataKey] =
              localMax === 0 ? 0 : (Number(d[s.dataKey]) || 0) / localMax;
          }
          return normalized;
        })
      : null;

  const rechartsStackMode =
    stackMode === 'stack' ? (mode === 'absolute' ? 'stack' : 'expand') : 'none';

  const yAxis =
    mode === 'absolute'
      ? {
          tickFormatter: (v: number) => Number(v).toLocaleString(),
          allowDecimals: false,
        }
      : {
          tickFormatter: (v: number) => `${(v * 100).toFixed(0)}%`,
          domain: [0, 1] as [number, number],
        };

  const tooltipFormatter =
    mode === 'absolute'
      ? (value: number | string | Array<number | string>) =>
          Number(value).toLocaleString()
      : stackMode === 'stack'
        ? (
            value: number | string | Array<number | string>,
            _name: string | number,
            entry: any,
          ) => {
            const total = resolved.series.reduce(
              (sum, s) => sum + (Number(entry.payload[s.dataKey]) || 0),
              0,
            );
            return total === 0
              ? '0.0%'
              : `${((Number(value) / total) * 100).toFixed(1)}%`;
          }
        : (value: number | string | Array<number | string>) =>
            `${(Number(value) * 100).toFixed(1)}%`;

  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          height: style.regularChartWrapper.height,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          {extraToggles?.length ? (
            <ToggleButtonGroup size='small'>
              {extraToggles.map((toggle) => (
                <ToggleButton
                  key={toggle.id}
                  value={toggle.id}
                  selected={toggle.selected}
                  onChange={() => toggle.onChange(!toggle.selected)}
                  aria-label={toggle.ariaLabel ?? toggle.label}
                >
                  {toggle.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          ) : null}
          <ToggleButtonGroup
            value={activeViewKey}
            exclusive
            onChange={(_: React.MouseEvent, value: string | null) => {
              if (value !== null) setActiveViewKey(value);
            }}
            size='small'
          >
            {effectiveViews.map((view) => (
              <ToggleButton key={view.key} value={view.key}>
                {view.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        {isLoadingEmpty ? (
          <LoadingChartSection />
        ) : isEmpty ? (
          <EmptyChartSection />
        ) : (
          <AreaChart
            data={normalizedData ?? resolved.data}
            series={resolved.series}
            stackMode={rechartsStackMode}
            isAnimationActive={true}
            xAxis={{
              dataKey: 'date',
              type: 'number',
              domain: ['dataMin', 'dataMax'],
              tickFormatter: (value: number) =>
                formatDateMMYY(value, {
                  timeZone: timezone,
                  hour12: false,
                  hour: 'numeric',
                }),
              allowDuplicatedCategory: false,
            }}
            yAxis={yAxis}
            tooltip={{
              formatter: tooltipFormatter,
              labelFormatter: (value: number) =>
                formatExtendedDate(value, {
                  timeZone: timezone,
                  hour12: false,
                }),
            }}
            sx={{
              ...style.regularChartWrapper,
              height: 'unset',
              flex: 1,
              minHeight: 0,
              opacity: isFetching ? 0.4 : 1,
              ...sx,
            }}
          />
        )}
      </Box>
      {legendBrand && (
        <SeriesPercentageChartLegend
          payload={[
            {
              uuid: legendBrand.uuid,
              value: legendBrand.value,
              color: legendBrand.color,
              dataKey: legendBrand.dataKey ?? legendBrand.uuid,
              brandName: legendBrand.brandName,
              integrationType: legendBrand.integrationType,
            },
          ]}
          showUuid={showLegendUuid}
        />
      )}
    </Stack>
  );
}
