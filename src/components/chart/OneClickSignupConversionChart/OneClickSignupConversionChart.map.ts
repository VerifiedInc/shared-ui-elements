import { mapAreaChartData } from '../AreaChart/AreaChart.map';
import type { AreaSeriesChartData } from '../AreaChart';
import type { BrandFilter } from '../../BrandFilterInput';
import { blue, green } from '../../../styles/colors';

export interface OneClickSignupOutcomeIntervalEntry {
  date: string | number;
  oneClickCreated: number;
  oneClickSuccess: number;
}

export interface OneClickSignupConversionBrandData {
  brandUuid: string;
  brandName: string;
  interval?: OneClickSignupOutcomeIntervalEntry[];
}

export interface MapOneClickSignupConversionChartDataOptions {
  brands?: BrandFilter[];
  data: OneClickSignupConversionBrandData[];
}

export interface OneClickSignupConversionChartData {
  series: AreaSeriesChartData[];
  data: Array<Record<string, number | string>>;
}

export function mapOneClickSignupConversionChartData(
  options: MapOneClickSignupConversionChartDataOptions,
): OneClickSignupConversionChartData {
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
          oneClickCreated: 0,
          oneClickSuccess: 0,
        });
      }
      const entry = dateMap.get(date);
      if (!entry) continue;
      entry.oneClickCreated =
        (entry.oneClickCreated as number) + Number(item.oneClickCreated || 0);
      entry.oneClickSuccess =
        (entry.oneClickSuccess as number) + Number(item.oneClickSuccess || 0);
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
        dataKey: 'oneClickCreated',
        color: blue,
      },
      {
        key: 'Succeeded',
        dataKey: 'oneClickSuccess',
        color: green,
      },
    ],
  });

  return { series, data };
}
