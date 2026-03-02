import { mapAreaChartData } from '../AreaChart/AreaChart.map';
import type { AreaSeriesChartData } from '../AreaChart';
import type { BrandFilter } from '../../BrandFilterInput';
import { green, yellow, red } from '../../../styles/colors';

export interface OneClickHealthOutcomeIntervalEntry {
  date: string | number;
  oneClickHealthSucceeded: number;
  oneClickHealthPartial: number;
  oneClickHealthFailed: number;
}

export interface OneClickHealthOutcomeBrandData {
  brandUuid: string;
  brandName: string;
  interval?: OneClickHealthOutcomeIntervalEntry[];
}

export interface MapOneClickHealthOutcomeOverTimeChartDataOptions {
  brands?: BrandFilter[];
  data: OneClickHealthOutcomeBrandData[];
}

export interface OneClickHealthOutcomeChartData {
  series: AreaSeriesChartData[];
  data: Array<Record<string, number | string>>;
}

export function mapOneClickHealthOutcomeOverTimeChartData(
  options: MapOneClickHealthOutcomeOverTimeChartDataOptions,
): OneClickHealthOutcomeChartData {
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
          oneClickHealthSucceeded: 0,
          oneClickHealthPartial: 0,
          oneClickHealthFailed: 0,
        });
      }
      const entry = dateMap.get(date);
      if (!entry) continue;
      entry.oneClickHealthSucceeded =
        (entry.oneClickHealthSucceeded as number) +
        Number(item.oneClickHealthSucceeded || 0);
      entry.oneClickHealthPartial =
        (entry.oneClickHealthPartial as number) +
        Number(item.oneClickHealthPartial || 0);
      entry.oneClickHealthFailed =
        (entry.oneClickHealthFailed as number) +
        Number(item.oneClickHealthFailed || 0);
    }
  }

  const aggregatedData = Array.from(dateMap.values()).sort(
    (a, b) => (a.date as number) - (b.date as number),
  );

  const { series, data } = mapAreaChartData({
    data: aggregatedData,
    seriesConfig: [
      {
        key: 'Succeeded',
        dataKey: 'oneClickHealthSucceeded',
        color: green,
      },
      {
        key: 'Partial',
        dataKey: 'oneClickHealthPartial',
        color: yellow,
      },
      {
        key: 'Failed',
        dataKey: 'oneClickHealthFailed',
        color: red,
      },
    ],
  });

  return { series, data };
}
