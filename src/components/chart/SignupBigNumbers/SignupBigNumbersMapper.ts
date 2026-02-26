import {
  OverviewMetrics,
  defaultOverviewMetrics,
} from '../OverviewBigNumbers/OverviewBigNumbers.types';

/** @deprecated Use {@link OverviewMetrics} from OverviewBigNumbers. */
export type SignupMetrics = OverviewMetrics;

export const defaultMetrics = defaultOverviewMetrics;

export interface SignupBigNumbersChartData {
  interval?: Array<{
    oneClickCreated: number;
    oneClickSuccess: number;
    date: string;
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
): OverviewMetrics {
  if (!data?.length) return defaultMetrics;

  const started = data.reduce(
    (sum, brand) => sum + (brand.overall.oneClickCreated || 0),
    0,
  );

  const succeeded = data.reduce(
    (sum, brand) => sum + (brand.overall.oneClickSuccess || 0),
    0,
  );

  const totalCost = data.reduce((sum, brand) => {
    const cost = brand.overall.totalCost
      ? Number(brand.overall.totalCost.replace('$', '').replace(/,/g, ''))
      : 0;
    return sum + cost;
  }, 0);

  const successRate = started > 0 ? succeeded / started : 0;

  return {
    started,
    succeeded,
    totalCost,
    successRate: isNaN(successRate) ? 0 : successRate,
  };
}
