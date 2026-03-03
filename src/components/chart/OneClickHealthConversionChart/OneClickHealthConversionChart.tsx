import React from 'react';
import type { SxProps } from '@mui/material';

import { OutcomeOverTimeChart } from '../OutcomeOverTimeChart';
import {
  mapOneClickHealthConversionChartData,
  type OneClickHealthConversionBrandData,
} from './OneClickHealthConversionChart.map';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickHealthConversionChartProps {
  chartData: OneClickHealthConversionBrandData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickHealthConversionChart({
  chartData,
  isLoading = true,
  ...rest
}: Readonly<OneClickHealthConversionChartProps>): React.ReactNode {
  const { series, data } = isLoading
    ? { series: [], data: [] }
    : mapOneClickHealthConversionChartData({
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
