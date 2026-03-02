import React from 'react';
import type { SxProps } from '@mui/material';

import { OutcomeOverTimeChart } from '../OutcomeOverTimeChart';
import {
  mapOneClickSignupOutcomeOverTimeChartData,
  type OneClickSignupOutcomeBrandData,
} from './OneClickSignupOutcomeOverTimeChart.map';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickSignupOutcomeOverTimeChartProps {
  chartData: OneClickSignupOutcomeBrandData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickSignupOutcomeOverTimeChart({
  chartData,
  isLoading = true,
  ...rest
}: Readonly<OneClickSignupOutcomeOverTimeChartProps>): React.ReactNode {
  const { series, data } = isLoading
    ? { series: [], data: [] }
    : mapOneClickSignupOutcomeOverTimeChartData({
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
