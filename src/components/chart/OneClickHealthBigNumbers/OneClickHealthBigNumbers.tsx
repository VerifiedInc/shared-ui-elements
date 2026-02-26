import { OverviewBigNumbers } from '../OverviewBigNumbers';
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
      metrics={calculateOneClickHealthMetrics(chartData)}
      isLoading={isLoading}
      hideTotalCost={hideTotalCost}
    />
  );
}
