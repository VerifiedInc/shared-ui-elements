import { Stack } from '@mui/material';

import { BigNumber } from '..';
import {
  formatNumberRounded,
  formatCurrency,
  formatPercentage,
} from '../../../utils/number/formatters';
import {
  OverviewMetrics,
  defaultOverviewMetrics,
} from './OverviewBigNumbers.types';

export interface OverviewBigNumbersProps {
  metrics: OverviewMetrics;
  isLoading?: boolean;
  hideTotalCost?: boolean;
}

export function OverviewBigNumbers({
  metrics,
  isLoading = true,
  hideTotalCost = false,
}: Readonly<OverviewBigNumbersProps>) {
  const displayMetrics = isLoading ? defaultOverviewMetrics : metrics;

  return (
    <Stack direction='row' spacing={3}>
      <BigNumber
        label='Started'
        value={displayMetrics.started}
        initialValue={displayMetrics.started}
        map={formatNumberRounded}
      />
      <BigNumber
        label='Succeeded'
        value={displayMetrics.succeeded}
        initialValue={displayMetrics.succeeded}
        map={formatNumberRounded}
      />
      {!hideTotalCost && (
        <BigNumber
          label='Total Cost'
          value={displayMetrics.totalCost ?? 0}
          initialValue={displayMetrics.totalCost ?? 0}
          map={formatCurrency}
        />
      )}
      <BigNumber
        label='Success Rate'
        value={displayMetrics.successRate}
        initialValue={displayMetrics.successRate}
        map={formatPercentage}
      />
    </Stack>
  );
}
