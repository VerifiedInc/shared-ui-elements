import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';
import type { BrandFilter } from '../../../components/BrandFilterInput';
import type { BrandIntervalData } from '../ConversionOverTimeChart';
import type {
  SubChartConfig,
  SynchronizedSubChartConfig,
} from './SynchronizedMetricsChart.types';

export function mapSynchronizedSubCharts({
  chartData,
  subChartConfig,
  brands,
  colorMap,
  isLoading,
}: {
  chartData: BrandIntervalData[];
  subChartConfig: readonly [
    SynchronizedSubChartConfig,
    ...SynchronizedSubChartConfig[],
  ];
  brands: BrandFilter[];
  colorMap: Map<string, string>;
  isLoading: boolean;
}): [SubChartConfig, ...SubChartConfig[]] {
  if (isLoading) {
    return [{ title: subChartConfig[0].title, data: [] }];
  }

  const mapperBase: Omit<MapSeriesTimeSeriesDataOptions, 'keyValue'> = {
    brands,
    colorMap,
    data: chartData as MapSeriesTimeSeriesDataOptions['data'],
  };

  const result = subChartConfig.map((config): SubChartConfig => {
    if (config.dataKey != null) {
      return {
        title: config.title,
        data: mapSeriesTimeSeriesData({
          ...mapperBase,
          keyValue: config.dataKey,
        }),
        tooltipFormatter: config.tooltipFormatter,
        yAxisTickFormatter: config.yAxisTickFormatter,
        yAxisDomain: config.yAxisDomain,
      };
    }

    const { numerator, denominator } = config.percentageOf;
    const percentageData = chartData.map((brand) => ({
      ...brand,
      interval: (brand.interval ?? []).map((item) => ({
        ...item,
        percentage:
          Number(item[denominator]) > 0
            ? Math.min(
                (Number(item[numerator]) / Number(item[denominator])) * 100,
                100,
              )
            : 0,
      })),
    }));

    return {
      title: config.title,
      data: mapSeriesTimeSeriesData({
        ...mapperBase,
        data: percentageData as unknown as MapSeriesTimeSeriesDataOptions['data'],
        keyValue: 'percentage',
      }),
      tooltipFormatter: config.tooltipFormatter,
      yAxisTickFormatter: config.yAxisTickFormatter,
      yAxisDomain: config.yAxisDomain,
    };
  });

  return result as [SubChartConfig, ...SubChartConfig[]];
}
