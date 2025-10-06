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
}: Readonly<TTSBigNumbersProps>): React.ReactNode {
  const metrics = isLoading
    ? defaultMetrics
    : calculateSignupMetrics(chartData);

  return (
    <Stack direction='row' spacing={3}>
      <BigNumber
        label='Total TTS Signups'
        value={metrics.total}
        initialValue={metrics.total}
        map={formatNumberRounded}
      />

      <BigNumber
        label='Finished TTS Signups'
        value={metrics.success}
        initialValue={metrics.success}
        map={formatNumberRounded}
      />

      {!hideTotalCost && (
        <BigNumber
          label='Total TTS Cost'
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
