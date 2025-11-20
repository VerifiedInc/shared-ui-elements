import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';

export interface MapOneClickTimeSeriesDataOptions
  extends MapSeriesTimeSeriesDataOptions {
  data: Array<{
    interval?: Array<{
      oneClickCreated: number;
      oneClickSuccess: number;
      date: string | number;
      totalCost?: string;
      riskSignal?: number;
      [key: string]: any;
    }>;
    brandUuid: string;
    brandName: string;
  }>;
}

/**
 * Maps raw OneClick time series data into a format suitable for charting.
 * Delegates to the shared mapSeriesTimeSeriesData function.
 *
 * @param options Configuration options for mapping the data
 * @returns Array of formatted time series data ready for charting, one entry per keyword
 */
export function mapOneClickTimeSeriesData(
  options: MapOneClickTimeSeriesDataOptions,
): ReturnType<typeof mapSeriesTimeSeriesData> {
  return mapSeriesTimeSeriesData(options);
}
