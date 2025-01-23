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

interface SimpleBarChartProps {
  data: Array<{ key: string; value: number }>;
  color?: string;
  xAxisProps?: ComponentProps<typeof XAxis>;
  yAxisProps?: ComponentProps<typeof YAxis>;
  referenceLines?: Array<ComponentProps<typeof ReferenceLine>>;
  sx?: SxProps;
}

export function SimpleBarChart({
  data,
  color,
  xAxisProps,
  yAxisProps,
  referenceLines,
  sx,
}: SimpleBarChartProps): ReactElement {
  const theme = useTheme();

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
            dataKey='key'
            tickLine={false}
            fontSize={12}
            tickMargin={12}
            {...xAxisProps}
          />
          <YAxis textAnchor='end' tickLine={false} {...yAxisProps} />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
          />
          {referenceLines?.map((line, index) => (
            <ReferenceLine key={index} {...(line as any)} />
          ))}
          <Bar dataKey='value' fill={color} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
