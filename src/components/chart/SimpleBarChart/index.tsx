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

interface Series {
  key: string;
  dataKey: string;
  color?: string;
}

interface SimpleBarChartProps {
  data: Array<Record<string, number | string>>;
  series: Series[];
  xAxisDataKey: string;
  xAxisProps?: ComponentProps<typeof XAxis>;
  yAxisProps?: ComponentProps<typeof YAxis>;
  referenceLines?: Array<ComponentProps<typeof ReferenceLine>>;
  sx?: SxProps;
}

export function SimpleBarChart({
  data,
  series,
  xAxisDataKey,
  xAxisProps,
  yAxisProps,
  referenceLines,
  sx,
}: SimpleBarChartProps): ReactElement {
  const theme = useTheme();

  const filterOnlyBack = (line: ComponentProps<typeof ReferenceLine>) =>
    !line.isFront;
  const filterOnlyFront = (line: ComponentProps<typeof ReferenceLine>) =>
    line.isFront;

  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis
            dataKey={xAxisDataKey}
            tickLine={false}
            fontSize={12}
            tickMargin={12}
            {...xAxisProps}
          />
          <YAxis textAnchor='end' tickLine={false} {...yAxisProps} />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
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
