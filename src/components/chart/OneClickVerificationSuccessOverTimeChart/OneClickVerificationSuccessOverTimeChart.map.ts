import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart';

import type { OneClickVerificationChartData } from './OneClickVerificationSuccessOverTimeChart';

export interface OneClickVerificationSuccessIntervalEntry {
  oneClickVerificationCreated: number;
  oneClickVerificationDelivered: number;
  oneClickVerificationVerified: number;
  oneClickVerificationFailed: number;
  oneClickVerificationSending: number;
  oneClickVerificationUndelivered: number;
  oneClickVerificationExpired: number;
  date: string | number;
}

export interface MapOneClickVerificationSuccessTimeSeriesDataOptions
  extends MapSeriesTimeSeriesDataOptions {
  data: Array<{
    interval?: OneClickVerificationSuccessIntervalEntry[];
    brandUuid: string;
    brandName: string;
  }>;
}

export function mapOneClickVerificationSuccessOverTimeChartData(
  options: MapOneClickVerificationSuccessTimeSeriesDataOptions,
): OneClickVerificationChartData[] {
  const calculatePercentage = (
    entry: OneClickVerificationSuccessIntervalEntry,
  ) => {
    const {
      oneClickVerificationVerified: verified,
      oneClickVerificationExpired: expired,
      oneClickVerificationFailed: failed,
    } = entry;

    const total = verified + expired + failed;

    return total > 0 ? Math.round((verified / total) * 100) : 0;
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
