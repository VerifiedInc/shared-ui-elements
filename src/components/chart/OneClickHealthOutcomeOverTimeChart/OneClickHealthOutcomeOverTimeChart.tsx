import React from 'react';
import type { SxProps } from '@mui/material';

import { OutcomeOverTimeChart } from '../OutcomeOverTimeChart';
import {
  mapOneClickHealthOutcomeOverTimeChartData,
  type OneClickHealthOutcomeBrandData,
} from './OneClickHealthOutcomeOverTimeChart.map';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickHealthOutcomeOverTimeChartProps {
  chartData: OneClickHealthOutcomeBrandData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickHealthOutcomeOverTimeChart({
  chartData,
  isLoading = true,
  ...rest
}: Readonly<OneClickHealthOutcomeOverTimeChartProps>): React.ReactNode {
  const { series, data } = isLoading
    ? { series: [], data: [] }
    : mapOneClickHealthOutcomeOverTimeChartData({
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
