import React from 'react';
import type { SxProps } from '@mui/material';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { SeriesChart, type SeriesChartData } from '../SeriesChart';
import type { BrandFilter } from '../../BrandFilterInput';

const styles = {
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
} as const;

export interface OneClickHealthOverTimeChartProps {
  label?: string;
  data: SeriesChartData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickHealthOverTimeChart({
  label,
  data,
  isLoading,
  isFetching,
  isSuccess,
  filter,
  sx,
}: Readonly<OneClickHealthOverTimeChartProps>): React.ReactNode {
  if (!data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length || !isSuccess) {
    return <EmptyChartSection />;
  }
  return (
    <SeriesChart
      label={label ?? 'OneClick Health Over Time'}
      data={data}
      filter={filter}
      showUuid
      sx={{ ...styles.chartWrapper, opacity: isFetching ? 0.4 : 1, ...sx }}
    />
  );
}
