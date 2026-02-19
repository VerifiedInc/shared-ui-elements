import { type ComponentProps, type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  Bar,
  Cell,
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
  /**
   * 'vertical' (default): bars grow upward, category on X axis.
   * 'horizontal': bars grow rightward, category on Y axis.
   */
  layout?: 'vertical' | 'horizontal';
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
  layout = 'vertical',
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

  const isHorizontal = layout === 'horizontal';

  const resolvedXAxisProps = isHorizontal
    ? { type: 'number' as const, hide: true, ...xAxis }
    : { ...xAxisDefaultProps, ...xAxis };

  const resolvedYAxisProps = isHorizontal
    ? {
        type: 'category' as const,
        tickLine: false,
        axisLine: false,
        width: 120,
        ...yAxis,
      }
    : { ...yAxisDefaultProps, ...yAxis };

  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          {...chartDefaultProps}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            {...(isHorizontal ? { horizontal: false } : { vertical: false })}
          />
          <XAxis {...resolvedXAxisProps} />
          <YAxis {...resolvedYAxisProps} />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            {...tooltip}
          />
          {referenceLines
            ?.filter(filterOnlyBack)
            .map((line, index) => (
              <ReferenceLine key={line.label ?? index} {...(line as any)} />
            ))}
          {referenceAreas
            ?.filter(filterOnlyBack)
            .map((area, index) => (
              <ReferenceArea key={area.label ?? index} {...(area as any)} />
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
            >
              {data.some((d) => d.color) &&
                data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={(entry.color as string) ?? serie.color}
                  />
                ))}
            </Bar>
          ))}
          {referenceLines
            ?.filter(filterOnlyFront)
            .map((line, index) => (
              <ReferenceLine key={line.label ?? index} {...(line as any)} />
            ))}
          {referenceAreas
            ?.filter(filterOnlyFront)
            .map((area, index) => (
              <ReferenceArea key={area.label ?? index} {...(area as any)} />
            ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
