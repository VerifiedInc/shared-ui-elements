import { type ComponentProps, type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ReferenceArea,
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
  referenceAreas?: Array<ComponentProps<typeof ReferenceArea>>;
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
  referenceAreas,
  sx,
}: SimpleBarChartProps): ReactElement {
  const theme = useTheme();

  const filterOnlyBack = (reference: any): boolean => !reference.isFront;
  const filterOnlyFront = (reference: any): boolean => !!reference.isFront;

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
            .map((line) => (
              <ReferenceLine key={JSON.stringify(line)} {...(line as any)} />
            ))}
          {referenceAreas
            ?.filter(filterOnlyBack)
            .map((area) => (
              <ReferenceArea key={JSON.stringify(area)} {...(area as any)} />
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
            .map((line) => (
              <ReferenceLine key={JSON.stringify(line)} {...(line as any)} />
            ))}
          {referenceAreas
            ?.filter(filterOnlyFront)
            .map((area) => (
              <ReferenceArea key={JSON.stringify(area)} {...(area as any)} />
            ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
