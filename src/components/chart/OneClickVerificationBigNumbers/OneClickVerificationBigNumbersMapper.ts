import type { OneClickVerificationBrandData } from '../oneClickVerification.types';

export type {
  OneClickVerificationIntervalEntry,
  OneClickVerificationBrandData,
} from '../oneClickVerification.types';

export interface OneClickVerificationOverallMetrics {
  totalCreated: number;
  totalVerified: number;
  successRate: number;
}

export const defaultMetrics: OneClickVerificationOverallMetrics = {
  totalCreated: 0,
  totalVerified: 0,
  successRate: 0,
};

/** @deprecated Use {@link OneClickVerificationBrandData} from the shared chart types. */
export type OneClickVerificationBigNumbersChartData =
  OneClickVerificationBrandData;

export function calculateOneClickVerificationMetrics(
  data: OneClickVerificationBrandData[],
): OneClickVerificationOverallMetrics {
  if (!data?.length) return defaultMetrics;

  let totalCreated = 0;
  let totalVerified = 0;

  data.forEach((brand) => {
    if (brand.interval?.length) {
      // Calculate totals from interval data for each brand
      const brandTotalCreated = brand.interval.reduce(
        (sum, interval) => sum + (interval.oneClickVerificationCreated || 0),
        0,
      );

      const brandTotalVerified = brand.interval.reduce(
        (sum, interval) => sum + (interval.oneClickVerificationVerified || 0),
        0,
      );

      // Sum up across all brands
      totalCreated += brandTotalCreated;
      totalVerified += brandTotalVerified;
    }
  });

  const successRate = totalCreated > 0 ? totalVerified / totalCreated : 0;

  return {
    totalCreated,
    totalVerified,
    successRate: isNaN(successRate) ? 0 : successRate,
  };
}
