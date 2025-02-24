import { type ReactElement } from 'react';
import { useTheme, type SxProps } from '@mui/material';

import { SimpleBarChart } from '../SimpleBarChart';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { useStyle } from '../styles';

export interface RiskScoreBarChartProps {
  data: Array<Record<number, number>>;
  /**
   * Threshold value for the reference line
   */
  threshold?: number;
  /**
   * Data loading state
   */
  isLoading: boolean;
  /**
   * Data fetching state
   */
  isFetching: boolean;
  /**
   * Data success state
   */
  isSuccess: boolean;
  /**
   * MUI System props object for custom styling of the chart container
   */
  sx?: SxProps;
}

export function RiskScoreBarChart({
  data,
  isLoading,
  isFetching,
  isSuccess,
  sx,
}: RiskScoreBarChartProps): ReactElement {
  const theme = useTheme();
  const style = useStyle();

  const transformData = (
    inputData: Array<Record<number, number>>,
  ): Array<Record<number, number>> => {
    const aggregatedData: Record<number, number> = {};

    // Aggregate all scores
    inputData.forEach((score) => {
      Object.entries(score).forEach(([key, value]) => {
        const numKey = parseInt(key);
        if (numKey <= 1000) {
          aggregatedData[numKey] = (aggregatedData[numKey] || 0) + value;
        }
      });
    });

    // Create array from 0 to 1000 and map values from aggregatedData
    return Array.from({ length: 1001 }, (_, index) => ({
      key: index.toString(),
      value: aggregatedData[index] || 0,
    }));
  };

  const transformedData = transformData(data);

  const series = [
    {
      key: 'Risk Score',
      dataKey: 'value',
      color: theme.palette.error.main,
    },
  ];

  if (isLoading) {
    return <LoadingChartSection />;
  }

  if (!data || Object.keys(data).length === 0 || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <SimpleBarChart
      data={transformedData}
      series={series}
      sx={{
        ...style.smallChartWrapper,
        opacity: isFetching ? 0.4 : 1,
        ...sx,
      }}
      yAxis={{
        label: { value: 'Count', angle: -90, position: 'insideLeft' },
        domain: [0, 'dataMax + 10'],
      }}
      xAxis={{
        domain: [0, 'dataMax'],
        interval: 'preserveStartEnd',
      }}
      tooltip={{
        labelFormatter: () => 'Risk Score',
        formatter: (value, _, props) => {
          return [value, props.payload.key];
        },
      }}
      referenceAreas={[
        {
          x1: 0,
          x2: 299,
          fill: '#ffffff00',
          isFront: false,
          label: 'Allow',
        },
        {
          x1: 300,
          x2: 600,
          fill: theme.palette.warning.light,
          isFront: false,
          label: 'Flag',
        },
        {
          x1: 600,
          fill: theme.palette.error.light,
          isFront: false,
          label: 'Block',
        },
      ]}
    />
  );
}
