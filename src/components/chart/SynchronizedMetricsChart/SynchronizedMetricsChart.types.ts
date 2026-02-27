import type { SxProps } from '@mui/material';

import type { SeriesChartData } from '../SeriesChart';
import { BrandFilter } from '../../../components/BrandFilterInput';

export interface SynchronizedMappedData {
  started: SeriesChartData[];
  succeeded: SeriesChartData[];
  percentage: SeriesChartData[];
}

export interface SynchronizedMetricsChartProps {
  startedData: SeriesChartData[];
  succeededData: SeriesChartData[];
  percentageData: SeriesChartData[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands: BrandFilter[];
  };
  sx?: SxProps;
}
