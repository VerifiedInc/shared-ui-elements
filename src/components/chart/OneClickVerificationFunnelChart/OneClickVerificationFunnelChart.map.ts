import type { BrandFilter } from '../../BrandFilterInput';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';

export type {
  OneClickVerificationIntervalEntry,
  OneClickVerificationBrandData,
} from '../oneClickVerification.types';

export interface MapOneClickVerificationFunnelChartDataOptions {
  brands?: BrandFilter[];
  data: OneClickVerificationBrandData[];
}

export interface OneClickVerificationFunnelStepData {
  name: string;
  value: number;
  /** Relative drop-off from the previous step as a percentage. null for first step or when prev === 0. */
  dropOffPercent: number | null;
}

/**
 * Maps raw OneClick verification events data into a format suitable for the funnel chart.
 * Aggregates all four happy-path statuses across all matching brands and interval entries.
 *
 * @param options Configuration options including optional brand filter and raw data
 * @returns Array of 4 funnel steps ordered: Created → Sending → Delivered → Verified
 */
export function mapOneClickVerificationFunnelChartData(
  options: MapOneClickVerificationFunnelChartDataOptions,
): OneClickVerificationFunnelStepData[] {
  const brandUuids = options.brands
    ? new Set(options.brands.map((b) => b._raw.brandUuid))
    : null;

  const totals = { created: 0, sending: 0, delivered: 0, verified: 0 };

  for (const brand of options.data) {
    if (brandUuids && !brandUuids.has(brand.brandUuid)) continue;

    for (const entry of brand.interval ?? []) {
      totals.created += Number(entry.oneClickVerificationCreated || 0);
      totals.sending += Number(entry.oneClickVerificationSending || 0);
      totals.delivered += Number(entry.oneClickVerificationDelivered || 0);
      totals.verified += Number(entry.oneClickVerificationVerified || 0);
    }
  }

  const values = [
    totals.created,
    totals.sending,
    totals.delivered,
    totals.verified,
  ];
  const names = ['Created', 'Sending', 'Delivered', 'Verified'];

  return names.map((name, i) => {
    const value = values[i];
    const prev = values[i - 1];
    let dropOffPercent: number | null = null;

    if (i > 0) {
      if (prev === 0) {
        dropOffPercent = null;
      } else {
        const percent = ((prev - value) / prev) * 100;
        if (percent < 0) {
          console.warn(
            `[OneClickVerificationFunnelChart] Anomaly: ${name} (${value}) exceeds ${names[i - 1]} (${prev}). Drop-off hidden.`,
          );
          dropOffPercent = null;
        } else {
          dropOffPercent = percent;
        }
      }
    }

    return { name, value, dropOffPercent };
  });
}
