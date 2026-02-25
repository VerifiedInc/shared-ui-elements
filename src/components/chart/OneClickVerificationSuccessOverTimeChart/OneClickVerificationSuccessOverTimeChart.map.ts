import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart';

import type { OneClickVerificationChartData } from './OneClickVerificationSuccessOverTimeChart';
import type {
  OneClickVerificationBrandData,
  OneClickVerificationIntervalEntry,
} from '../oneClickVerification.types';

/** @deprecated Use {@link OneClickVerificationIntervalEntry} from the shared chart types. */
export type OneClickVerificationSuccessIntervalEntry =
  OneClickVerificationIntervalEntry;

export interface MapOneClickVerificationSuccessTimeSeriesDataOptions
  extends MapSeriesTimeSeriesDataOptions {
  data: OneClickVerificationBrandData[];
}

export function mapOneClickVerificationSuccessOverTimeChartData(
  options: MapOneClickVerificationSuccessTimeSeriesDataOptions,
): OneClickVerificationChartData[] {
  const calculatePercentage = (entry: OneClickVerificationIntervalEntry) => {
    const {
      oneClickVerificationVerified: verified,
      oneClickVerificationCreated: created,
    } = entry;

    return created > 0 ? Math.round((verified / created) * 100) : 0;
  };

  const enrichedOptions = {
    ...options,
    data: options.data.map((brand) => ({
      ...brand,
      interval: brand.interval?.map((entry) => ({
        ...entry,
        verificationPercentage: calculatePercentage(entry),
        verificationTotal: 100,
      })),
    })),
  };

  const verifiedSeries = mapSeriesTimeSeriesData({
    ...enrichedOptions,
    keyValue: 'verificationPercentage',
  });

  const totalSeries = mapSeriesTimeSeriesData({
    ...enrichedOptions,
    keyValue: 'verificationTotal',
  });

  return verifiedSeries.map((series) => {
    const total = totalSeries.find((s) => s.uuid === series.uuid);

    return {
      ...series,
      chartData: series.chartData.map((point: any) => {
        const totalPoint = total?.chartData.find(
          (p: any) => p.date === point.date,
        );
        return {
          date: point.date,
          verificationPercentage: point.value,
          verificationTotal: totalPoint?.value ?? 0,
        };
      }),
    };
  });
}
