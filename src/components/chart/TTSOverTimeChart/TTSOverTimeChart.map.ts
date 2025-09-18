import _ from 'lodash';

import { uuidToHashedColor } from '../../../utils/uuidColor';

import { BrandFilter } from '../../BrandFilterInput';

interface TimeSeriesDataPoint {
  date: number;
  value: number;
}

interface TimeSeriesChartData {
  uuid: string;
  name: string;
  color: string;
  chartData: TimeSeriesDataPoint[];
}

interface MapTimeSeriesDataOptions {
  brands: BrandFilter[];
  data: Array<{
    interval?: Array<{
      ttsSent: number;
      ttsVerified: number;
      date: string;
      [key: string]: any;
    }>;
    brandUuid: string;
    brandName: string;
  }>;
  keyValue: string;
  filterOutZeroValues?: boolean;
}

/**
 * Maps raw time series data into a format suitable for charting
 * @param options Configuration options for mapping the data
 * @returns Array of formatted time series data ready for charting
 */
export function mapTTSTimeSeriesData(
  options: MapTimeSeriesDataOptions,
): TimeSeriesChartData[] {
  const { brands, data, keyValue } = options;

  const mappedData = brands.flatMap(({ _raw: brand }) => {
    const brandData = data?.find((item) => item.brandUuid === brand.brandUuid);

    const chartData = (brandData?.interval ?? [])
      .map((item) => ({
        date: +new Date(item.date),
        value: Number(item[keyValue] || 0),
      }))
      .filter((item) => (options.filterOutZeroValues ? item.value > 0 : true));

    return {
      uuid: brand.brandUuid,
      name: brand.brandName,
      color: uuidToHashedColor(crypto.randomUUID()), // TODO - to be defined once the structure
      chartData,
    };
  });

  // Sort by name for consistent ordering
  return _.chain(mappedData)
    .sortBy((value) => value.name)
    .toArray()
    .value();
}
