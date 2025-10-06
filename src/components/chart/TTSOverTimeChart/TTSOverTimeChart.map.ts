import _ from 'lodash';

import { stringToHashedColor } from '../../../utils/uuidColor';

import { BrandFilter } from '../../BrandFilterInput';

interface TimeSeriesDataPoint {
  date: number;
  value: number;
}

export interface TimeSeriesChartData {
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
      date: string | number;
      [key: string]: any;
    }>;
    keyword: string;
    brandUuid: string;
    brandName: string;
  }>;
  keyValue: string;
  filterOutZeroValues?: boolean;
}

/**
 * Maps raw time series data into a format suitable for charting, grouped by keyword
 * @param options Configuration options for mapping the data
 * @returns Array of formatted time series data ready for charting, one entry per keyword
 */
export function mapTTSTimeSeriesData(
  options: MapTimeSeriesDataOptions,
): TimeSeriesChartData[] {
  const { brands, data, keyValue } = options;

  // Group data by keyword first
  const keywordDataMap = new Map<
    string,
    {
      keyword: string;
      brandName: string;
      chartData: TimeSeriesDataPoint[];
    }
  >();

  brands.forEach(({ _raw: brand }) => {
    // Find ALL data entries for this brand (a brand can have multiple keywords)
    const brandDataEntries =
      data?.filter((item) => item.brandUuid === brand.brandUuid) ?? [];

    brandDataEntries.forEach((brandData) => {
      const keyword = brandData.keyword;

      if (!keyword) return;

      const chartData = (brandData.interval ?? [])
        .map((item) => ({
          date: +new Date(item.date),
          value: Number(item[keyValue] || 0),
        }))
        .filter((item) =>
          options.filterOutZeroValues ? item.value > 0 : true,
        );

      if (keywordDataMap.has(keyword)) {
        // Merge chart data for the same keyword
        const existing = keywordDataMap.get(keyword);
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

        keywordDataMap.set(keyword, {
          keyword,
          brandName: `${existing.brandName}, ${brand.brandName}`,
          chartData: consolidatedChartData,
        });
      } else {
        keywordDataMap.set(keyword, {
          keyword,
          brandName: brand.brandName,
          chartData,
        });
      }
    });
  });

  // Convert map to array of TimeSeriesChartData
  const mappedData = Array.from(keywordDataMap.values()).map(
    ({ keyword, brandName, chartData }) => ({
      uuid: keyword, // Use keyword as uuid since we're grouping by keyword
      name: keyword, // Display keyword as the name
      color: stringToHashedColor(keyword),
      chartData,
    }),
  );

  // Sort by keyword name for consistent ordering
  return _.chain(mappedData)
    .sortBy((value) => value.name)
    .toArray()
    .value();
}
