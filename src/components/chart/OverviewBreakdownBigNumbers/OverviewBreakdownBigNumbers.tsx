import { Stack } from '@mui/material';
import type { SxProps } from '@mui/material';

import { BigNumber } from '..';
import { formatNumberRounded } from '../../../utils/number/formatters';
import type { BrandIntervalData } from '../ConversionOverTimeChart';
import type { OverviewBreakdownCard } from './OverviewBreakdownBigNumbers.types';
import { mapBreakdownTotals } from './OverviewBreakdownBigNumbers.map';

export interface OverviewBreakdownBigNumbersProps {
  cards: OverviewBreakdownCard[];
  chartData?: BrandIntervalData[];
  isLoading?: boolean;
}

const defaultSx: SxProps = { color: 'primary.main' };

/**
 * A row of BigNumber cards, each summing a set of interval fields. Sibling of
 * OverviewBigNumbers for breakdowns that are not a Started / Succeeded funnel.
 */
export function OverviewBreakdownBigNumbers({
  cards,
  chartData = [],
  isLoading = false,
}: Readonly<OverviewBreakdownBigNumbersProps>) {
  const totals = mapBreakdownTotals(isLoading ? [] : chartData, cards);

  return (
    <Stack direction='row' spacing={3}>
      {cards.map((card) => (
        <BigNumber
          key={card.key}
          label={card.label}
          value={totals[card.key]}
          initialValue={totals[card.key]}
          map={formatNumberRounded}
          sx={card.sx ?? defaultSx}
        />
      ))}
    </Stack>
  );
}
