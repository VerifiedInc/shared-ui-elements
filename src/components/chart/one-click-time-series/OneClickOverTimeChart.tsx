import React from 'react';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { SeriesChart, type SeriesChartData } from '../SeriesChart';

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
  filter: {
    timezone: string;
    brands: Array<{ label: string; value: string }>;
  };
}

export function OneClickOverTimeChart({
  data,
  isLoading,
  filter,
}: Readonly<OneClickOverTimeChartProps>): React.ReactNode {
  if (isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length) {
    return <EmptyChartSection />;
  }

  return (
    <SeriesChart
      label='Uniques'
      data={data}
      filter={filter}
      sx={{ ...styles.chartWrapper, opacity: isLoading ? 0.4 : 1 }}
    />
  );
}
