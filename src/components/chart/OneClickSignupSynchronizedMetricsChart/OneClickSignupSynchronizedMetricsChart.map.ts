import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';
import type { BrandFilter } from '../../BrandFilterInput';
import type { SynchronizedMappedData } from '../SynchronizedMetricsChart';

export interface OneClickSignupSynchronizedInterval {
  date: string | number;
  oneClickCreated: number;
  oneClickSuccess: number;
}

export interface OneClickSignupSynchronizedBrandData {
  brandUuid: string;
  brandName: string;
  interval?: OneClickSignupSynchronizedInterval[];
}

export interface MapOneClickSignupSynchronizedDataOptions {
  brands: BrandFilter[];
  colorMap: Map<string, string>;
  data: OneClickSignupSynchronizedBrandData[];
}

export function mapOneClickSignupSynchronizedData(
  options: MapOneClickSignupSynchronizedDataOptions,
): SynchronizedMappedData {
  const { brands, colorMap, data } = options;

  const mapperBase: Omit<MapSeriesTimeSeriesDataOptions, 'keyValue'> = {
    brands,
    colorMap,
    data,
  };

  const started = mapSeriesTimeSeriesData({
    ...mapperBase,
    keyValue: 'oneClickCreated',
  });

  const succeeded = mapSeriesTimeSeriesData({
    ...mapperBase,
    keyValue: 'oneClickSuccess',
  });

  const percentageData = data.map((brand) => ({
    ...brand,
    interval: (brand.interval ?? []).map((item) => ({
      ...item,
      percentage:
        item.oneClickCreated > 0
          ? (item.oneClickSuccess / item.oneClickCreated) * 100
          : 0,
    })),
  }));

  const percentage = mapSeriesTimeSeriesData({
    ...mapperBase,
    data: percentageData,
    keyValue: 'percentage',
  });

  return { started, succeeded, percentage };
}
