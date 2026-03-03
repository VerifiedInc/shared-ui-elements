import { mapAreaChartData } from '../AreaChart/AreaChart.map';
import type { AreaSeriesChartData } from '../AreaChart';
import type { BrandFilter } from '../../BrandFilterInput';
import { blue, green } from '../../../styles/colors';

export interface OneClickHealthConversionIntervalEntry {
  date: string | number;
  oneClickHealthCreated: number;
  oneClickHealthSucceeded: number;
}

export interface OneClickHealthConversionBrandData {
  brandUuid: string;
  brandName: string;
  interval?: OneClickHealthConversionIntervalEntry[];
}

export interface MapOneClickHealthConversionChartDataOptions {
  brands?: BrandFilter[];
  data: OneClickHealthConversionBrandData[];
}

export interface OneClickHealthConversionChartData {
  series: AreaSeriesChartData[];
  data: Array<Record<string, number | string>>;
}

export function mapOneClickHealthConversionChartData(
  options: MapOneClickHealthConversionChartDataOptions,
): OneClickHealthConversionChartData {
  const dateMap = new Map<number, Record<string, number | string>>();
  const brandUuids = options.brands
    ? new Set(options.brands.map((b) => b._raw.brandUuid))
    : null;

  for (const brand of options.data) {
    if (brandUuids && !brandUuids.has(brand.brandUuid)) continue;

    for (const item of brand.interval ?? []) {
      const date = +new Date(item.date);
      if (!dateMap.has(date)) {
        dateMap.set(date, {
          date,
          oneClickHealthCreated: 0,
          oneClickHealthSucceeded: 0,
        });
      }
      const entry = dateMap.get(date);
      if (!entry) continue;
      entry.oneClickHealthCreated =
        (entry.oneClickHealthCreated as number) +
        Number(item.oneClickHealthCreated || 0);
      entry.oneClickHealthSucceeded =
        (entry.oneClickHealthSucceeded as number) +
        Number(item.oneClickHealthSucceeded || 0);
    }
  }

  const aggregatedData = Array.from(dateMap.values()).sort(
    (a, b) => (a.date as number) - (b.date as number),
  );

  const { series, data } = mapAreaChartData({
    data: aggregatedData,
    seriesConfig: [
      {
        key: 'Started',
        dataKey: 'oneClickHealthCreated',
        color: blue,
      },
      {
        key: 'Succeeded',
        dataKey: 'oneClickHealthSucceeded',
        color: green,
      },
    ],
  });

  return { series, data };
}
