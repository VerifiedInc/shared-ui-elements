import { mapAreaChartData } from '../AreaChart/AreaChart.map';
import type { AreaSeriesChartData } from '../AreaChart';
import type { BrandFilter } from '../../BrandFilterInput';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';
import { blue, green } from '../../../styles/colors';

export type { OneClickVerificationBrandData } from '../oneClickVerification.types';

export interface MapOneClickVerificationDeliveryChartDataOptions {
  brands?: BrandFilter[];
  data: OneClickVerificationBrandData[];
}

export interface OneClickVerificationDeliveryChartData {
  series: AreaSeriesChartData[];
  data: Array<Record<string, number | string>>;
}

/**
 * Maps raw OneClick verification data into a delivery over time chart format.
 * Aggregates sending and delivered counts across all (optionally filtered) brands by date.
 *
 * Series order is Sending → Delivered, which determines the visual stack order
 * (bottom to top) when rendered with `stackMode="stack"` or `stackMode="expand"`.
 *
 * @param options Configuration options for mapping the data
 * @returns Formatted data ready for the AreaChart component
 */
export function mapOneClickVerificationDeliveryChartData(
  options: MapOneClickVerificationDeliveryChartDataOptions,
): OneClickVerificationDeliveryChartData {
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
          oneClickVerificationSending: 0,
          oneClickVerificationDelivered: 0,
        });
      }
      const entry = dateMap.get(date);
      if (!entry) continue;
      entry.oneClickVerificationSending =
        (entry.oneClickVerificationSending as number) +
        Number(item.oneClickVerificationSending || 0);
      entry.oneClickVerificationDelivered =
        (entry.oneClickVerificationDelivered as number) +
        Number(item.oneClickVerificationDelivered || 0);
    }
  }

  const aggregatedData = Array.from(dateMap.values()).sort(
    (a, b) => (a.date as number) - (b.date as number),
  );

  const { series, data } = mapAreaChartData({
    data: aggregatedData,
    seriesConfig: [
      {
        key: 'Sent',
        dataKey: 'oneClickVerificationSending',
        color: blue,
      },
      {
        key: 'Delivered',
        dataKey: 'oneClickVerificationDelivered',
        color: green,
      },
    ],
  });

  return { series, data };
}
