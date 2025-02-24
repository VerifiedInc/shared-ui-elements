import { type ReactElement } from 'react';
import { useTheme, type SxProps } from '@mui/material';

import { PieChart } from '../PieChart';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { useStyle } from '../styles';

export interface RiskScorePieChartProps {
  /**
   * Array of data points containing values for the pie chart segments like:
   * [{ value: 1000 }, { value: 2000 }, { value: 3000 }]
   * First index represents 0-299, second 300-599, and 600-1000.
   */
  data: Array<{ value: number }>;
  /** The current risk score value (0-1000) */
  score?: number;
  /** Optional label for the legend */
  legendLabel?: string;
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
 * A specialized pie chart for displaying risk scores.
 * Displays a semi-circular gauge with three segments (Allow, Flag, Block)
 * and a needle indicating the current score.
 */
export function RiskScorePieChart({
  data,
  score = 200,
  legendLabel,
  isLoading,
  isFetching,
  isSuccess,
  sx,
}: RiskScorePieChartProps): ReactElement {
  const theme = useTheme();
  const style = useStyle();

  if (isLoading) {
    return <LoadingChartSection />;
  }

  if (!data || data.length <= 0 || !isSuccess) {
    return <EmptyChartSection />;
  }

  const mappedData = [
    {
      name: 'Allow',
      customText: '0-299',
      value: data[0].value,
      color: theme.palette.primary.main,
    },
    {
      name: 'Flag',
      customText: '300-599',
      value: data[1].value,
      color: theme.palette.warning.main,
    },
    {
      name: 'Block',
      customText: 'Over 600',
      value: data[2].value,
      color: theme.palette.error.main,
    },
  ];

  return (
    <PieChart
      data={mappedData}
      legendToggle
      needleValue={score}
      legendLabel={legendLabel}
      allActive
      sx={{
        ...style.smallChartWrapper,
        opacity: isFetching ? 0.4 : 1,
        ...sx,
      }}
    />
  );
}
