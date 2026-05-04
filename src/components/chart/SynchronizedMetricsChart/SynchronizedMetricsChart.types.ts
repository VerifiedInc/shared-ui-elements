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
  /**
   * Marks this sub-chart as showing percentage values. Percentage sub-charts
   * opt out of the Total line and the Log Scale toggle.
   */
  isPercentage?: boolean;
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

type SynchronizedMetricsChartBaseProps = {
  syncId?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  filter: {
    timezone?: string;
    brands: BrandFilter[];
  };
  sx?: SxProps;
  showChallengePromptsTooltip?: boolean;
};

export type SynchronizedMetricsChartProps = SynchronizedMetricsChartBaseProps &
  (
    | {
        // Legacy path: caller provides pre-mapped subCharts
        subCharts: readonly [SubChartConfig, ...SubChartConfig[]];
        chartData?: never;
        subChartConfig?: never;
        colorMap?: never;
      }
    | {
        // New path: caller provides raw data + field config
        subCharts?: never;
        chartData: BrandIntervalData[];
        subChartConfig: readonly [
          SynchronizedSubChartConfig,
          ...SynchronizedSubChartConfig[],
        ];
        colorMap: Map<string, string>;
      }
  );
