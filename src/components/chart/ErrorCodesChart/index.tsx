import { type ReactElement } from 'react';
import { useTheme, type SxProps } from '@mui/material';
import { Label } from 'recharts';

import { SimpleBarChart } from '../SimpleBarChart';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { useStyle } from '../styles';

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
 *   threshold={200}
 *   isLoading={false}
 *   isFetching={false}
 *   isSuccess={true}
 *   sx={{ width: 800, height: 400 }}
 * />
 * ```
 */
export function ErrorCodesChart({
  data,
  threshold = 120,
  isLoading,
  isFetching,
  isSuccess,
  sx,
}: ErrorCodesChartProps): ReactElement {
  const theme = useTheme();
  const style = useStyle();

  const _data = Object.entries(data ?? {}).map(([errorCode, value]) => ({
    key: errorCode,
    [errorCode]: value,
  }));

  const series = _data.map(({ key }) => ({
    key,
    dataKey: key,
    color: theme.palette.error.light,
  }));

  if (isLoading) {
    return <LoadingChartSection />;
  }

  if (!data || Object.keys(data).length === 0 || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <SimpleBarChart
      sx={{
        ...style.smallChartWrapper,
        opacity: isFetching ? 0.4 : 1,
        ...sx,
      }}
      data={_data}
      series={series}
      xAxis={{
        tickLine: false,
        dataKey: 'key',
      }}
      yAxis={{
        tickLine: false,
        domain: [0, `dataMax + ${threshold > 0 ? threshold + 5 : 0}`],
      }}
      tooltip={{
        labelFormatter: (value) => 'Total',
      }}
      referenceLines={[
        {
          y: threshold,
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
