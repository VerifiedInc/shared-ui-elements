import React, { useMemo } from 'react';
import type { SxProps } from '@mui/material';

import { SynchronizedMetricsChart } from '../SynchronizedMetricsChart';
import type { SubChartConfig } from '../SynchronizedMetricsChart';
import { mapOneClickVerificationDeliverySynchronizedData } from './OneClickVerificationDeliverySynchronizedMetricsChart.map';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';
import type { BrandFilter } from '../../BrandFilterInput';

export interface OneClickVerificationDeliverySynchronizedMetricsChartProps {
  chartData: OneClickVerificationBrandData[];
  isLoading?: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands: BrandFilter[];
  };
  colorMap: Map<string, string>;
  syncId?: string;
  sx?: SxProps;
}

export function OneClickVerificationDeliverySynchronizedMetricsChart({
  chartData,
  isLoading = true,
  isSuccess,
  isFetching,
  filter,
  colorMap,
  syncId,
  sx,
}: Readonly<OneClickVerificationDeliverySynchronizedMetricsChartProps>): React.ReactNode {
  const subCharts = useMemo((): [SubChartConfig, ...SubChartConfig[]] => {
    if (isLoading) {
      return [{ title: 'Sent', data: [] }];
    }
    const { sent, delivered } = mapOneClickVerificationDeliverySynchronizedData(
      {
        brands: filter.brands,
        colorMap,
        data: chartData,
      },
    );
    return [
      { title: 'Sent', data: sent },
      { title: 'Delivered', data: delivered },
    ];
  }, [isLoading, filter.brands, colorMap, chartData]);

  return (
    <SynchronizedMetricsChart
      subCharts={subCharts}
      syncId={syncId}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isFetching={isFetching}
      filter={filter}
      sx={sx}
    />
  );
}
