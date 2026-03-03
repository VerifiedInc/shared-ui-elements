import type { SxProps } from '@mui/material';

import type { SeriesChartData } from '../SeriesChart';
import { BrandFilter } from '../../../components/BrandFilterInput';

export interface SubChartConfig {
  title: string;
  data: SeriesChartData[];
  tooltipFormatter?: (value: number | string) => string;
  yAxisTickFormatter?: (value: number) => string;
  yAxisDomain?: [number | string, number | string];
}

export interface SynchronizedMappedData {
  started: SeriesChartData[];
  succeeded: SeriesChartData[];
  percentage: SeriesChartData[];
}

export interface SynchronizedMetricsChartProps {
  subCharts: [SubChartConfig, ...SubChartConfig[]];
  syncId?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands: BrandFilter[];
  };
  sx?: SxProps;
}
