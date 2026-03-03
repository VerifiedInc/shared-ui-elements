import React, { useMemo } from 'react';
import type { SxProps } from '@mui/material';

import { SynchronizedMetricsChart } from '../SynchronizedMetricsChart';
import type { SubChartConfig } from '../SynchronizedMetricsChart';
import { mapOneClickVerificationConversionSynchronizedData } from './OneClickVerificationConversionSynchronizedMetricsChart.map';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickVerificationConversionSynchronizedMetricsChartProps {
  chartData: OneClickVerificationBrandData[];
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

export function OneClickVerificationConversionSynchronizedMetricsChart({
  chartData,
  isLoading = true,
  isSuccess,
  isFetching,
  filter,
  colorMap,
  sx,
}: Readonly<OneClickVerificationConversionSynchronizedMetricsChartProps>): React.ReactNode {
  const subCharts = useMemo((): [SubChartConfig, ...SubChartConfig[]] => {
    if (isLoading) {
      return [{ title: 'Verifications Started Over Time', data: [] }];
    }
    const { started, succeeded, percentage } =
      mapOneClickVerificationConversionSynchronizedData({
        brands: filter.brands,
        colorMap,
        data: chartData,
      });
    return [
      { title: 'Verifications Started Over Time', data: started },
      { title: 'Verifications Succeeded Over Time', data: succeeded },
      {
        title: 'Verification Success Percentage Over Time',
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
