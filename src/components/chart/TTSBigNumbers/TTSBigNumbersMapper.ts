import {
  OverviewMetrics,
  defaultOverviewMetrics,
} from '../OverviewBigNumbers/OverviewBigNumbers.types';

/** @deprecated Use {@link OverviewMetrics} from OverviewBigNumbers. */
export type TTSOverallMetrics = OverviewMetrics;

export const defaultMetrics = defaultOverviewMetrics;

export interface TTSBigNumbersChartData {
  interval?: Array<{
    ttsSent: number;
    ttsVerified: number;
    date: string | number;
    [key: string]: any;
  }>;
  brandUuid: string;
  brandName: string;
}

export function calculateTTSMetrics(
  data: TTSBigNumbersChartData[],
): OverviewMetrics {
  if (!data?.length) return defaultMetrics;

  let started = 0;
  let succeeded = 0;
  const totalCost = 0; // Not available for this product yet, always 0

  data.forEach((brand) => {
    if (brand.interval?.length) {
      const brandStarted = brand.interval.reduce(
        (sum, interval) => sum + (interval.ttsSent || 0),
        0,
      );

      const brandSucceeded = brand.interval.reduce(
        (sum, interval) => sum + (interval.ttsVerified || 0),
        0,
      );

      started += brandStarted;
      succeeded += brandSucceeded;
    }
  });

  const successRate = started > 0 ? succeeded / started : 0;

  return {
    started,
    succeeded,
    totalCost,
    successRate: isNaN(successRate) ? 0 : successRate,
  };
}
