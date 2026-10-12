import {
  mapSeriesTimeSeriesData,
  type MapSeriesTimeSeriesDataOptions,
} from '../SeriesChart/SeriesChart.map';
import type { SeriesChartData } from '../SeriesChart';
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

/**
 * Names each series by its brand's internal name instead of the external one. A keyword series
 * (Text to Signup) stays named by its keyword and carries the brand in `brandName`; any other
 * series is named by its brand. Brands without an internal name keep the external one, and the
 * series order is kept so toggling names doesn't reshuffle the chart.
 */
export function applyInternalBrandNames(
  subCharts: readonly [SubChartConfig, ...SubChartConfig[]],
  internalBrandNames: Map<string, string>,
): readonly [SubChartConfig, ...SubChartConfig[]] {
  const rename = (series: SeriesChartData): SeriesChartData => {
    const brandUuid = series.brandUuid ?? series.uuid;
    const internalName = internalBrandNames.get(brandUuid);
    if (!internalName) return series;
    // A keyword series is keyed by its keyword, not its brand.
    const isKeywordSeries = series.uuid !== brandUuid;
    return {
      ...series,
      name: isKeywordSeries ? series.name : internalName,
      ...(series.brandName === undefined ? {} : { brandName: internalName }),
    };
  };

  const [first, ...rest] = subCharts.map((subChart) => ({
    ...subChart,
    data: subChart.data.map(rename),
  }));
  return [first, ...rest];
}
