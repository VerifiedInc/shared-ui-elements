import { BrandFilter } from '../../BrandFilterInput';
import { kebabCaseToPretty } from '../../../utils/string/formatKebabToPretty';
import { uuidToHashedColor } from '../../../utils/uuidColor';
import _ from 'lodash';

export interface TimeSeriesDataPoint {
  date: number;
  value: number;
}

export interface TimeSeriesChartData {
  uuid: string;
  name: string;
  color: string;
  integrationType: string;
  chartData: TimeSeriesDataPoint[];
}

export interface MapTimeSeriesDataOptions {
  brands: BrandFilter[];
  data: Array<{
    interval?: Array<{
      oneClickCreated: number;
      oneClickSuccess: number;
      date: number;
      totalCost: string;
      [key: string]: any;
    }>;
    brandUuid: string;
    brandName: string;
    overall: {
      oneClickCreated: number;
      oneClickSuccess: number;
      totalCost: string;
    };
  }>;
  keyValue: string;
  defaultColor?: string;
}

/**
 * Maps raw time series data into a format suitable for charting
 * @param options Configuration options for mapping the data
 * @returns Array of formatted time series data ready for charting
 */
export function mapTimeSeriesData(
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
      .filter((item) => item.value > 0);

    return {
      uuid: brand.brandUuid,
      name: brand.brandName,
      integrationType: kebabCaseToPretty(brand.integrationType),
      color:
        brand.additionalData?.primaryColor ??
        uuidToHashedColor(brand.brandUuid),
      chartData,
    };
  });

  // Sort by name for consistent ordering
  return _.chain(mappedData)
    .sortBy((value) => value.name)
    .toArray()
    .value();
}
