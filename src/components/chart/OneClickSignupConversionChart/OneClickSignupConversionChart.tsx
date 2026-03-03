import React from 'react';
import type { SxProps } from '@mui/material';

import { OutcomeOverTimeChart } from '../OutcomeOverTimeChart';
import {
  mapOneClickSignupConversionChartData,
  type OneClickSignupConversionBrandData,
} from './OneClickSignupConversionChart.map';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickSignupConversionChartProps {
  chartData: OneClickSignupConversionBrandData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickSignupConversionChart({
  chartData,
  isLoading = true,
  ...rest
}: Readonly<OneClickSignupConversionChartProps>): React.ReactNode {
  const { series, data } = isLoading
    ? { series: [], data: [] }
    : mapOneClickSignupConversionChartData({
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
