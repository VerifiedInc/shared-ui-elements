import { type ComponentProps, type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
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
import { CurveType } from 'recharts/types/shape/Curve';

interface Series {
  key: string;
  dataKey: string;
  color?: string;
}

interface AreaChartProps {
  data: Array<Record<string, number | string>>;
  series: Series[];
  xAxis?: ComponentProps<typeof XAxis>;
  yAxis?: ComponentProps<typeof YAxis>;
  tooltip?: ComponentProps<typeof Tooltip>;
  area?: ComponentProps<typeof Area>;
  sx?: SxProps;
  isAnimationActive?: boolean;
  areaType?: CurveType;
}

export function AreaChart({
  data,
  series,
  xAxis,
  yAxis,
  tooltip,
  area,
  sx,
  isAnimationActive = false,
  areaType = 'monotone',
}: AreaChartProps): ReactElement {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }}>
      <ResponsiveContainer>
        <RechartsAreaChart data={data} {...chartDefaultProps}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis {...xAxisDefaultProps} {...xAxis} />
          <YAxis {...yAxisDefaultProps} {...yAxis} />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            {...tooltip}
          />
          {series.map(({ key, dataKey, color }) => (
            <Area
              key={key}
              name={key}
              dataKey={dataKey}
              fill={color}
              stroke={color}
              type={areaType}
              isAnimationActive={isAnimationActive}
              {...(area as any)}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
