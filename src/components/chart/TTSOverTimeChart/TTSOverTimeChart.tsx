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

export interface TTSOverTimeChartProps {
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
  showLegend?: boolean;
}

export function TTSOverTimeChart({
  label,
  data,
  isLoading,
  isFetching,
  isSuccess,
  filter,
  sx,
  showLegend,
}: Readonly<TTSOverTimeChartProps>): React.ReactNode {
  if (!data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length || !isSuccess) {
    return <EmptyChartSection />;
  }
  return (
    <SeriesChart
      label={label ?? 'Text to Signup'}
      data={data}
      filter={filter}
      showUuid={true}
      showLegend={showLegend}
      sx={{ ...styles.chartWrapper, opacity: isFetching ? 0.4 : 1, ...sx }}
    />
  );
}
