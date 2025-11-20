export interface OneClickHealthOverallMetrics {
  total: number;
  success: number;
  totalCost: number;
  successRate: number;
}

export const defaultMetrics: OneClickHealthOverallMetrics = {
  total: 0,
  success: 0,
  totalCost: 0,
  successRate: 0,
};

export interface OneClickHealthBigNumbersChartData {
  interval?: Array<{
    oneClickHealthCreated: number;
    oneClickHealthSuccess: number;
    date: string | number;
    [key: string]: any;
  }>;
  brandUuid: string;
  brandName: string;
}

export function calculateOneClickHealthMetrics(
  data: OneClickHealthBigNumbersChartData[],
): OneClickHealthOverallMetrics {
  if (!data?.length) return defaultMetrics;

  let totalCreated = 0;
  let totalSuccess = 0;
  const totalCost = 0;

  data.forEach((brand) => {
    if (brand.interval?.length) {
      // Calculate totals from interval data for each brand
      const brandTotalCreated = brand.interval.reduce(
        (sum, interval) => sum + (interval.oneClickHealthCreated || 0),
        0,
      );

      const brandTotalSuccess = brand.interval.reduce(
        (sum, interval) => sum + (interval.oneClickHealthSuccess || 0),
        0,
      );

      // Sum up across all brands
      totalCreated += brandTotalCreated;
      totalSuccess += brandTotalSuccess;

      // Note: totalCost calculation removed as it's not available in interval data
      // If cost data becomes available in intervals, it can be added here
    }
  });

  const successRate = totalCreated > 0 ? totalSuccess / totalCreated : 0;

  return {
    total: totalCreated,
    success: totalSuccess,
    totalCost, // Will be 0 since cost data is not available in intervals
    successRate: isNaN(successRate) ? 0 : successRate,
  };
}
