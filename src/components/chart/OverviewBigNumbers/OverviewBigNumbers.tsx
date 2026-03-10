import { Stack } from '@mui/material';
import type { SxProps } from '@mui/material';

import { BigNumber } from '..';
import { green } from '../../../styles/colors';
import {
  formatNumberRounded,
  formatCurrency,
  formatPercentage,
} from '../../../utils/number/formatters';
import type { BrandIntervalData } from '../ConversionOverTimeChart';
import {
  type OverviewMetrics,
  defaultOverviewMetrics,
} from './OverviewBigNumbers.types';
import type {
  OverviewBigNumbersMetricsConfig,
  BigNumberCardOverride,
} from './OverviewBigNumbers.types';
import { mapOverviewMetrics } from './OverviewBigNumbers.map';

export interface OverviewBigNumbersProps {
  isLoading?: boolean;
  hideTotalCost?: boolean;
  // Legacy path: pre-computed metrics
  metrics?: OverviewMetrics;
  // New path: raw data + field config
  chartData?: BrandIntervalData[];
  metricsConfig?: OverviewBigNumbersMetricsConfig;
  // Per-card customization
  startedCard?: BigNumberCardOverride;
  succeededCard?: BigNumberCardOverride;
  costCard?: BigNumberCardOverride;
  rateCard?: BigNumberCardOverride;
}

const defaultSx: SxProps = { color: green };

export function OverviewBigNumbers({
  metrics,
  chartData,
  metricsConfig,
  isLoading = true,
  hideTotalCost = false,
  startedCard,
  succeededCard,
  costCard,
  rateCard,
}: Readonly<OverviewBigNumbersProps>) {
  // Resolve metrics: chartData path takes precedence
  const resolvedMetrics = isLoading
    ? defaultOverviewMetrics
    : chartData && metricsConfig
      ? mapOverviewMetrics(chartData, metricsConfig)
      : (metrics ?? defaultOverviewMetrics);

  return (
    <Stack direction='row' spacing={3}>
      <BigNumber
        label={startedCard?.label ?? 'Started'}
        value={resolvedMetrics.started}
        initialValue={resolvedMetrics.started}
        map={formatNumberRounded}
        sx={startedCard?.sx ?? defaultSx}
      />
      <BigNumber
        label={succeededCard?.label ?? 'Succeeded'}
        value={resolvedMetrics.succeeded}
        initialValue={resolvedMetrics.succeeded}
        map={formatNumberRounded}
        sx={succeededCard?.sx ?? defaultSx}
      />
      {!hideTotalCost && (
        <BigNumber
          label={costCard?.label ?? 'Total Cost'}
          value={resolvedMetrics.totalCost ?? 0}
          initialValue={resolvedMetrics.totalCost ?? 0}
          map={formatCurrency}
          sx={costCard?.sx ?? defaultSx}
        />
      )}
      <BigNumber
        label={rateCard?.label ?? 'Success Rate'}
        value={resolvedMetrics.successRate}
        initialValue={resolvedMetrics.successRate}
        map={formatPercentage}
        sx={rateCard?.sx ?? defaultSx}
      />
    </Stack>
  );
}
