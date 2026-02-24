import { mapAreaChartData } from '../AreaChart/AreaChart.map';
import type { AreaSeriesChartData } from '../AreaChart';
import type { BrandFilter } from '../../BrandFilterInput';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';
import { green, yellow, red } from '../../../styles/colors';

export type { OneClickVerificationBrandData } from '../oneClickVerification.types';

export interface MapOneClickVerificationOutcomeOverTimeChartDataOptions {
  brands?: BrandFilter[];
  data: OneClickVerificationBrandData[];
}

export interface OneClickVerificationOutcomeChartData {
  series: AreaSeriesChartData[];
  data: Array<Record<string, number | string>>;
}

/**
 * Maps raw OneClick verification outcome time series data into a format suitable for AreaChart.
 * Aggregates verified, expired, and failed counts across all (optionally filtered) brands by date.
 *
 * Series order is Verified → Expired → Failed, which determines the visual stack order
 * (bottom to top) when rendered with `stackMode="stack"` or `stackMode="expand"`.
 *
 * @param options Configuration options for mapping the data
 * @returns Formatted data ready for the AreaChart component
 */
export function mapOneClickVerificationOutcomeOverTimeChartData(
  options: MapOneClickVerificationOutcomeOverTimeChartDataOptions,
): OneClickVerificationOutcomeChartData {
  const dateMap = new Map<number, Record<string, number | string>>();
  const brandUuids = options.brands
    ? new Set(options.brands.map((b) => b._raw.brandUuid))
    : null;

  for (const brand of options.data) {
    if (brandUuids && !brandUuids.has(brand.brandUuid)) continue;

    for (const item of brand.interval ?? []) {
      const date = +new Date(item.date);
      if (!dateMap.has(date)) {
        dateMap.set(date, {
          date,
          oneClickVerificationVerified: 0,
          oneClickVerificationExpired: 0,
          oneClickVerificationFailed: 0,
        });
      }
      const entry = dateMap.get(date);
      if (!entry) continue;
      entry.oneClickVerificationVerified =
        (entry.oneClickVerificationVerified as number) +
        Number(item.oneClickVerificationVerified || 0);
      entry.oneClickVerificationExpired =
        (entry.oneClickVerificationExpired as number) +
        Number(item.oneClickVerificationExpired || 0);
      entry.oneClickVerificationFailed =
        (entry.oneClickVerificationFailed as number) +
        Number(item.oneClickVerificationFailed || 0);
    }
  }

  const aggregatedData = Array.from(dateMap.values()).sort(
    (a, b) => (a.date as number) - (b.date as number),
  );

  const { series, data } = mapAreaChartData({
    data: aggregatedData,
    seriesConfig: [
      {
        key: 'Verified',
        dataKey: 'oneClickVerificationVerified',
        color: green,
      },
      {
        key: 'Expired',
        dataKey: 'oneClickVerificationExpired',
        color: yellow,
      },
      {
        key: 'Failed',
        dataKey: 'oneClickVerificationFailed',
        color: red,
      },
    ],
  });

  return { series, data };
}
