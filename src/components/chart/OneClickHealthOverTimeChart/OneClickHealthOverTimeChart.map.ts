import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';

export interface MapOneClickHealthTimeSeriesDataOptions
  extends MapSeriesTimeSeriesDataOptions {
  data: Array<{
    interval?: Array<{
      oneClickHealthCreated: number;
      oneClickHealthSucceeded: number;
      date: string | number;
      [key: string]: any;
    }>;
    brandUuid: string;
    brandName: string;
  }>;
}

/**
 * Maps raw OneClick health time series data into a format suitable for charting.
 * Delegates to the shared mapSeriesTimeSeriesData function.
 *
 * @param options Configuration options for mapping the data
 * @returns Array of formatted time series data ready for charting, one entry per keyword
 */
export function mapOneClickHealthTimeSeriesData(
  options: MapOneClickHealthTimeSeriesDataOptions,
): ReturnType<typeof mapSeriesTimeSeriesData> {
  return mapSeriesTimeSeriesData(options);
}
