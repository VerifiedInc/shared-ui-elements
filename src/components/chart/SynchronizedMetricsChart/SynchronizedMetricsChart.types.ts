import type { SxProps } from '@mui/material';

import type { SeriesChartData } from '../SeriesChart';
import type { BrandFilter } from '../../../components/BrandFilterInput';
import type { BrandIntervalData } from '../ConversionOverTimeChart';

export interface SubChartConfig {
  title: string;
  data: SeriesChartData[];
  tooltipFormatter?: (value: number | string) => string;
  yAxisTickFormatter?: (value: number) => string;
  yAxisDomain?: [number | string, number | string];
}

export type SynchronizedSubChartConfig =
  | {
      title: string;
      dataKey: string;
      percentageOf?: never;
      tooltipFormatter?: (value: number | string) => string;
      yAxisTickFormatter?: (value: number) => string;
      yAxisDomain?: [number | string, number | string];
    }
  | {
      title: string;
      percentageOf: { numerator: string; denominator: string };
      dataKey?: never;
      tooltipFormatter?: (value: number | string) => string;
      yAxisTickFormatter?: (value: number) => string;
      yAxisDomain?: [number | string, number | string];
    };

export interface SynchronizedMetricsChartProps {
  syncId?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands: BrandFilter[];
  };
  sx?: SxProps;
  // Legacy path: caller provides pre-mapped subCharts
  subCharts?: readonly [SubChartConfig, ...SubChartConfig[]];
  // New path: caller provides raw data + field config
  chartData?: BrandIntervalData[];
  subChartConfig?: readonly [
    SynchronizedSubChartConfig,
    ...SynchronizedSubChartConfig[],
  ];
  colorMap?: Map<string, string>;
}
