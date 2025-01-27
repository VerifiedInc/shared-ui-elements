import { type ReactElement } from 'react';
import { useTheme, type SxProps } from '@mui/material';

import { SimpleBarChart } from '../SimpleBarChart';

interface RiskScoreBarChartProps {
  data: Array<Record<number, number>>;
  sx?: SxProps;
}

export function RiskScoreBarChart({
  data,
  sx,
}: RiskScoreBarChartProps): ReactElement {
  const theme = useTheme();
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

  return (
    <SimpleBarChart
      data={transformedData}
      series={series}
      sx={sx}
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
