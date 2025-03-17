import React, { type ReactElement, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Decimal from 'decimal.js';
import { Box, useTheme, type SxProps, type Theme } from '@mui/material';

import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';

interface KeyValue {
  key: string;
  name: string;
  color: string;
  isTotal?: boolean;
}

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

interface SeriesChartData {
  uuid: string;
  name?: string;
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
  [key: string]: string | number;
}

const formatChartData = (
  data: SeriesChartData[],
  keyValues: KeyValue[],
): FormattedChartData[] => {
  const dateMap = new Map<string, FormattedChartData>();

  data.forEach((series) => {
    series.chartData.forEach((point) => {
      const dateKey = new Date(point.date).getTime().toString();

      if (!dateMap.has(dateKey)) {
        const entry: FormattedChartData = {
          date: dateKey,
        };
        dateMap.set(dateKey, entry);
      }

      const currentEntry = dateMap.get(dateKey) as FormattedChartData;

      // Add the values for each key with series prefix
      keyValues.forEach(({ key }) => {
        const seriesKey = `${series.uuid}_${key}`;
        const rawValue = point[key];
        const totalKey = keyValues.find((kv) => kv.isTotal)?.key;
        
        const value =
          typeof rawValue === 'string'
            ? rawValue.trim() === ''
              ? 0
              : parseInt(rawValue, 10)
            : typeof rawValue === 'number'
              ? rawValue
              : 0;

        currentEntry[`${seriesKey}_absolute`] = value;

        if (key !== totalKey) {
          const totalValue = point[totalKey || ''] as number;
          let percentage;

          if (totalValue === 0) {
            percentage = 100;
          } else {
            percentage =
              totalValue > 0
                ? parseFloat(
                    new Decimal(value.toString())
                      .div(totalValue)
                      .mul(100)
                      .toFixed(2, Decimal.ROUND_DOWN),
                  )
                : 0;
          }
          currentEntry[seriesKey] = percentage;
        } else {
          currentEntry[seriesKey] = 100;
        }
      });
    });
  });

  return Array.from(dateMap.values()).sort(
    (a, b) => parseInt(a.date) - parseInt(b.date),
  );
};

export function SeriesPercentageChart(
  props: SeriesPercentageChartProps,
): ReactElement {
  const theme = useTheme();
  const formattedData = useMemo(() => {
    if (!props.data) return [];
    return formatChartData(props.data, props.keyValues);
  }, [props.data, props.keyValues]);

  return (
    <Box sx={{ width: '100%', height: '100%', ...props.sx }}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
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
            tickFormatter={(value) => `${value.toFixed(0)}%`}
          />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            labelFormatter={(value) =>
              formatExtendedDate(value, {
                timeZone: props.filter.timezone,
                hour12: false,
              })
            }
            formatter={(value, name) => {
              const percentage = typeof value === 'number' ? value.toFixed(0) : value;
              return [`${name}: ${percentage}%`];
            }}
          />
          {props.data.map((series) =>
            props.keyValues
              .filter((kv) => !kv.isTotal && kv.key === 'oneClickSuccess')
              .map((keyValue) => (
                <Line
                  key={`${series.uuid}_${keyValue.key}`}
                  type='monotone'
                  dataKey={`${series.uuid}_${keyValue.key}`}
                  name={series.name || series.uuid}
                  stroke={keyValue.color}
                  strokeWidth={2}
                  dot={false}
                />
              )),
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
