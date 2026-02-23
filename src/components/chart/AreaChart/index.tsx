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
  /**
   * Chart data points. Each object should include the x-axis key and one key per series.
   * @example [{ month: 'Jan', revenue: 4000, costs: 2400 }, { month: 'Feb', revenue: 3000, costs: 1398 }]
   */
  data: Array<Record<string, number | string>>;
  /**
   * Series to render. Each entry maps a `dataKey` from `data` to an area on the chart.
   * @example [{ key: 'Revenue', dataKey: 'revenue', color: '#8884d8' }]
   */
  series: AreaSeriesChartData[];
  /** Fallback color for series without a `color`. Defaults to the theme's primary color. */
  color?: string;
  /** Override props for the XAxis component. Merged with default axis config. */
  xAxis?: ComponentProps<typeof XAxis>;
  /** Override props for the YAxis component. Merged with default axis config. */
  yAxis?: ComponentProps<typeof YAxis>;
  /** Override props for the Tooltip component. */
  tooltip?: ComponentProps<typeof Tooltip>;
  /** Override props applied to every Area element in the chart. */
  area?: ComponentProps<typeof Area>;
  /** Reference lines to highlight specific values or thresholds. */
  referenceLines?: Array<ComponentProps<typeof ReferenceLine>>;
  /** Shaded reference areas to highlight specific ranges. */
  referenceAreas?: Array<ComponentProps<typeof ReferenceArea>>;
  sx?: SxProps;
  /** Enable chart animation. @default false */
  isAnimationActive?: boolean;
  /** Curve interpolation type. @default 'monotone' */
  areaType?: CurveType;
  /** Stack mode for areas. 'none' renders independent areas; 'stack' stacks by count; 'expand' normalizes to 100%. @default 'none' */
  stackMode?: 'none' | 'stack' | 'expand';
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
  stackMode = 'none',
}: AreaChartProps): ReactElement {
  const theme = useTheme();
  const defaultColor = color ?? theme.palette.primary.main;

  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }}>
      <ResponsiveContainer>
        <RechartsAreaChart
          data={data}
          stackOffset={stackMode === 'expand' ? 'expand' : undefined}
          {...chartDefaultProps}
        >
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
                fillOpacity={stackMode !== 'none' ? 1 : 0.6}
                stroke={color}
                strokeWidth={2}
                type={areaType}
                isAnimationActive={isAnimationActive}
                stackId={stackMode !== 'none' ? 'stack' : undefined}
                {...(area as any)}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
