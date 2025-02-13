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
  data?: TimeSeriesChartData[],
): SignupMetrics {
  if (!data?.length) {
    return defaultMetrics;
  }

  const totalSignups = data.reduce((sum, series) => {
    return (
      sum + series.chartData.reduce((total, point) => total + point.value, 0)
    );
  }, 0);

  const totalSuccess = data.reduce((sum, series) => {
    return (
      sum + series.chartData.reduce((total, point) => total + point.value, 0)
    );
  }, 0);

  // Assuming totalCost is in cents, convert to dollars
  const totalCost =
    data.reduce((sum, series) => {
      return (
        sum + series.chartData.reduce((total, point) => total + point.value, 0)
      );
    }, 0) / 100;

  const successRate = totalSignups > 0 ? totalSuccess / totalSignups : 0;

  return {
    totalSignups,
    totalSuccess,
    totalCost,
    successRate,
  };
}
