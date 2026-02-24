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

export interface OneClickVerificationBigNumbersChartData {
  interval?: Array<{
    oneClickVerificationCreated: number;
    oneClickVerificationDelivered: number;
    oneClickVerificationVerified: number;
    oneClickVerificationFailed: number;
    oneClickVerificationSending: number;
    oneClickVerificationUndelivered: number;
    oneClickVerificationExpired: number;
    date: string | number;
    [key: string]: any;
  }>;
  brandUuid: string;
  brandName: string;
}

export function calculateOneClickVerificationMetrics(
  data: OneClickVerificationBigNumbersChartData[],
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
