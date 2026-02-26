import {
  defaultOverviewMetrics,
  OverviewBigNumbers,
} from '../OverviewBigNumbers';
import {
  calculateOneClickHealthMetrics,
  OneClickHealthBigNumbersChartData,
} from './OneClickHealthBigNumbersMapper';

export interface OneClickHealthBigNumbersProps {
  chartData: OneClickHealthBigNumbersChartData[];
  isLoading: boolean;
  hideTotalCost?: boolean;
}

export function OneClickHealthBigNumbers({
  chartData,
  isLoading = true,
  hideTotalCost = false,
}: Readonly<OneClickHealthBigNumbersProps>) {
  return (
    <OverviewBigNumbers
      metrics={
        isLoading
          ? defaultOverviewMetrics
          : calculateOneClickHealthMetrics(chartData)
      }
      isLoading={isLoading}
      hideTotalCost={hideTotalCost}
    />
  );
}
