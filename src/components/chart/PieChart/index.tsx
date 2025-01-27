import { type ReactElement, useState } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Sector,
} from 'recharts';

import { chartDefaultProps } from '../shared';

interface Payload {
  name: string;
  strokeDasharray: string | number;
  value?: any;
}

/**
 * Data point structure for the PieChart component
 */
interface DataPoint {
  /** Label for the data point */
  name: string;
  /** Numeric value for the data point */
  value: number;
  /** Optional color for the slice */
  color?: string;
}

/**
 * Props for the PieChart component
 */
interface PieChartProps {
  /**
   * Array of data points to display in the pie chart
   * Each point should have a name and value, and optionally a color
   */
  data: DataPoint[];
  /**
   * MUI System props object for custom styling of the chart container
   */
  sx?: SxProps;
  /**
   * Optional label for the chart's legend
   */
  legendLabel?: string;
  /**
   * Optional prefix for the value label
   * @default ''
   */
  valuePrefix?: string;
}

// Define fallback colors for each series if no color is provided
const getDefaultSeriesColor = (name: string, theme: any): string => {
  const colors: Record<string, string> = {
    Allow: theme.palette.success.main,
    Flag: theme.palette.warning.main,
    Block: theme.palette.error.main,
  };

  return colors[name] ?? theme.palette.primary.main;
};

const renderActiveShape = (props: any): ReactElement => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    valuePrefix,
  } = props;

  // Calculate positions for the line and text
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill='#333' fontSize={14}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 2}
        outerRadius={outerRadius + 6}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
        fontSize={12}
      >
        {valuePrefix ? `${valuePrefix} ${value}` : value}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={16}
        textAnchor={textAnchor}
        fill='#999'
        fontSize={11}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

/**
 * A pie chart component that visualizes proportional data.
 *
 * The chart displays data points as slices of a pie, with optional donut style.
 * It includes a legend and tooltips for better data visualization.
 * Colors can be provided in the data points or will default to theme-based colors.
 * Hovering over a slice shows detailed information about that segment.
 *
 * @example
 * ```tsx
 * <PieChart
 *   data={[
 *     { name: 'Group A', value: 400, color: '#ff0000' },
 *     { name: 'Group B', value: 300, color: '#00ff00' },
 *   ]}
 *   sx={{ width: 400, height: 400 }}
 *   legendLabel="Distribution"
 * />
 * ```
 */
export function PieChart({
  data,
  sx,
  legendLabel,
  valuePrefix = '',
}: PieChartProps): ReactElement {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());

  const onPieEnter = (_: any, index: number): void => {
    setActiveIndex(index);
  };

  const onPieLeave = (): void => {
    setActiveIndex(undefined);
  };

  const toggleDataPoint = (payload: Payload | undefined): void => {
    if (!payload) return;

    setHiddenItems((prev) => {
      const newHiddenItems = new Set(prev);
      if (newHiddenItems.has(payload.name)) {
        newHiddenItems.delete(payload.name);
      } else {
        newHiddenItems.add(payload.name);
      }
      return newHiddenItems;
    });
  };

  const filteredData = data.map((item) => ({
    ...item,
    value: hiddenItems.has(item.name) ? 0 : item.value,
  }));

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        '& g': {
          outline: 'none',
        },
        ...sx,
      }}
    >
      <ResponsiveContainer>
        <RechartsPieChart {...chartDefaultProps}>
          <Pie
            data={filteredData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={100}
            activeIndex={activeIndex}
            activeShape={(props: any) =>
              renderActiveShape({ ...props, valuePrefix })
            }
            paddingAngle={0}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {filteredData.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.color ?? getDefaultSeriesColor(entry.name, theme)}
                stroke='none'
                opacity={hiddenItems.has(entry.name) ? 0.5 : 1}
              />
            ))}
          </Pie>
          <Legend
            formatter={(value) =>
              legendLabel ? `${legendLabel}: ${value}` : value
            }
            onClick={(event) => {
              toggleDataPoint(event.payload as Payload | undefined);
            }}
            cursor='pointer'
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Box>
  );
}
