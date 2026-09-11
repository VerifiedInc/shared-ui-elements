import type { BrandIntervalData } from '../ConversionOverTimeChart';
import type {
  OverviewBreakdownCard,
  OverviewBreakdownTotals,
} from './OverviewBreakdownBigNumbers.types';

export function mapBreakdownTotals(
  chartData: BrandIntervalData[],
  cards: OverviewBreakdownCard[],
): OverviewBreakdownTotals {
  const totals: OverviewBreakdownTotals = {};
  for (const card of cards) totals[card.key] = 0;

  for (const brand of chartData) {
    for (const item of brand.interval ?? []) {
      for (const card of cards) {
        for (const dataKey of card.dataKeys) {
          totals[card.key] += Number(item[dataKey]) || 0;
        }
      }
    }
  }

  return totals;
}
