import { type ReactElement } from 'react';
import { useTheme, type SxProps } from '@mui/material';

import { RISK_SCORE_RANGES } from '../constants';

import { PieChart } from '../PieChart';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { NoRiskSignalsPermissionSection } from '../NoRiskSignalsPermissionSection';
import { useStyle } from '../styles';

export interface RiskScorePieChartProps {
  /**
   * Array of data points containing values for the pie chart segments like:
   * [{ value: 1000 }, { value: 2000 }, { value: 3000 }]
   * First index represents Allow (0-400), second Flag (401-600), and Block (601-1000).
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
   * Whether the user has permission to view risk signals
   */
  hasPermissionToDisplay?: boolean;
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
  hasPermissionToDisplay = true,
  sx,
}: RiskScorePieChartProps): ReactElement {
  const theme = useTheme();
  const style = useStyle();

  if (!hasPermissionToDisplay) {
    return <NoRiskSignalsPermissionSection />;
  }

  if ((!data || data.length <= 0) && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data || data.length <= 0 || !isSuccess) {
    return <EmptyChartSection />;
  }

  const mappedData = [
    {
      name: RISK_SCORE_RANGES.ALLOW.NAME,
      customText: RISK_SCORE_RANGES.ALLOW.LABEL,
      value: data[0].value,
      color: theme.palette.primary.main,
    },
    {
      name: RISK_SCORE_RANGES.FLAG.NAME,
      customText: RISK_SCORE_RANGES.FLAG.LABEL,
      value: data[1].value,
      color: theme.palette.warning.main,
    },
    {
      name: RISK_SCORE_RANGES.BLOCK.NAME,
      customText: RISK_SCORE_RANGES.BLOCK.LABEL,
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
