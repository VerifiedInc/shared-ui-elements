import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';

export interface MapOneClickVerificationTimeSeriesDataOptions
  extends MapSeriesTimeSeriesDataOptions {
  data: Array<{
    interval?: Array<{
      oneClickVerificationCreated: number;
      oneClickVerificationDelivered: number;
      oneClickVerificationVerified: number;
      oneClickVerificationFailed: number;
      oneClickVerificationSending: number;
      oneClickVerificationUndelivered: number;
      oneClickVerificationExpired: number;
      date: string | number;
      [key: string]: any;
    }>;
    brandUuid: string;
    brandName: string;
  }>;
}

/**
 * Maps raw OneClick verification time series data into a format suitable for charting.
 * Delegates to the shared mapSeriesTimeSeriesData function.
 *
 * @param options Configuration options for mapping the data
 * @returns Array of formatted time series data ready for charting, one entry per keyword
 */
export function mapOneClickVerificationTimeSeriesData(
  options: MapOneClickVerificationTimeSeriesDataOptions,
): ReturnType<typeof mapSeriesTimeSeriesData> {
  return mapSeriesTimeSeriesData(options);
}
