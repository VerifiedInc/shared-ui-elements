import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';
import type { BrandFilter } from '../../BrandFilterInput';
import type { SeriesChartData } from '../SeriesChart';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';

export interface MapOneClickVerificationConversionSynchronizedDataOptions {
  brands: BrandFilter[];
  colorMap: Map<string, string>;
  data: OneClickVerificationBrandData[];
}

export interface OneClickVerificationConversionSynchronizedMappedData {
  started: SeriesChartData[];
  succeeded: SeriesChartData[];
  percentage: SeriesChartData[];
}

export function mapOneClickVerificationConversionSynchronizedData(
  options: MapOneClickVerificationConversionSynchronizedDataOptions,
): OneClickVerificationConversionSynchronizedMappedData {
  const { brands, colorMap, data } = options;

  const mapperBase: Omit<MapSeriesTimeSeriesDataOptions, 'keyValue'> = {
    brands,
    colorMap,
    data,
  };

  const started = mapSeriesTimeSeriesData({
    ...mapperBase,
    keyValue: 'oneClickVerificationCreated',
  });

  const succeeded = mapSeriesTimeSeriesData({
    ...mapperBase,
    keyValue: 'oneClickVerificationVerified',
  });

  const dataWithPercentage = data.map((brand) => ({
    ...brand,
    interval: (brand.interval ?? []).map((item) => ({
      ...item,
      conversionPercentage:
        item.oneClickVerificationCreated > 0
          ? (item.oneClickVerificationVerified /
              item.oneClickVerificationCreated) *
            100
          : 0,
    })),
  }));

  const percentage = mapSeriesTimeSeriesData({
    ...mapperBase,
    data: dataWithPercentage,
    keyValue: 'conversionPercentage',
  });

  return { started, succeeded, percentage };
}
