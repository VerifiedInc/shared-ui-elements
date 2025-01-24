import { type ComponentProps, type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  chartDefaultProps,
  xAxisDefaultProps,
  yAxisDefaultProps,
} from '../shared';

interface Series {
  key: string;
  dataKey: string;
  color?: string;
}

interface SimpleBarChartProps {
  data: Array<Record<string, number | string>>;
  series: Series[];
  xAxis?: ComponentProps<typeof XAxis>;
  yAxis?: ComponentProps<typeof YAxis>;
  tooltip?: ComponentProps<typeof Tooltip>;
  bar?: ComponentProps<typeof Bar>;
  referenceLines?: Array<ComponentProps<typeof ReferenceLine>>;
  sx?: SxProps;
}

export function SimpleBarChart({
  data,
  series,
  xAxis,
  yAxis,
  tooltip,
  bar,
  referenceLines,
  sx,
}: SimpleBarChartProps): ReactElement {
  const theme = useTheme();

  const filterOnlyBack = (
    line: ComponentProps<typeof ReferenceLine>,
  ): boolean => !line.isFront;
  const filterOnlyFront = (
    line: ComponentProps<typeof ReferenceLine>,
  ): boolean => !!line.isFront;

  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }}>
      <ResponsiveContainer>
        <ComposedChart data={data} {...chartDefaultProps}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis {...xAxisDefaultProps} {...xAxis} />
          <YAxis {...yAxisDefaultProps} {...yAxis} />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            {...tooltip}
          />
          {referenceLines
            ?.filter(filterOnlyBack)
            .map((line, index) => (
              <ReferenceLine key={index} {...(line as any)} />
            ))}
          {series.map((serie) => (
            <Bar
              key={serie.key}
              name={serie.key}
              dataKey={serie.dataKey}
              fill={serie.color}
              stackId='stack'
              isAnimationActive={false}
              {...(bar as any)}
            />
          ))}
          {referenceLines
            ?.filter(filterOnlyFront)
            .map((line, index) => (
              <ReferenceLine key={index} {...(line as any)} />
            ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
