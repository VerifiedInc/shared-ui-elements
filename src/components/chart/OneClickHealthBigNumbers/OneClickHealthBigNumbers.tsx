import { Stack } from '@mui/material';
import { BigNumber } from '..';
import {
  formatNumberRounded,
  formatCurrency,
  formatPercentage,
} from '../../../utils/number/formatters';
import {
  calculateOneClickHealthMetrics,
  defaultMetrics,
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
}: Readonly<OneClickHealthBigNumbersProps>): React.ReactNode {
  const metrics = isLoading
    ? defaultMetrics
    : calculateOneClickHealthMetrics(chartData);

  return (
    <Stack direction='row' spacing={3}>
      <BigNumber
        label='Total Created'
        value={metrics.total}
        initialValue={metrics.total}
        map={formatNumberRounded}
      />

      <BigNumber
        label='Total Success'
        value={metrics.success}
        initialValue={metrics.success}
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
