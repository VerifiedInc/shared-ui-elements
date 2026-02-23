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

type ViewMode = 'absolute' | 'percent';

export interface OneClickVerificationOutcomeOverTimeChartProps {
  data: Array<Record<string, number | string>>;
  series: AreaSeriesChartData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickVerificationOutcomeOverTimeChart({
  data,
  series,
  isLoading,
  isFetching,
  isSuccess,
  filter,
  sx,
}: Readonly<OneClickVerificationOutcomeOverTimeChartProps>): React.ReactNode {
  const style = useStyle();
  const timezone = filter.timezone ?? DEFAULT_TIMEZONE;
  const [mode, setMode] = useState<ViewMode>('absolute');

  if (!data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  const stackMode = mode === 'absolute' ? 'stack' : 'expand';

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
        data={data}
        series={series}
        stackMode={stackMode}
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
        yAxis={
          mode === 'absolute'
            ? {
                tickFormatter: (value: number) =>
                  Number(value).toLocaleString(),
                allowDecimals: false,
              }
            : {
                tickFormatter: (value: number) =>
                  `${(value * 100).toFixed(0)}%`,
                domain: [0, 1] as [number, number],
                allowDecimals: false,
              }
        }
        tooltip={{
          formatter:
            mode === 'absolute'
              ? (value: number | string | Array<number | string>) =>
                  Number(value).toLocaleString()
              : (
                  value: number | string | Array<number | string>,
                  _name: string | number,
                  entry: any,
                ) => {
                  const row = entry.payload;
                  const total =
                    (row.oneClickVerificationVerified as number) +
                    (row.oneClickVerificationExpired as number) +
                    (row.oneClickVerificationFailed as number);
                  return total === 0
                    ? '0.0%'
                    : `${((Number(value) / total) * 100).toFixed(1)}%`;
                },
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
    </Box>
  );
}
