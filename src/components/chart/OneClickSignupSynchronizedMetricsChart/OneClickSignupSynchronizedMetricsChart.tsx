import React, { useMemo } from 'react';
import type { SxProps } from '@mui/material';

import { SynchronizedMetricsChart } from '../SynchronizedMetricsChart';
import type { SubChartConfig } from '../SynchronizedMetricsChart';
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
  const subCharts = useMemo((): [SubChartConfig, ...SubChartConfig[]] => {
    if (isLoading) {
      return [{ title: 'Started Over Time', data: [] }];
    }
    const { started, succeeded, percentage } =
      mapOneClickSignupSynchronizedData({
        brands: filter.brands,
        colorMap,
        data: chartData,
      });
    return [
      { title: 'Started Over Time', data: started },
      { title: 'Succeeded Over Time', data: succeeded },
      {
        title: 'Success Percentage Over Time',
        data: percentage,
        tooltipFormatter: (v) => `${Number(v).toFixed(1)}%`,
        yAxisTickFormatter: (v) => `${Number(v).toFixed(0)}%`,
        yAxisDomain: ['auto', 'auto'],
      },
    ];
  }, [isLoading, filter.brands, colorMap, chartData]);

  return (
    <SynchronizedMetricsChart
      subCharts={subCharts}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isFetching={isFetching}
      filter={filter}
      sx={sx}
    />
  );
}
