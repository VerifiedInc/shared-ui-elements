import { Stack } from '@mui/material';
import { BigNumber } from '..';
import {
  formatNumberRounded,
  formatCurrency,
  formatPercentage,
} from '../../../utils/number/formatters';
import { TimeSeriesChartData } from '../OneClickOverTimeChart/OneClickTimeSeriesDataMapper';
import {
  calculateSignupMetrics,
  defaultMetrics,
} from './SignupBigNumbersMapper';

export interface SignupBigNumbersProps {
  data?: TimeSeriesChartData[];
  isLoading: boolean;
}

export function SignupBigNumbers({
  data,
  isLoading = true,
}: Readonly<SignupBigNumbersProps>): React.ReactNode {
  const metrics = isLoading ? defaultMetrics : calculateSignupMetrics(data);

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

      <BigNumber
        label='Total Cost'
        value={metrics.totalCost}
        initialValue={metrics.totalCost}
        map={formatCurrency}
      />

      <BigNumber
        label='Success Rate'
        value={metrics.successRate}
        initialValue={metrics.successRate}
        map={formatPercentage}
      />
    </Stack>
  );
}
