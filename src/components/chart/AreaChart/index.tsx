import { type ComponentProps, type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
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
import { CurveType } from 'recharts/types/shape/Curve';

export interface AreaSeriesChartData {
  key: string;
  dataKey: string;
  color?: string;
}

interface AreaChartProps {
  data: Array<Record<string, number | string>>;
  series: AreaSeriesChartData[];
  color?: string;
  xAxis?: ComponentProps<typeof XAxis>;
  yAxis?: ComponentProps<typeof YAxis>;
  tooltip?: ComponentProps<typeof Tooltip>;
  area?: ComponentProps<typeof Area>;
  referenceLines?: Array<ComponentProps<typeof ReferenceLine>>;
  referenceAreas?: Array<ComponentProps<typeof ReferenceArea>>;
  sx?: SxProps;
  isAnimationActive?: boolean;
  areaType?: CurveType;
}

export function AreaChart({
  data,
  series,
  color,
  xAxis,
  yAxis,
  tooltip,
  area,
  referenceLines,
  referenceAreas,
  sx,
  isAnimationActive = false,
  areaType = 'monotone',
}: AreaChartProps): ReactElement {
  const theme = useTheme();
  const defaultColor = color ?? theme.palette.primary.main;

  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }}>
      <ResponsiveContainer>
        <RechartsAreaChart data={data} {...chartDefaultProps}>
          <defs>
            {series.map((serie, idx) => {
              const safeId = `gradient-${idx}`;
              const color = serie.color ?? defaultColor;
              return (
                <linearGradient
                  key={safeId}
                  id={safeId}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop offset='5%' stopColor={color} stopOpacity={0.2} />
                  <stop offset='95%' stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis {...xAxisDefaultProps} {...xAxis} />
          <YAxis {...yAxisDefaultProps} {...yAxis} />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            {...tooltip}
          />
          {referenceLines?.map((line, index) => (
            <ReferenceLine key={line.label ?? index} {...(line as any)} />
          ))}
          {referenceAreas?.map((refArea, index) => (
            <ReferenceArea key={refArea.label ?? index} {...(refArea as any)} />
          ))}
          {series.map((serie, idx) => {
            const safeId = `gradient-${idx}`;
            const color = serie.color ?? defaultColor;
            return (
              <Area
                key={serie.key}
                name={serie.key}
                dataKey={serie.dataKey}
                fill={`url(#${safeId})`}
                stroke={color}
                strokeWidth={2}
                type={areaType}
                isAnimationActive={isAnimationActive}
                {...(area as any)}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
