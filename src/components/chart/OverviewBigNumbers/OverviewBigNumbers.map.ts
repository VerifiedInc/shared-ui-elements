import type { BrandIntervalData } from '../ConversionOverTimeChart';
import type { OverviewBigNumbersMetricsConfig } from './OverviewBigNumbers.types';
import {
  type OverviewMetrics,
  defaultOverviewMetrics,
} from './OverviewBigNumbers.types';

export function mapOverviewMetrics(
  chartData: BrandIntervalData[],
  config: OverviewBigNumbersMetricsConfig,
): OverviewMetrics {
  if (!chartData?.length) return defaultOverviewMetrics;

  let started = 0;
  let succeeded = 0;

  for (const brand of chartData) {
    for (const item of brand.interval ?? []) {
      started += Number(item[config.startedKey]) || 0;
      succeeded += Number(item[config.succeededKey]) || 0;
    }
  }

  const successRate = started > 0 ? succeeded / started : 0;

  return { started, succeeded, successRate };
}
