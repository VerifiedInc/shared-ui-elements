import React, { type ComponentProps } from 'react';
import type { SxProps } from '@mui/material';
import type { Tooltip, YAxis } from 'recharts';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import type { BrandFilter } from '../../BrandFilterInput';
import { AreaChart, type AreaSeriesChartData } from '../AreaChart';

const styles = {
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
} as const;

export interface OneClickVerificationOverTimeChartProps {
  label?: string;
  data: Array<Record<string, number | string>>;
  series: AreaSeriesChartData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  yAxis?: ComponentProps<typeof YAxis>;
  tooltip?: ComponentProps<typeof Tooltip>;
  sx?: SxProps;
}

export function OneClickVerificationOverTimeChart({
  data,
  series,
  isLoading,
  isFetching,
  isSuccess,
  yAxis,
  tooltip,
  sx,
}: Readonly<OneClickVerificationOverTimeChartProps>): React.ReactNode {
  if (!data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <AreaChart
      series={series}
      data={data}
      yAxis={yAxis}
      tooltip={tooltip}
      sx={{ ...styles.chartWrapper, opacity: isFetching ? 0.4 : 1, ...sx }}
    />
  );
}
