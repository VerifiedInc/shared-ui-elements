import { Stack } from '@mui/material';
import { BigNumber } from '..';
import {
  formatNumberRounded,
  formatCurrency,
  formatPercentage,
} from '../../../utils/number/formatters';
import {
  calculateSignupMetrics,
  defaultMetrics,
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
}: Readonly<SignupBigNumbersProps>): React.ReactNode {
  const metrics = isLoading
    ? defaultMetrics
    : calculateSignupMetrics(chartData);

  return (
    <Stack direction='row' spacing={3}>
      <BigNumber
        label='Total 1-Click Signups'
        value={metrics.totalSignups}
        initialValue={metrics.totalSignups}
        map={formatNumberRounded}
      />

      <BigNumber
        label='Finished 1-Click Signups'
        value={metrics.totalSuccess}
        initialValue={metrics.totalSuccess}
        map={formatNumberRounded}
      />

      {!hideTotalCost && (
        <BigNumber
          label='Total Cost'
          value={metrics.totalCost}
          initialValue={metrics.totalCost}
          map={formatCurrency}
        />
      )}

      <BigNumber
        label='Success Rate'
        value={metrics.successRate}
        initialValue={metrics.successRate}
        map={formatPercentage}
      />
    </Stack>
  );
}
