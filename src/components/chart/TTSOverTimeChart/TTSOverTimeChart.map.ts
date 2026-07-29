import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';

export interface MapTTSTimeSeriesDataOptions extends MapSeriesTimeSeriesDataOptions {
  data: Array<{
    interval?: Array<{
      ttsSent: number;
      ttsVerified: number;
      date: string | number;
      [key: string]: any;
    }>;
    keyword: string;
    brandUuid: string;
    brandName: string;
  }>;
}

/**
 * Maps raw TTS time series data into a format suitable for charting, grouped by keyword.
 * Delegates to the shared mapSeriesTimeSeriesData function.
 *
 * @param options Configuration options for mapping the data
 * @returns Array of formatted time series data ready for charting, one entry per keyword
 */
export function mapTTSTimeSeriesData(
  options: MapTTSTimeSeriesDataOptions,
): ReturnType<typeof mapSeriesTimeSeriesData> {
  return mapSeriesTimeSeriesData(options);
}
