import React, { type ReactElement, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts';
import Decimal from 'decimal.js';
import { Box, useTheme, type SxProps } from '@mui/material';

import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';

interface KeyValue {
  key: string;
  name: string;
  color: string;
  isTotal?: boolean;
}

interface ChartDataPoint {
  date: string;
  [key: string]: string | number; // Allow both string and number values
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
  diff: number;
  totalKey: string;
  originalTotal: number;
  [key: string]: string | number; // Allow both string and number values
}

const formatChartData = (
  data: SeriesChartData[],
  keyValues: KeyValue[],
): FormattedChartData[] => {
  // Create a map to store all unique dates
  const dateMap = new Map<string, FormattedChartData>();

  // First pass: collect all data points
  data.forEach((series) => {
    series.chartData.forEach((point) => {
      const dateKey = new Date(point.date).getTime().toString();

      if (!dateMap.has(dateKey)) {
        const entry: FormattedChartData = {
          date: dateKey,
          total: 0,
          diff: 0,
          totalKey: '',
          originalTotal: 0,
        };
        // Initialize all keyValues with 0
        keyValues.forEach(({ key }) => {
          entry[key] = 0;
          entry[`${key}_absolute`] = 0;
        });
        dateMap.set(dateKey, entry);
      }

      // Add the values for each key
      keyValues.forEach(({ key }) => {
        const currentEntry = dateMap.get(
          dateKey,
        ) as unknown as FormattedChartData;
        const rawValue = point[key];
        // Convert string values to numbers, handling empty strings and undefined
        const value =
          typeof rawValue === 'string'
            ? rawValue.trim() === ''
              ? 0
              : parseInt(rawValue, 10)
            : typeof rawValue === 'number'
              ? rawValue
              : 0;

        // Store absolute value
        currentEntry[`${key}_absolute`] = value;
        // Initialize relative value (will be calculated later)
        currentEntry[key] = 0;
      });
    });
  });

  // Convert the map to array and calculate percentages
  return Array.from(dateMap.values())
    .map((entry) => {
      const totalKey = keyValues.find((kv) => kv.isTotal)?.key;
      const nonTotalKeys = keyValues
        .filter((kv) => !kv.isTotal)
        .map((kv) => kv.key);

      if (!totalKey || nonTotalKeys.length === 0) return entry;

      const totalValue = entry[`${totalKey}_absolute`] as number;

      // Store original total
      entry.originalTotal = totalValue;
      entry.total = totalValue;

      // Set total value to always be 100%
      entry[totalKey] = 100;

      // Calculate percentages for non-total fields
      nonTotalKeys.forEach((key) => {
        const absoluteValue = entry[`${key}_absolute`] as number;
        let percentage;

        if (totalValue === 0) {
          percentage = '100.00';
          entry[key] = 100;
        } else {
          percentage =
            totalValue > 0
              ? new Decimal(absoluteValue.toString())
                  .div(totalValue)
                  .mul(100)
                  .toFixed(2, Decimal.ROUND_DOWN)
              : '0.00';
          // Store the percentage for the area chart
          entry[key] = parseFloat(percentage);
        }
      });

      return {
        ...entry,
        totalKey,
      };
    })
    .sort((a, b) => parseInt(a.date) - parseInt(b.date));
};

export function SeriesPercentageChart(
  props: SeriesPercentageChartProps,
): ReactElement {
  const theme = useTheme();

  const brands = [
    {
      uuid: 'b07cbc37-fe8f-4920-a6b9-c4e9dfe193cd',
      name: 'Google',
      color: '#ff0000',
    },
    {
      uuid: 'b07cbc37-fe8f-4920-a6b9-c4e9dfe193cf',
      name: 'Apple',
      color: '#00ff00',
    },
  ];

  const formattedData = useMemo(() => {
    return [
      {
        date: '1739968920000',
        relative: 4,
        absolute: 4,
        brands: {
          'b07cbc37-fe8f-4920-a6b9-c4e9dfe193cd': {
            color: '#ff0000',
            name: 'Google',
            oneClickSuccess: 2,
            oneClickSuccess_absolute: 1,
          },
          'b07cbc37-fe8f-4920-a6b9-c4e9dfe193cf': {
            color: '#00ff00',
            name: 'Apple',
            oneClickSuccess: 1,
            oneClickSuccess_absolute: 1,
          },
        },
      },
      {
        date: '1739968950000',
        relative: 4,
        absolute: 4,
        brands: {
          'b07cbc37-fe8f-4920-a6b9-c4e9dfe193cd': {
            name: 'Google',
            oneClickSuccess: 1,
            oneClickSuccess_absolute: 1,
          },
          'b07cbc37-fe8f-4920-a6b9-c4e9dfe193cf': {
            name: 'Apple',
            oneClickSuccess: 1,
            oneClickSuccess_absolute: 1,
          },
        },
      },
    ];
    // if (!props.data) return [];
    // return formatChartData(props.data, props.keyValues);
  }, [props.data, props.keyValues]);

  console.log(formattedData);

  return (
    <Box sx={{ width: '100%', height: '100%', ...props.sx }}>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          data={formattedData}
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
            tickFormatter={(value) => `${value.toFixed(2)}%`}
          />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            labelFormatter={(value) =>
              formatExtendedDate(value, {
                timeZone: props.filter.timezone,
                hour12: false,
              })
            }
            formatter={(value, name, item) => {
              const totalKey = item.payload.totalKey;
              const dataKey = item.dataKey as string;
              const isTotal = dataKey === totalKey;

              // Get the absolute value for this specific key
              const absoluteValue = item.payload[`${dataKey}_absolute`];
              const total = item.payload.originalTotal;

              // Calculate percentage
              const percentage = !isTotal
                ? total === 0
                  ? '100.00'
                  : new Decimal(absoluteValue.toString())
                      .div(total)
                      .mul(100)
                      .toFixed(2, Decimal.ROUND_DOWN)
                : null;

              return [
                percentage
                  ? `${absoluteValue.toLocaleString()} (${percentage}%)`
                  : `${absoluteValue.toLocaleString()} (TOTAL)`,
                name,
              ];
            }}
          />

          <Area
            type='monotone'
            dataKey={(value) => 100}
            name='Total'
            stroke='#000000'
            fill={'transparent'}
            strokeWidth={0}
            dot={{ r: 4 }}
          />

          {brands.map((keyValue) => (
            <Area
              key={keyValue.uuid}
              type='monotone'
              dataKey={(value) => value.brands[keyValue.uuid].oneClickSuccess}
              name={keyValue.name}
              stroke={keyValue.color}
              fill={'transparent'}
              strokeWidth={2}
              fillOpacity={0.6}
              dot={{ r: 4 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
