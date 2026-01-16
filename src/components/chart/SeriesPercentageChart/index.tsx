import { Box, useTheme, type SxProps } from '@mui/material';
import Decimal from 'decimal.js';
import { useMemo, type ReactElement } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';
import { SeriesPercentageChartLegend } from '../SeriesPercentageChartLegend';
import { DEFAULT_TIMEZONE } from '../../form/TimezoneInput/timezones';

interface KeyValue {
  key: string;
  name: string;
  isTotal?: boolean;
}

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

interface SeriesChartData {
  uuid: string;
  name?: string;
  color?: string;
  integrationType?: string;
  chartData: ChartDataPoint[];
}

interface SeriesPercentageChartProps {
  data: SeriesChartData[];
  filter: { timezone?: string };
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

      const currentEntry = dateMap.get(
        dateKey,
      ) as unknown as FormattedChartData;

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
          const totalValue = point[totalKey ?? ''] as number;
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
  const { timezone = DEFAULT_TIMEZONE } = props.filter;
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
            tickLine={false}
            tickFormatter={(value) => `${value.toFixed(0)}%`}
          />
          <Tooltip
            cursor={{ stroke: theme.palette.neutral.main, strokeWidth: 1 }}
            labelFormatter={(value) =>
              formatExtendedDate(value, {
                timeZone: timezone,
                hour12: false,
              })
            }
            itemSorter={(item) => -Number(item?.value ?? 0)}
            formatter={(value, name) => {
              const percentage =
                typeof value === 'number' ? value.toFixed(1) : value;
              return [`${name}: ${percentage as string}%`];
            }}
          />
          <Legend
            content={(legendProps) => {
              const { height, width, ...otherProps } = legendProps;
              const latestData = formattedData[formattedData.length - 1];
              const numericData: Record<string, number> = {};

              Object.entries(latestData).forEach(([key, value]) => {
                if (key !== 'date' && typeof value === 'number') {
                  numericData[key] = value;
                }
              });

              const dataKeyToUuid = new Map<string, string>();
              props.data.forEach((series) => {
                props.keyValues
                  .filter((kv) => !kv.isTotal)
                  .forEach((keyValue) => {
                    const dataKey = `${series.uuid}_${keyValue.key}`;
                    dataKeyToUuid.set(dataKey, series.uuid);
                    dataKeyToUuid.set(
                      `${dataKey}_integrationType`,
                      series.integrationType ?? '',
                    );
                  });
              });

              const getIntegrationType = (entry: any) => {
                const integrationType = dataKeyToUuid.get(
                  `${entry.dataKey as string}_integrationType`,
                );

                if (integrationType === 'hosted' || integrationType === 'sdk') {
                  return 'SDK';
                }

                if (
                  integrationType === 'non-hosted' ||
                  integrationType === 'api'
                ) {
                  return 'API';
                }

                return integrationType;
              };

              return (
                <SeriesPercentageChartLegend
                  {...otherProps}
                  payload={legendProps.payload?.map((entry) => ({
                    uuid: dataKeyToUuid.get(entry.dataKey as string) ?? '',
                    value: entry.value,
                    color: entry.color ?? theme.palette.primary.main,
                    integrationType: getIntegrationType(entry),
                    dataKey: entry.dataKey as string,
                  }))}
                />
              );
            }}
          />
          {props.data.map((series) =>
            props.keyValues
              .filter((kv) => !kv.isTotal)
              .map((keyValue) => (
                <Line
                  key={`${series.uuid}_${keyValue.key}`}
                  type='monotone'
                  dataKey={`${series.uuid}_${keyValue.key}`}
                  name={series.name ?? series.uuid}
                  stroke={series.color ?? theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              )),
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
