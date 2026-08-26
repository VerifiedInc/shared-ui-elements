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

/**
 * Overall rate per timestamp across the visible brands, pooling the raw counts
 * before dividing. Exported for testing.
 */
export function pooledPercentageByDate({
  chartData,
  brands,
  numerator,
  denominator,
}: {
  chartData: BrandIntervalData[];
  brands: BrandFilter[];
  numerator: string;
  denominator: string;
}): Record<number, number> {
  const visible = new Set(brands.map((brand) => brand._raw.brandUuid));
  const totals = new Map<number, { numerator: number; denominator: number }>();

  for (const brand of chartData) {
    if (!visible.has(brand.brandUuid)) continue;
    for (const item of brand.interval ?? []) {
      const date = +new Date(item.date);
      const running = totals.get(date) ?? { numerator: 0, denominator: 0 };
      running.numerator += Number(item[numerator]) || 0;
      running.denominator += Number(item[denominator]) || 0;
      totals.set(date, running);
    }
  }

  const pooled: Record<number, number> = {};
  for (const [date, sums] of totals) {
    pooled[date] =
      sums.denominator > 0
        ? Math.min((sums.numerator / sums.denominator) * 100, 100)
        : 0;
  }
  return pooled;
}

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
        isPercentage: false,
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
      isPercentage: true,
      totalByDate: pooledPercentageByDate({
        chartData,
        brands,
        numerator,
        denominator,
      }),
    };
  });

  return result as [SubChartConfig, ...SubChartConfig[]];
}
