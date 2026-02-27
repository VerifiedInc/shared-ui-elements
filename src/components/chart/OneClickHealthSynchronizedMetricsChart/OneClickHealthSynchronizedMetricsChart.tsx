import React from 'react';
import type { SxProps } from '@mui/material';

import { SynchronizedMetricsChart } from '../SynchronizedMetricsChart';
import {
  mapOneClickHealthSynchronizedData,
  type OneClickHealthSynchronizedBrandData,
} from './OneClickHealthSynchronizedMetricsChart.map';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickHealthSynchronizedMetricsChartProps {
  chartData: OneClickHealthSynchronizedBrandData[];
  isLoading?: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands: BrandFilter[];
  };
  colorMap: Map<string, string>;
  sx?: SxProps;
}

export function OneClickHealthSynchronizedMetricsChart({
  chartData,
  isLoading = true,
  isSuccess,
  isFetching,
  filter,
  colorMap,
  sx,
}: Readonly<OneClickHealthSynchronizedMetricsChartProps>): React.ReactNode {
  const { started, succeeded, percentage } = isLoading
    ? { started: [], succeeded: [], percentage: [] }
    : mapOneClickHealthSynchronizedData({
        brands: filter.brands,
        colorMap,
        data: chartData,
      });

  return (
    <SynchronizedMetricsChart
      startedData={started}
      succeededData={succeeded}
      percentageData={percentage}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isFetching={isFetching}
      filter={filter}
      sx={sx}
    />
  );
}
