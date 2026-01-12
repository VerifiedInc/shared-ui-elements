import _ from 'lodash';

import { stringToHashedColor } from '../../../utils/uuidColor';

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

export interface MapSeriesTimeSeriesDataOptions {
  brands: BrandFilter[];
  colorMap: Map<string, string>;
  data: Array<{
    interval?: Array<{
      date: string | number;
      [key: string]: any;
    }>;
    keyword?: string;
    brandUuid: string;
    brandName: string;
  }>;
  keyValue: string;
  filterOutZeroValues?: boolean;
}

/**
 * Generic mapper for time series data grouped by keyword.
 * Maps raw time series data into a format suitable for charting.
 * This is a shared mapper that can be used by any chart component that groups data by keyword.
 *
 * @param options Configuration options for mapping the data
 * @returns Array of formatted time series data ready for charting, one entry per keyword
 */
export function mapSeriesTimeSeriesData(
  options: MapSeriesTimeSeriesDataOptions,
): TimeSeriesChartData[] {
  const { brands, colorMap, data, keyValue } = options;

  // Group data by keyword first
  const keywordDataMap = new Map<
    string,
    {
      keyword?: string;
      brandUuid: string;
      brandName: string;
      brandColor?: string;
      brandIntegrationType: string;
      chartData: TimeSeriesDataPoint[];
    }
  >();

  brands.forEach(({ _raw: brand }) => {
    // Find ALL data entries for this brand (a brand can have multiple keywords)
    const brandDataEntries =
      data?.filter((item) => item.brandUuid === brand.brandUuid) ?? [];

    brandDataEntries.forEach((brandData) => {
      const identifier = brandData.keyword ?? brandData.brandUuid;

      if (!identifier) return;

      const chartData = (brandData.interval ?? [])
        .map((item) => ({
          date: +new Date(item.date),
          value: Number(item[keyValue] || 0),
        }))
        .filter((item) =>
          options.filterOutZeroValues ? item.value > 0 : true,
        );

      if (keywordDataMap.has(identifier)) {
        // Merge chart data for the same keyword
        const existing = keywordDataMap.get(identifier);
        if (!existing) return;

        const mergedChartData = [...existing.chartData, ...chartData];

        // Group by date and sum values for the same dates
        const dateValueMap = new Map<number, number>();
        mergedChartData.forEach(({ date, value }) => {
          dateValueMap.set(date, (dateValueMap.get(date) ?? 0) + value);
        });

        const consolidatedChartData = Array.from(dateValueMap.entries())
          .map(([date, value]) => ({ date, value }))
          .sort((a, b) => a.date - b.date);

        keywordDataMap.set(identifier, {
          keyword: brandData.keyword,
          brandUuid: brand.brandUuid,
          brandName: brand.brandName,
          brandColor: colorMap.get(brand.brandUuid),
          brandIntegrationType: brand.integrationType,
          chartData: consolidatedChartData,
        });
      } else {
        keywordDataMap.set(identifier, {
          keyword: brandData.keyword,
          brandUuid: brand.brandUuid,
          brandName: brand.brandName,
          brandColor: colorMap.get(brand.brandUuid),
          brandIntegrationType: brand.integrationType,
          chartData,
        });
      }
    });
  });

  const getIntegrationType = (integrationType: string) => {
    if (integrationType === 'hosted') {
      return 'SDK';
    }
    if (integrationType === 'non-hosted') {
      return 'API';
    }

    return integrationType;
  };

  const getColor = ({
    keyword,
    brandColor,
    brandUuid,
  }: {
    keyword?: string;
    brandColor?: string;
    brandUuid: string;
  }) => {
    if (keyword) {
      return stringToHashedColor(keyword);
    }
    return brandColor ?? stringToHashedColor(brandUuid);
  };

  // Convert map to array of TimeSeriesChartData
  const mappedData = Array.from(keywordDataMap.values()).map(
    ({
      keyword,
      brandUuid,
      brandName,
      brandColor,
      brandIntegrationType,
      chartData,
    }) => ({
      uuid: keyword ?? brandUuid, // Use keyword as uuid since we're grouping by keyword, fallback to brandUuid
      name: keyword ?? brandName, // Display keyword as the name, fallback to brandName
      description: keyword ? '' : getIntegrationType(brandIntegrationType),
      color: getColor({ keyword, brandColor, brandUuid }),
      chartData,
    }),
  );

  // Sort by keyword name for consistent ordering
  return _.chain(mappedData)
    .sortBy((value) => value.name)
    .toArray()
    .value();
}
