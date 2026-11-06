import { type ComponentProps, type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  DefaultZIndexes,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCursor } from '../ChartCursor';
import {
  chartDefaultProps,
  keepDeclaredOrder,
  xAxisDefaultProps,
  yAxisDefaultProps,
} from '../shared';

interface Series {
  key: string;
  dataKey: string;
  color?: string;
}

/**
 * Recharts 2 stacked chart elements in render order; Recharts 3 stacks them by z-index. This keeps the
 * old contract: a reference is drawn behind the bars unless it sets `isFront`.
 */
interface ReferenceLayer {
  isFront?: boolean;
}

const referenceZIndex = (isFront?: boolean): number =>
  isFront ? DefaultZIndexes.line : DefaultZIndexes.area;

interface SimpleBarChartProps {
  data: Array<Record<string, number | string>>;
  series: Series[];
  xAxis?: ComponentProps<typeof XAxis>;
  yAxis?: ComponentProps<typeof YAxis>;
  tooltip?: ComponentProps<typeof Tooltip>;
  bar?: ComponentProps<typeof Bar>;
  referenceLines?: Array<ComponentProps<typeof ReferenceLine> & ReferenceLayer>;
  referenceAreas?: Array<ComponentProps<typeof ReferenceArea> & ReferenceLayer>;
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

  return (
    <Box sx={{ width: '100%', height: '100%', ...sx }}>
      <ResponsiveContainer>
        <ComposedChart data={data} {...chartDefaultProps}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis {...xAxisDefaultProps} {...xAxis} />
          <YAxis {...yAxisDefaultProps} {...yAxis} />
          <Tooltip
            cursor={<ChartCursor color={theme.palette.neutral.main} />}
            {...tooltip}
            itemSorter={tooltip?.itemSorter ?? keepDeclaredOrder}
          />
          {referenceLines?.map(({ isFront, ...line }, index) => (
            <ReferenceLine
              key={line.label ?? index}
              zIndex={referenceZIndex(isFront)}
              {...(line as any)}
            />
          ))}
          {referenceAreas?.map(({ isFront, ...area }, index) => (
            <ReferenceArea
              key={area.label ?? index}
              zIndex={referenceZIndex(isFront)}
              {...(area as any)}
            />
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
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
