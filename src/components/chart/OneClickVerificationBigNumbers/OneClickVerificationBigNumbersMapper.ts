import type { OneClickVerificationBrandData } from '../oneClickVerification.types';

export type {
  OneClickVerificationIntervalEntry,
  OneClickVerificationBrandData,
} from '../oneClickVerification.types';

export interface OneClickVerificationOverallMetrics {
  totalDelivered: number;
  totalVerified: number;
  successRate: number;
}

export const defaultMetrics: OneClickVerificationOverallMetrics = {
  totalDelivered: 0,
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

  let totalDelivered = 0;
  let totalVerified = 0;

  data.forEach((brand) => {
    if (brand.interval?.length) {
      // Calculate totals from interval data for each brand
      const brandTotalDelivered = brand.interval.reduce(
        (sum, interval) => sum + (interval.oneClickVerificationDelivered || 0),
        0,
      );

      const brandTotalVerified = brand.interval.reduce(
        (sum, interval) => sum + (interval.oneClickVerificationVerified || 0),
        0,
      );

      // Sum up across all brands
      totalDelivered += brandTotalDelivered;
      totalVerified += brandTotalVerified;
    }
  });

  const successRate = totalDelivered > 0 ? totalVerified / totalDelivered : 0;

  return {
    totalDelivered,
    totalVerified,
    successRate: isNaN(successRate) ? 0 : successRate,
  };
}
