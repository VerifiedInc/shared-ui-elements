import { type ReactElement } from 'react';
import { useTheme, type SxProps } from '@mui/material';

import { PieChart, type DataPoint } from '../PieChart';

export interface RiskScorePieChartProps {
  data: Array<Pick<DataPoint, 'value'>>;
  /** Optional style overrides */
  sx?: SxProps;
  /** The current risk score value (0-1000) */
  score?: number;
  /** Optional label for the legend */
  legendLabel?: string;
}

/**
 * A specialized pie chart for displaying risk scores.
 * Displays a semi-circular gauge with three segments (Allow, Flag, Block)
 * and a needle indicating the current score.
 */
export function RiskScorePieChart({
  sx,
  data,
  score = 200,
  legendLabel,
}: RiskScorePieChartProps): ReactElement {
  const theme = useTheme();
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
      sx={sx}
    />
  );
}
