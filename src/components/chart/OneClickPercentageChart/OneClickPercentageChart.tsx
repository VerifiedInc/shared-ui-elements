import { useTheme } from '@mui/material';
import React from 'react';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { SeriesPercentageChart } from '../SeriesPercentageChart';
import { useStyle } from '../styles';

export interface OneClickChartData {
  uuid: string;
  name?: string;
  color?: string;
  chartData: Array<{
    date: string;
    oneClickSuccess: number;
    oneClickCreated: number;
  }>;
}

interface OneClickPercentageChartProps {
  data: OneClickChartData[];
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  filter?: any;
  sx?: any;
}

export function OneClickPercentageChart({
  data,
  isLoading,
  isFetching,
  isSuccess,
  filter,
  sx,
}: Readonly<OneClickPercentageChartProps>): React.ReactNode {
  const theme = useTheme();
  const style = useStyle();

  const KEY_VALUES = {
    oneClickCreated: {
      key: 'oneClickCreated',
      name: 'Started',
      isTotal: true,
    },
    oneClickSuccess: {
      key: 'oneClickSuccess',
      name: 'Finished',
    },
  };

  if (isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length || !data[0]?.chartData?.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <SeriesPercentageChart
      data={data}
      keyValues={Object.values(KEY_VALUES)}
      filter={filter}
      sx={{
        ...style.smallChartWrapper,
        opacity: isFetching ? 0.4 : 1,
        ...sx,
      }}
    />
  );
}
