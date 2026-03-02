import React, { useMemo } from 'react';
import type { SxProps } from '@mui/material';

import { SynchronizedMetricsChart } from '../SynchronizedMetricsChart';
import {
  mapOneClickSignupSynchronizedData,
  type OneClickSignupSynchronizedBrandData,
} from './OneClickSignupSynchronizedMetricsChart.map';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickSignupSynchronizedMetricsChartProps {
  chartData: OneClickSignupSynchronizedBrandData[];
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

export function OneClickSignupSynchronizedMetricsChart({
  chartData,
  isLoading = true,
  isSuccess,
  isFetching,
  filter,
  colorMap,
  sx,
}: Readonly<OneClickSignupSynchronizedMetricsChartProps>): React.ReactNode {
  const { started, succeeded, percentage } = useMemo(
    () =>
      isLoading
        ? { started: [], succeeded: [], percentage: [] }
        : mapOneClickSignupSynchronizedData({
            brands: filter.brands,
            colorMap,
            data: chartData,
          }),
    [isLoading, filter.brands, colorMap, chartData],
  );

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
