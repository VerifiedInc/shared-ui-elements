import { type ReactElement } from 'react';
import { useTheme, type SxProps } from '@mui/material';
import { Label } from 'recharts';

import { SimpleBarChart } from '../SimpleBarChart';

/**
 * Props for the ErrorCodesChart component
 */
interface ErrorCodesChartProps {
  /**
   * Data object containing error codes and their occurrence counts.
   * The data should follow the structure: Record<string, number>
   * Example: { OCE000: 150, OCE001: 75 }
   */
  data: Record<string, number> | undefined;
  /**
   * MUI System props object for custom styling of the chart container
   */
  sx?: SxProps;
}

/**
 * A bar chart component that visualizes error code occurrences.
 *
 * The chart displays error codes on the x-axis and their counts on the y-axis.
 * It includes a reference line at y=100 to indicate an unhealthy threshold.
 * Each error code is represented by a bar with a light error color from the theme.
 *
 * @example
 * ```tsx
 * <ErrorCodesChart
 *   data={{
 *     OCE000: 150,
 *     OCE001: 75
 *   }}
 *   sx={{ width: 800, height: 400 }}
 * />
 * ```
 */
export function ErrorCodesChart({
  data,
  sx,
}: ErrorCodesChartProps): ReactElement {
  const theme = useTheme();

  const _data = Object.entries(data ?? {}).map(([errorCode, value]) => ({
    key: errorCode,
    [errorCode]: value,
  }));

  const series = _data.map(({ key }) => ({
    key,
    dataKey: key,
    color: theme.palette.error.light,
  }));

  return (
    <SimpleBarChart
      sx={sx}
      data={_data}
      series={series}
      xAxis={{
        tickLine: false,
        dataKey: 'key',
      }}
      yAxis={{
        tickLine: false,
        domain: [0, 'dataMax + 100'],
      }}
      tooltip={{
        labelFormatter: (value) => 'Total',
      }}
      referenceLines={[
        {
          y: 100,
          stroke: theme.palette.error.dark,
          strokeDasharray: '3 3',
          label: (
            <Label value='Unhealthy threshold' position='insideBottomRight' />
          ),
          isFront: true,
        },
      ]}
    />
  );
}
