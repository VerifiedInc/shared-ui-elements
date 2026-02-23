import { mapAreaChartData } from '../AreaChart/AreaChart.map';
import type { AreaSeriesChartData } from '../AreaChart';
import type { BrandFilter } from '../../BrandFilterInput';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';

export type {
  OneClickVerificationIntervalEntry,
  OneClickVerificationBrandData,
} from '../oneClickVerification.types';

export interface MapOneClickVerificationEventsOverTimeChartDataOptions {
  brands?: BrandFilter[];
  data: OneClickVerificationBrandData[];
}

export interface OneClickVerificationEventsAreaChartData {
  series: AreaSeriesChartData[];
  data: Array<Record<string, number | string>>;
}

/**
 * Maps raw OneClick verification events time series data into a format suitable for AreaChart.
 * Aggregates delivered and verified counts across all brands by date.
 *
 * @param options Configuration options for mapping the data
 * @returns Formatted data ready for the AreaChart component
 */
export function mapOneClickVerificationAreaSeriesData(
  options: MapOneClickVerificationEventsOverTimeChartDataOptions,
): OneClickVerificationEventsAreaChartData {
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
          oneClickVerificationDelivered: 0,
          oneClickVerificationVerified: 0,
        });
      }
      const entry = dateMap.get(date);
      if (!entry) continue;
      entry.oneClickVerificationDelivered =
        (entry.oneClickVerificationDelivered as number) +
        Number(item.oneClickVerificationDelivered || 0);
      entry.oneClickVerificationVerified =
        (entry.oneClickVerificationVerified as number) +
        Number(item.oneClickVerificationVerified || 0);
    }
  }

  const aggregatedData = Array.from(dateMap.values()).sort(
    (a, b) => (a.date as number) - (b.date as number),
  );

  const { series, data } = mapAreaChartData({
    data: aggregatedData,
    seriesConfig: [
      {
        key: 'SMS Delivered',
        dataKey: 'oneClickVerificationDelivered',
        color: '#0dbc3d',
      },
      {
        key: 'Phone Numbers Verified',
        dataKey: 'oneClickVerificationVerified',
        color: '#6366f1',
      },
    ],
  });

  return { series, data };
}
