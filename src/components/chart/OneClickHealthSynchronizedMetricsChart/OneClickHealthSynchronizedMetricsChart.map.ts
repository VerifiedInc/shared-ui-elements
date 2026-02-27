import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';
import type { BrandFilter } from '../../BrandFilterInput';
import type { SynchronizedMappedData } from '../SynchronizedMetricsChart';

export interface OneClickHealthSynchronizedInterval {
  date: string | number;
  oneClickHealthCreated: number;
  oneClickHealthSucceeded: number;
}

export interface OneClickHealthSynchronizedBrandData {
  brandUuid: string;
  brandName: string;
  interval?: OneClickHealthSynchronizedInterval[];
}

export interface MapOneClickHealthSynchronizedDataOptions {
  brands: BrandFilter[];
  colorMap: Map<string, string>;
  data: OneClickHealthSynchronizedBrandData[];
}

export function mapOneClickHealthSynchronizedData(
  options: MapOneClickHealthSynchronizedDataOptions,
): SynchronizedMappedData {
  const { brands, colorMap, data } = options;

  const mapperBase: Omit<MapSeriesTimeSeriesDataOptions, 'keyValue'> = {
    brands,
    colorMap,
    data,
  };

  const started = mapSeriesTimeSeriesData({
    ...mapperBase,
    keyValue: 'oneClickHealthCreated',
  });

  const succeeded = mapSeriesTimeSeriesData({
    ...mapperBase,
    keyValue: 'oneClickHealthSucceeded',
  });

  const percentageData = data.map((brand) => ({
    ...brand,
    interval: (brand.interval ?? []).map((item) => ({
      ...item,
      percentage:
        item.oneClickHealthCreated > 0
          ? (item.oneClickHealthSucceeded / item.oneClickHealthCreated) * 100
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
