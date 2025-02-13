import { TimeSeriesChartData } from '../OneClickOverTimeChart/OneClickTimeSeriesDataMapper';

export interface SignupMetrics {
  totalSignups: number;
  totalSuccess: number;
  totalCost: number;
  successRate: number;
}

export const defaultMetrics: SignupMetrics = {
  totalSignups: 0,
  totalSuccess: 0,
  totalCost: 0,
  successRate: 0,
};

export function calculateSignupMetrics(
  oneClickCreated?: TimeSeriesChartData[],
  oneClickSuccess?: TimeSeriesChartData[],
): SignupMetrics {
  if (!oneClickCreated?.length && !oneClickSuccess?.length) {
    return defaultMetrics;
  }

  // Calculate total signups from oneClickCreated data
  const totalSignups =
    oneClickCreated?.reduce(
      (sum, series) =>
        sum + series.chartData.reduce((total, point) => total + point.value, 0),
      0,
    ) ?? 0;

  // Calculate total success from oneClickSuccess data
  const totalSuccess =
    oneClickSuccess?.reduce(
      (sum, series) =>
        sum + series.chartData.reduce((total, point) => total + point.value, 0),
      0,
    ) ?? 0;

  // Calculate success rate
  const successRate = totalSignups > 0 ? totalSuccess / totalSignups : 0;

  // Assuming totalCost is in cents, convert to dollars
  const totalCost = totalSignups / 100; // This might need adjustment based on your cost calculation logic

  return {
    totalSignups,
    totalSuccess,
    totalCost,
    successRate,
  };
}
