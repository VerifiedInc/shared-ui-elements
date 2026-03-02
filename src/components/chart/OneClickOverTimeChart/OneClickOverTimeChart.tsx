import React from 'react';
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

export interface OneClickOverTimeChartProps {
  data: SeriesChartData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands: BrandFilter[];
  };
}

/**
 * @deprecated Use {@link OneClickSignupSynchronizedMetricsChart} instead.
 * This component will be removed in a future version.
 */
export function OneClickOverTimeChart({
  data,
  isLoading,
  isFetching,
  isSuccess,
  filter,
}: Readonly<OneClickOverTimeChartProps>): React.ReactNode {
  if (!data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <SeriesChart
      label='Uniques'
      data={data}
      filter={filter}
      sx={{ ...styles.chartWrapper, opacity: isFetching ? 0.4 : 1 }}
    />
  );
}
