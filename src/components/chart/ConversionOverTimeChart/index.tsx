import React, { useState } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  type SxProps,
} from '@mui/material';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { AreaChart, type AreaSeriesChartData } from '../AreaChart';
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
      if (!dateMap.has(date)) {
        const entry: Record<string, number | string> = { date };
        for (const s of seriesConfig) entry[s.dataKey] = 0;
        dateMap.set(date, entry);
      }
      const entry = dateMap.get(date)!;
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
}: Readonly<ConversionOverTimeChartProps>): React.ReactNode {
  const style = useStyle();
  const timezone = filter.timezone ?? DEFAULT_TIMEZONE;
  const [mode, setMode] = useState<ViewMode>('absolute');

  const resolved =
    chartData !== undefined
      ? isLoading
        ? {
            series: [] as AreaSeriesChartData[],
            data: [] as Array<Record<string, number | string>>,
          }
        : mapBrandIntervalData({
            brands: filter.brands,
            data: chartData,
            seriesConfig: seriesConfig ?? [],
          })
      : { series: series ?? [], data: data ?? [] };

  if (!resolved.data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!resolved.data.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  const normalizedData =
    stackModeProp === 'none' && mode === 'percent'
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
    stackModeProp === 'stack'
      ? mode === 'absolute'
        ? 'stack'
        : 'expand'
      : 'none';

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
      : stackModeProp === 'stack'
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: style.regularChartWrapper.height,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_: React.MouseEvent, value: ViewMode | null) => {
            if (value !== null) setMode(value);
          }}
          size='small'
        >
          <ToggleButton value='absolute'>Numbers</ToggleButton>
          <ToggleButton value='percent'>Percentages</ToggleButton>
        </ToggleButtonGroup>
      </Box>
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
            formatExtendedDate(value, { timeZone: timezone, hour12: false }),
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
    </Box>
  );
}
