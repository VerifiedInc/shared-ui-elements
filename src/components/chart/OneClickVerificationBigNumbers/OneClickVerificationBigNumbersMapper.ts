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

export interface OneClickVerificationBigNumbersChartData {
  interval?: Array<{
    oneClickVerificationDelivered: number;
    oneClickVerificationVerified: number;
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
