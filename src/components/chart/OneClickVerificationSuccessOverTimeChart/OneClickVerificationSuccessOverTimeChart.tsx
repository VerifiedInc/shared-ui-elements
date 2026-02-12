import React from 'react';
import type { SxProps } from '@mui/material';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import type { BrandFilter } from '../../BrandFilterInput';
import { AreaChart, type AreaSeriesChartData } from '../AreaChart';
import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';

const styles = {
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
} as const;

export interface OneClickVerificationSuccessOverTimeChartData {
  data: Array<Record<string, number | string>>;
  series: AreaSeriesChartData[];
}

export interface OneClickVerificationSuccessOverTimeChartProps {
  chartData: OneClickVerificationSuccessOverTimeChartData;
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickVerificationSuccessOverTimeChart({
  chartData,
  isLoading,
  isFetching,
  isSuccess,
  filter,
  sx,
}: Readonly<OneClickVerificationSuccessOverTimeChartProps>): React.ReactNode {
  if (!chartData.data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!chartData.data.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <AreaChart
      series={chartData.series}
      data={chartData.data}
      xAxis={{
        dataKey: 'month',
        type: 'number',
        domain: ['dataMin', 'dataMax'],
        tickFormatter: (value: number) =>
          formatDateMMYY(value, {
            timeZone: filter.timezone,
            hour12: false,
            hour: 'numeric',
          }),
      }}
      yAxis={{
        tickFormatter: (value: number) => `${value}%`,
      }}
      tooltip={{
        formatter: (value: number | string | Array<number | string>) => [
          `${String(value)}%`,
          'Success Percentage',
        ],
        labelFormatter: (value: number) =>
          formatExtendedDate(value, {
            timeZone: filter.timezone,
            hour12: false,
          }),
      }}
      sx={{ ...styles.chartWrapper, opacity: isFetching ? 0.4 : 1, ...sx }}
    />
  );
}
