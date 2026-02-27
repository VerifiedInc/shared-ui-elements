import React from 'react';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { SeriesPercentageChart } from '../SeriesPercentageChart';
import { useStyle } from '../styles';

export interface OneClickHealthChartData {
  uuid: string;
  name?: string;
  color?: string;
  integrationType?: string;
  chartData: Array<{
    date: string;
    oneClickHealthSucceeded: number;
    oneClickHealthCreated: number;
  }>;
}

interface OneClickHealthPercentageChartProps {
  data: OneClickHealthChartData[];
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  filter?: any;
  sx?: any;
}

/**
 * @deprecated Use {@link OneClickHealthSynchronizedMetricsChart} instead.
 * This component will be removed in a future version.
 */
export function OneClickHealthPercentageChart({
  data,
  isLoading,
  isFetching,
  isSuccess,
  filter,
  sx,
}: Readonly<OneClickHealthPercentageChartProps>) {
  const style = useStyle();

  const KEY_VALUES = {
    oneClickHealthCreated: {
      key: 'oneClickHealthCreated',
      name: 'Started',
      isTotal: true,
    },
    oneClickHealthSucceeded: {
      key: 'oneClickHealthSucceeded',
      name: 'Finished',
    },
  };

  if (!data.length && isLoading) {
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
