import { Stack } from '@mui/material';
import { BigNumber } from '../chart';

export interface SignupsBigNumbersProps {
  totalSignups?: number;
  totalSuccess?: number;
  totalCost?: number;
  successRate?: number;
  formatNumber?: (value: number) => string;
  formatCurrency?: (value: number) => string;
  formatPercentage?: (value: number) => string;
}

export function SignupsBigNumbers({
  totalSignups,
  totalSuccess,
  totalCost,
  successRate,
  formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US').format(Number(value.toFixed(0))),
  formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value),
  formatPercentage = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value),
}: SignupsBigNumbersProps) {
  return (
    <Stack direction='row' spacing={3}>
      {totalSignups !== undefined && (
        <BigNumber
          label='Total 1-Click Signups'
          value={totalSignups}
          initialValue={totalSignups}
          map={formatNumber}
        />
      )}

      {totalSuccess !== undefined && (
        <BigNumber
          label='Finished 1-Click Signups'
          value={totalSuccess}
          initialValue={totalSuccess}
          map={formatNumber}
        />
      )}

      {totalCost !== undefined && (
        <BigNumber
          label='Total Cost'
          value={totalCost}
          initialValue={totalCost}
          map={formatCurrency}
        />
      )}

      {successRate !== undefined && (
        <BigNumber
          label='Success Rate'
          value={successRate}
          initialValue={successRate}
          map={formatPercentage}
        />
      )}
    </Stack>
  );
}
