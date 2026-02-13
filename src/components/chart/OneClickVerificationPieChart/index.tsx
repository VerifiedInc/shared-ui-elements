import { type ReactElement } from 'react';
import { type SxProps } from '@mui/material';

import { PieChart } from '../PieChart';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { useStyle } from '../styles';

export interface OneClickVerificationPieChartColors {
  created?: string;
  delivered?: string;
  verified?: string;
  failed?: string;
  sending?: string;
  undelivered?: string;
  expired?: string;
}

export interface OneClickVerificationPieChartData {
  created?: number;
  delivered?: number;
  verified?: number;
  failed?: number;
  sending?: number;
  undelivered?: number;
  expired?: number;
}

export interface OneClickVerificationPieChartProps {
  data: OneClickVerificationPieChartData;
  /**
   * Override default slice colors. Keys: `created`, `delivered`, `verified`, `failed`, `sending`, `undelivered`, `expired`.
   * @example { verified: '#0dbc3d', failed: '#eb0d28', expired: '#F5D328' }
   */
  colors?: OneClickVerificationPieChartColors;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  sx?: SxProps;
}

const SLICE_CONFIG = {
  created: { name: 'Created', color: '#90caf9' },
  delivered: { name: 'Delivered', color: '#42a5f5' },
  verified: { name: 'Verified', color: '#0dbc3d' },
  failed: { name: 'Failed', color: '#eb0d28' },
  sending: { name: 'Sending', color: '#ab47bc' },
  undelivered: { name: 'Undelivered', color: '#ff7043' },
  expired: { name: 'Expired', color: '#F5D328' },
} as const;

export function OneClickVerificationPieChart({
  data,
  colors,
  isLoading,
  isFetching,
  isSuccess,
  sx,
}: OneClickVerificationPieChartProps): ReactElement {
  const style = useStyle();

  const mappedData = Object.entries(SLICE_CONFIG)
    .filter(
      ([key]) => data[key as keyof OneClickVerificationPieChartData] != null,
    )
    .map(([key, config]) => ({
      name: config.name,
      value: data[key as keyof OneClickVerificationPieChartData] ?? 0,
      color:
        colors?.[key as keyof OneClickVerificationPieChartColors] ??
        config.color,
    }));

  if (!mappedData.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!mappedData.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <PieChart
      data={mappedData}
      legendToggle
      allActive
      sx={{
        ...style.smallChartWrapper,
        opacity: isFetching ? 0.4 : 1,
        ...sx,
      }}
    />
  );
}
