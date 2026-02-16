import { Stack } from '@mui/material';
import { BigNumber } from '..';
import {
  formatNumberRounded,
  formatPercentage,
} from '../../../utils/number/formatters';
import {
  calculateOneClickVerificationMetrics,
  defaultMetrics,
  OneClickVerificationBigNumbersChartData,
} from './OneClickVerificationBigNumbersMapper';

export interface OneClickVerificationBigNumbersProps {
  chartData: OneClickVerificationBigNumbersChartData[];
  isLoading: boolean;
}

export function OneClickVerificationBigNumbers({
  chartData,
  isLoading = true,
}: Readonly<OneClickVerificationBigNumbersProps>): React.ReactNode {
  const metrics = isLoading
    ? defaultMetrics
    : calculateOneClickVerificationMetrics(chartData);

  return (
    <Stack direction='row' spacing={3}>
      <BigNumber
        label='Total Delivered'
        value={metrics.totalDelivered}
        initialValue={metrics.totalDelivered}
        map={formatNumberRounded}
      />

      <BigNumber
        label='Total Verified'
        value={metrics.totalVerified}
        initialValue={metrics.totalVerified}
        map={formatNumberRounded}
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
