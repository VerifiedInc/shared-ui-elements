import { type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  CartesianGrid,
  DefaultTooltipContent,
  Dot,
  Label,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  useActiveTooltipLabel,
  type DotProps,
} from 'recharts';

import { ChartCursor } from '../ChartCursor';
import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';

import { SeriesChartLegend } from '../SeriesChartLegend';
import { DEFAULT_TIMEZONE } from '../../form/TimezoneInput/timezones';

interface ChartDataPoint {
  date: number;
  value: number;
}

export interface SeriesChartData {
  uuid: string;
  name: string;
  description?: string;
  color: string;
  chartData: ChartDataPoint[];
  brandUuid?: string;
  brandName?: string;
}

/**
 * The hover dot, only on a series that has a point at the hovered date. Recharts 3 otherwise marks
 * each series' point at the same index, which can be another date (see the tooltip below).
 */
function ActiveDotAtHoveredDate(
  props: DotProps & { payload?: ChartDataPoint },
): ReactElement | null {
  const hoveredDate = useActiveTooltipLabel();
  return props.payload?.date === hoveredDate ? <Dot {...props} /> : null;
}

interface SeriesChartProps {
  label: string;
  data: SeriesChartData[];
  filter: { timezone?: string };
  sx?: SxProps;
  showUuid?: boolean;
  showLegend?: boolean;
}

export function SeriesChart(props: SeriesChartProps): ReactElement {
  const theme = useTheme();

  // Default to UTC if no timezone is provided
  const { timezone = DEFAULT_TIMEZONE } = props.filter;

  return (
    <Box sx={{ width: '100%', height: '100%', ...props.sx }}>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          accessibilityLayer={false}
          margin={{
            top: 5,
            right: 60,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='date'
            // Tick configuration
            type='number'
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) =>
              formatDateMMYY(value, {
                timeZone: timezone,
                hour12: false,
                hour: 'numeric',
              })
            }
            allowDuplicatedCategory={false}
            tickLine={false}
            fontSize={12}
            tickMargin={12}
          />
          <YAxis
            textAnchor='end'
            dataKey='value'
            tickLine={false}
            tickFormatter={(value) => Number(value).toLocaleString()}
            allowDecimals={false}
            domain={[1, 'dataMax']}
          >
            {props.label && (
              <Label
                value={props.label}
                angle={-90}
                position='insideLeft'
                style={{ textAnchor: 'middle' }}
              />
            )}
          </YAxis>
          <Tooltip
            cursor={<ChartCursor color={theme.palette.neutral.main} />}
            formatter={(value) => Number(value).toLocaleString()}
            labelFormatter={(value) =>
              formatExtendedDate(Number(value), {
                timeZone: timezone,
                hour12: false,
              })
            }
            itemSorter={(item) => -Number(item?.value ?? 0)}
            // Each series carries its own data. When a series has no point at the hovered date, Recharts 3
            // falls back to its point at the same index (another date); list only the series that have one.
            content={(tooltipProps) => (
              <DefaultTooltipContent
                {...tooltipProps}
                payload={tooltipProps.payload?.filter(
                  (entry) => entry.payload?.date === tooltipProps.label,
                )}
              />
            )}
          />
          {props.showLegend !== false && (
            <Legend
              itemSorter={null}
              content={<SeriesChartLegend showUuid={props.showUuid} />}
            />
          )}
          {props.data.map((value) => {
            return (
              <Line
                {...{
                  uuid: value.brandUuid ?? value.uuid,
                  description: value.description,
                  brandName: value.brandName,
                }}
                key={value.uuid}
                name={value.name}
                dataKey='value'
                data={value.chartData}
                type='monotone'
                stroke={value.color}
                strokeWidth={2}
                activeDot={<ActiveDotAtHoveredDate />}
                isAnimationActive={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export * from './SeriesChart.map';
