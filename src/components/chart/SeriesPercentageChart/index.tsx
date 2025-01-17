import React, { type ReactElement, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Decimal from 'decimal.js';
import { Box, type SxProps } from '@mui/material';

import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';

interface KeyValue {
  key: string;
  name: string;
  color: string;
}

interface ChartDataPoint {
  date: number;
  [key: string]: number; // Allow dynamic key access
}

interface SeriesChartData {
  uuid: string;
  chartData: ChartDataPoint[];
}

interface SeriesPercentageChartProps {
  data: SeriesChartData[];
  filter: { timezone: string };
  keyValues: KeyValue[];
  sx?: SxProps;
}

interface FormattedChartData {
  date: string;
  total: number;
  oneClickSuccess: number;
  oneClickCreated: number;
  oneClickCancelled: number;
  [key: string]: string | number; // Allow dynamic key access
}

const formatChartData = (
  data: SeriesChartData[],
  keyValues: KeyValue[],
): FormattedChartData[] => {
  // Create a map to store all unique dates
  const dateMap = new Map<number, FormattedChartData>();

  // Collect all unique dates from all series
  data.forEach((series) => {
    series.chartData.forEach((point) => {
      if (!dateMap.has(point.date)) {
        const entry: FormattedChartData = {
          date: point.date.toString(),
          total: 0,
          oneClickSuccess: 0,
          oneClickCreated: 0,
          oneClickCancelled: 0,
        };
        // Initialize all keyValues with 0
        keyValues.forEach(({ key }) => {
          entry[key] = 0;
        });
        dateMap.set(point.date, entry);
      }

      // Add the values for each key
      keyValues.forEach(({ key }) => {
        const currentEntry = dateMap.get(
          point.date,
        ) as unknown as FormattedChartData;
        currentEntry[key] = point[key] || 0;
      });
    });
  });

  // Convert the map to array and add totals
  return Array.from(dateMap.values())
    .map((entry) => {
      const total = keyValues.reduce(
        (sum, { key }) => sum + ((entry[key] as number) || 0),
        0,
      );
      return {
        ...entry,
        total,
      };
    })
    .sort((a, b) => parseInt(a.date) - parseInt(b.date));
};

export function SeriesPercentageChart(
  props: SeriesPercentageChartProps,
): ReactElement {
  const formattedData = useMemo(() => {
    if (!props.data) return [];
    return formatChartData(props.data, props.keyValues);
  }, [props.data, props.keyValues]);

  return (
    <Box sx={{ width: '100%', height: '100%', ...props.sx }}>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          data={formattedData}
          stackOffset='expand'
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 60,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='date'
            type='number'
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) =>
              formatDateMMYY(value, {
                timeZone: props.filter.timezone,
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
            tickLine={false}
            tickFormatter={(value) => `${(value * 100).toFixed(2)}%`}
          />
          <Tooltip
            formatter={(value, name, item) => {
              const total = item.payload.total;
              const percentage =
                total === 0
                  ? '0.00'
                  : new Decimal(value.toString())
                      .div(total)
                      .mul(100)
                      .toFixed(2, Decimal.ROUND_DOWN);

              return [`${value.toString()} (${percentage}%)`, name];
            }}
            labelFormatter={(value) =>
              formatExtendedDate(value, {
                timeZone: props.filter.timezone,
                hour12: false,
              })
            }
          />
          {props.keyValues.map((keyValue) => (
            <Area
              key={keyValue.key}
              type='monotone'
              dataKey={keyValue.key}
              name={keyValue.name}
              stackId='1'
              stroke={keyValue.color}
              fill={keyValue.color}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
