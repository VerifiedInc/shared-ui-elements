import { type ReactElement } from 'react';
import { type SxProps } from '@mui/material';

import { PieChart, type DataPoint } from '../PieChart';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { useStyle } from '../styles';

export interface OneClickVerificationPieChartProps {
  /**
   * Array of data points for the pie chart slices.
   * Each item needs a `name` and `value`, with an optional `color`.
   * @example [{ name: 'Verified', value: 7788, color: '#0dbc3d' }, { name: 'Failed', value: 1003, color: '#eb0d28' }]
   */
  data: DataPoint[];
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  sx?: SxProps;
}

export function OneClickVerificationPieChart({
  data,
  isLoading,
  isFetching,
  isSuccess,
  sx,
}: OneClickVerificationPieChartProps): ReactElement {
  const style = useStyle();

  if ((!data || data.length <= 0) && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data || data.length <= 0 || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <PieChart
      data={data}
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
