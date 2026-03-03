import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';
import type { BrandFilter } from '../../BrandFilterInput';
import type { SeriesChartData } from '../SeriesChart';
import type { OneClickVerificationBrandData } from '../oneClickVerification.types';

export interface MapOneClickVerificationDeliverySynchronizedDataOptions {
  brands: BrandFilter[];
  colorMap: Map<string, string>;
  data: OneClickVerificationBrandData[];
}

export interface OneClickVerificationDeliverySynchronizedMappedData {
  sent: SeriesChartData[];
  delivered: SeriesChartData[];
}

export function mapOneClickVerificationDeliverySynchronizedData(
  options: MapOneClickVerificationDeliverySynchronizedDataOptions,
): OneClickVerificationDeliverySynchronizedMappedData {
  const { brands, colorMap, data } = options;

  const mapperBase: Omit<MapSeriesTimeSeriesDataOptions, 'keyValue'> = {
    brands,
    colorMap,
    data,
  };

  const sent = mapSeriesTimeSeriesData({
    ...mapperBase,
    keyValue: 'oneClickVerificationSending',
  });

  const delivered = mapSeriesTimeSeriesData({
    ...mapperBase,
    keyValue: 'oneClickVerificationDelivered',
  });

  return { sent, delivered };
}
