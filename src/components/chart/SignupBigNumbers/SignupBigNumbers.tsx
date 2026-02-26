import { OverviewBigNumbers } from '../OverviewBigNumbers';
import {
  calculateSignupMetrics,
  SignupBigNumbersChartData,
} from './SignupBigNumbersMapper';

export interface SignupBigNumbersProps {
  chartData: SignupBigNumbersChartData[];
  isLoading: boolean;
  hideTotalCost?: boolean;
}

export function SignupBigNumbers({
  chartData,
  isLoading = true,
  hideTotalCost = false,
}: Readonly<SignupBigNumbersProps>) {
  return (
    <OverviewBigNumbers
      metrics={calculateSignupMetrics(chartData)}
      isLoading={isLoading}
      hideTotalCost={hideTotalCost}
    />
  );
}
