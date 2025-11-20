import { type ReactElement } from 'react';
import { Box, useTheme, type SxProps } from '@mui/material';
import {
  CartesianGrid,
  Label,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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
}

interface SeriesChartProps {
  label: string;
  data: SeriesChartData[];
  filter: { timezone?: string };
  sx?: SxProps;
  showUuid?: boolean;
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
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            formatter={(value) => Number(value).toLocaleString()}
            labelFormatter={(value) =>
              formatExtendedDate(value, {
                timeZone: timezone,
                hour12: false,
              })
            }
            itemSorter={(item) => -Number(item?.value ?? 0)}
          />
          <Legend content={<SeriesChartLegend showUuid={props.showUuid} />} />
          {props.data.map((value) => {
            return (
              <Line
                {...{
                  uuid: value.uuid,
                  description: value.description,
                }}
                key={value.uuid}
                name={value.name}
                dataKey='value'
                data={value.chartData}
                type='monotone'
                stroke={value.color}
                strokeWidth={2}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export * from './SeriesChart.map';
