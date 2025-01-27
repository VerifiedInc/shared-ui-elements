import { type ReactElement, useState, useRef, useEffect } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  type PieProps,
} from 'recharts';

import { chartDefaultProps } from '../shared';

import { SimpleLegend, type Payload } from '../SimpleLegend';

import { renderActiveShape } from './renderActiveShape';
import { renderNeedle } from './renderNeedle';

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
   * Optional visibility for the legend
   * @default false
   */
  legendToggle?: boolean;
  /**
   * Optional prefix for the value label
   * @default ''
   */
  valuePrefix?: string;
  /**
   * Optional visibility for the value percentage
   * @default true
   */
  valuePercentage?: boolean;
  /**
   * Optional visibility for the needle
   * @default false
   */
  needleVisible?: boolean;
  /**
   * Optional needle value to display on the chart
   */
  needleValue?: number;
  /**
   * Optional color for the needle
   * @default '#d0d000'
   */
  needleColor?: string;
  /**
   * Optional props object for the Pie component
   */
  pie?: Partial<PieProps>;
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
  legendToggle = false,
  valuePrefix = '',
  valuePercentage = true,
  pie,
  needleVisible = false,
  needleValue,
  needleColor = '#aaa',
}: PieChartProps): ReactElement {
  const { innerRadius = 60, outerRadius = 100 } = pie ?? {};
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxDimensions, setBoxDimensions] = useState<DOMRectReadOnly | null>(
    null,
  );
  const [legendDimensions, setLegendDimensions] =
    useState<DOMRectReadOnly | null>(null);

  const onPieEnter = (_: any, index: number): void => {
    setActiveIndex(index);
  };

  const onPieLeave = (): void => {
    setActiveIndex(undefined);
  };

  const toggleDataPoint = (payload: Payload): void => {
    if (!legendToggle) return;
    if (!payload) return;

    setHiddenItems((prev) => {
      const newHiddenItems = new Set(prev);
      if (newHiddenItems.has(payload.name)) {
        newHiddenItems.delete(payload.name);
      } else if (newHiddenItems.size < data.length - 1) {
        newHiddenItems.add(payload.name);
      }
      return newHiddenItems;
    });
  };

  const filteredData = data.map((item) => ({
    ...item,
    value: hiddenItems.has(item.name) ? 0 : item.value,
  }));

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const observer = new ResizeObserver((entries) => {
      const bounds = entries[0]?.contentRect;
      if (bounds) {
        setBoxDimensions(bounds);
      }
    });

    observer.observe(box);

    // Initial measurement
    const bounds = box.getBoundingClientRect();
    setBoxDimensions(bounds);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const legendWrapper = boxRef.current?.querySelector(
      '.recharts-legend-wrapper',
    );
    if (!legendWrapper) {
      const interval = setInterval(() => {
        const element = boxRef.current?.querySelector(
          '.recharts-legend-wrapper',
        );

        if (element) {
          const bounds = element.getBoundingClientRect();
          setLegendDimensions(bounds);
          clearInterval(interval);
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }

    const observer = new ResizeObserver((entries) => {
      const bounds = entries[0]?.contentRect;
      if (bounds) {
        setLegendDimensions(bounds);
      }
    });

    observer.observe(legendWrapper);

    // Initial measurement
    const bounds = legendWrapper.getBoundingClientRect();
    setLegendDimensions(bounds);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      ref={boxRef}
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
            nameKey='name'
            dataKey='value'
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            activeIndex={activeIndex}
            activeShape={(props: any) =>
              renderActiveShape({
                ...props,
                valuePrefix,
                valuePercentage,
                needleVisible,
              })
            }
            paddingAngle={0}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            {...(pie as any)}
          >
            {filteredData.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.color ?? getDefaultSeriesColor(entry.name, theme)}
                opacity={hiddenItems.has(entry.name) ? 0.5 : 1}
                stroke='none'
              />
            ))}
          </Pie>
          <Legend
            content={
              <SimpleLegend
                legendLabel={legendLabel}
                hiddenItems={hiddenItems}
                onToggle={toggleDataPoint}
              />
            }
          />
          {needleVisible &&
            needleValue !== undefined &&
            boxDimensions &&
            legendDimensions &&
            renderNeedle({
              data: filteredData,
              value: needleValue,
              color: needleColor,
              innerRadius,
              outerRadius,
              boxDimensions,
              legendDimensions,
              valuePrefix,
            })}
        </RechartsPieChart>
      </ResponsiveContainer>
    </Box>
  );
}
