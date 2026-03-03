import React from 'react';
import type { SxProps } from '@mui/material';

import {
  OutcomeOverTimeChart,
  type AreaSeriesChartData,
} from '../OutcomeOverTimeChart';
import { mapOneClickVerificationDeliveryChartData } from './OneClickVerificationDeliveryChart.map';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickVerificationDeliveryChartProps {
  chartData?: OneClickVerificationBrandData[];
  /** @deprecated Use `chartData` instead. Pass raw brand data and let the wrapper handle mapping. */
  data?: Array<Record<string, number | string>>;
  /** @deprecated Use `chartData` instead. Pass raw brand data and let the wrapper handle mapping. */
  series?: AreaSeriesChartData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickVerificationDeliveryChart({
  data: legacyData,
  series: legacySeries,
  chartData,
  isLoading = true,
  ...rest
}: Readonly<OneClickVerificationDeliveryChartProps>): React.ReactNode {
  const { series, data } = chartData
    ? isLoading
      ? { series: [], data: [] }
      : mapOneClickVerificationDeliveryChartData({
          brands: rest.filter.brands,
          data: chartData,
        })
    : { series: legacySeries ?? [], data: legacyData ?? [] };

  return (
    <OutcomeOverTimeChart
      data={data}
      series={series}
      isLoading={isLoading}
      {...rest}
    />
  );
}
