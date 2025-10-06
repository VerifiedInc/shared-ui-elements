export interface TTSOverallMetrics {
  total: number;
  success: number;
  totalCost: number;
  successRate: number;
}

export const defaultMetrics: TTSOverallMetrics = {
  total: 0,
  success: 0,
  totalCost: 0,
  successRate: 0,
};

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

export function calculateSignupMetrics(
  data: TTSBigNumbersChartData[],
): TTSOverallMetrics {
  if (!data?.length) return defaultMetrics;

  let totalSignups = 0;
  let totalSuccess = 0;
  const totalCost = 0;

  data.forEach((brand) => {
    if (brand.interval?.length) {
      // Calculate totals from interval data for each brand
      const brandTotalSignups = brand.interval.reduce(
        (sum, interval) => sum + (interval.ttsSent || 0),
        0,
      );

      const brandTotalSuccess = brand.interval.reduce(
        (sum, interval) => sum + (interval.ttsVerified || 0),
        0,
      );

      // Sum up across all brands
      totalSignups += brandTotalSignups;
      totalSuccess += brandTotalSuccess;

      // Note: totalCost calculation removed as it's not available in interval data
      // If cost data becomes available in intervals, it can be added here
    }
  });

  const successRate = totalSignups > 0 ? totalSuccess / totalSignups : 0;

  return {
    total: totalSignups,
    success: totalSuccess,
    totalCost, // Will be 0 since cost data is not available in intervals
    successRate: isNaN(successRate) ? 0 : successRate,
  };
}
