import React from 'react';
import type { SxProps } from '@mui/material';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import { AreaChart, type AreaSeriesChartData } from '../AreaChart';
import { formatDateMMYY, formatExtendedDate } from '../../../utils/date';
import { DEFAULT_TIMEZONE } from '../../form/TimezoneInput/timezones';
import type { BrandFilter } from '../../BrandFilterInput';

const styles = {
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
} as const;

export interface OneClickVerificationEventsOverTimeChartProps {
  label?: string;
  data: Array<Record<string, number | string>>;
  series: AreaSeriesChartData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands?: BrandFilter[];
  };
  sx?: SxProps;
}

export function OneClickVerificationEventsOverTimeChart({
  label,
  data,
  series,
  isLoading,
  isFetching,
  isSuccess,
  filter,
  sx,
}: Readonly<OneClickVerificationEventsOverTimeChartProps>): React.ReactNode {
  const timezone = filter.timezone ?? DEFAULT_TIMEZONE;

  if (!data.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data.length || !isSuccess) {
    return <EmptyChartSection />;
  }

  return (
    <AreaChart
      data={data}
      series={series}
      xAxis={{
        dataKey: 'date',
        type: 'number',
        domain: ['dataMin', 'dataMax'],
        tickFormatter: (value: number) =>
          formatDateMMYY(value, {
            timeZone: timezone,
            hour12: false,
            hour: 'numeric',
          }),
        allowDuplicatedCategory: false,
      }}
      yAxis={{
        tickFormatter: (value: number) => Number(value).toLocaleString(),
        allowDecimals: false,
        label: label
          ? {
              value: label,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
            }
          : undefined,
      }}
      tooltip={{
        formatter: (value: number | string | Array<number | string>) =>
          Number(value).toLocaleString(),
        labelFormatter: (value: number) =>
          formatExtendedDate(value, {
            timeZone: timezone,
            hour12: false,
          }),
        itemSorter: (item: any) => -Number(item?.value ?? 0),
      }}
      sx={{ ...styles.chartWrapper, opacity: isFetching ? 0.4 : 1, ...sx }}
    />
  );
}
