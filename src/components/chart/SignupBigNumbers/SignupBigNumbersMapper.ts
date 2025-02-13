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

export interface SignupBigNumbersChartData {
  interval?: Array<{
    oneClickCreated: number;
    oneClickSuccess: number;
    date: number;
    totalCost?: string;
  }>;
  brandUuid: string;
  brandName: string;
  overall: {
    oneClickCreated: number;
    oneClickSuccess: number;
    totalCost?: string;
  };
}

export function calculateSignupMetrics(
  data: SignupBigNumbersChartData[],
): SignupMetrics {
  if (!data?.length) return defaultMetrics;

  const totalSignups = data.reduce(
    (sum, brand) => sum + (brand.overall.oneClickCreated || 0),
    0,
  );

  const totalSuccess = data.reduce(
    (sum, brand) => sum + (brand.overall.oneClickSuccess || 0),
    0,
  );

  const totalCost = data.reduce((sum, brand) => {
    const cost = brand.overall.totalCost
      ? Number(brand.overall.totalCost.replace('$', '').replace(/,/g, ''))
      : 0;
    return sum + cost;
  }, 0);

  const successRate = totalSuccess / totalSignups;

  return {
    totalSignups,
    totalSuccess,
    totalCost,
    successRate: isNaN(successRate) ? 0 : successRate,
  };
}
