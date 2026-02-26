import type { OneClickVerificationBrandData } from '../oneClickVerification.types';

import {
  OverviewMetrics,
  defaultOverviewMetrics,
} from '../OverviewBigNumbers/OverviewBigNumbers.types';

export type {
  OneClickVerificationIntervalEntry,
  OneClickVerificationBrandData,
} from '../oneClickVerification.types';

/** @deprecated Use {@link OverviewMetrics} from OverviewBigNumbers. */
export type OneClickVerificationOverallMetrics = OverviewMetrics;

/** @deprecated Use {@link OneClickVerificationBrandData} from the shared chart types. */
export type OneClickVerificationBigNumbersChartData =
  OneClickVerificationBrandData;

export const defaultMetrics = defaultOverviewMetrics;

export function calculateOneClickVerificationMetrics(
  data: OneClickVerificationBrandData[],
): OverviewMetrics {
  if (!data?.length) return defaultMetrics;

  let started = 0;
  let succeeded = 0;

  data.forEach((brand) => {
    if (brand.interval?.length) {
      const brandStarted = brand.interval.reduce(
        (sum, interval) => sum + (interval.oneClickVerificationCreated || 0),
        0,
      );

      const brandSucceeded = brand.interval.reduce(
        (sum, interval) => sum + (interval.oneClickVerificationVerified || 0),
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
    successRate: isNaN(successRate) ? 0 : successRate,
  };
}
