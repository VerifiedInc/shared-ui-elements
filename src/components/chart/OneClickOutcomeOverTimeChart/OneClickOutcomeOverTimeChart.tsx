import React from 'react';
import type { SxProps } from '@mui/material';

import { OutcomeOverTimeChart } from '../OutcomeOverTimeChart';
import {
  mapOneClickOutcomeOverTimeChartData,
  type OneClickOutcomeBrandData,
} from './OneClickOutcomeOverTimeChart.map';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickOutcomeOverTimeChartProps {
  chartData: OneClickOutcomeBrandData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickOutcomeOverTimeChart({
  chartData,
  isLoading = true,
  ...rest
}: Readonly<OneClickOutcomeOverTimeChartProps>): React.ReactNode {
  const { series, data } = isLoading
    ? { series: [], data: [] }
    : mapOneClickOutcomeOverTimeChartData({
        brands: rest.filter.brands,
        data: chartData,
      });

  return (
    <OutcomeOverTimeChart
      data={data}
      series={series}
      isLoading={isLoading}
      {...rest}
    />
  );
}
