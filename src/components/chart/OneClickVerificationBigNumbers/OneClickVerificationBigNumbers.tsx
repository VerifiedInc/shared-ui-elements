import {
  defaultOverviewMetrics,
  OverviewBigNumbers,
} from '../OverviewBigNumbers';
import {
  calculateOneClickVerificationMetrics,
  OneClickVerificationBrandData,
} from './OneClickVerificationBigNumbersMapper';

export interface OneClickVerificationBigNumbersProps {
  chartData: OneClickVerificationBrandData[];
  isLoading: boolean;
}

export function OneClickVerificationBigNumbers({
  chartData,
  isLoading = true,
}: Readonly<OneClickVerificationBigNumbersProps>) {
  return (
    <OverviewBigNumbers
      metrics={
        isLoading
          ? defaultOverviewMetrics
          : calculateOneClickVerificationMetrics(chartData)
      }
      isLoading={isLoading}
      hideTotalCost
    />
  );
}
