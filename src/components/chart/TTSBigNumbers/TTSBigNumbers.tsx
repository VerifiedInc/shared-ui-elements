import {
  defaultOverviewMetrics,
  OverviewBigNumbers,
} from '../OverviewBigNumbers';
import {
  calculateTTSMetrics,
  TTSBigNumbersChartData,
} from './TTSBigNumbersMapper';

export interface TTSBigNumbersProps {
  chartData: TTSBigNumbersChartData[];
  isLoading: boolean;
  hideTotalCost?: boolean;
}

export function TTSBigNumbers({
  chartData,
  isLoading = true,
  hideTotalCost = false,
}: Readonly<TTSBigNumbersProps>) {
  return (
    <OverviewBigNumbers
      metrics={
        isLoading ? defaultOverviewMetrics : calculateTTSMetrics(chartData)
      }
      isLoading={isLoading}
      hideTotalCost={hideTotalCost}
    />
  );
}
