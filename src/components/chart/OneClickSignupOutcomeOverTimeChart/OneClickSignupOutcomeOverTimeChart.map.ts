import { mapAreaChartData } from '../AreaChart/AreaChart.map';
import type { AreaSeriesChartData } from '../AreaChart';
import type { BrandFilter } from '../../BrandFilterInput';
import { green, red } from '../../../styles/colors';

export interface OneClickSignupOutcomeIntervalEntry {
  date: string | number;
  oneClickCreated: number;
  oneClickSuccess: number;
  [key: string]: any;
}

export interface OneClickSignupOutcomeBrandData {
  brandUuid: string;
  brandName: string;
  interval?: OneClickSignupOutcomeIntervalEntry[];
}

export interface MapOneClickSignupOutcomeOverTimeChartDataOptions {
  brands?: BrandFilter[];
  data: OneClickSignupOutcomeBrandData[];
}

export interface OneClickSignupOutcomeChartData {
  series: AreaSeriesChartData[];
  data: Array<Record<string, number | string>>;
}

export function mapOneClickSignupOutcomeOverTimeChartData(
  options: MapOneClickSignupOutcomeOverTimeChartDataOptions,
): OneClickSignupOutcomeChartData {
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
          oneClickSuccess: 0,
          oneClickFailed: 0,
        });
      }
      const entry = dateMap.get(date);
      if (!entry) continue;
      const success = Number(item.oneClickSuccess || 0);
      const created = Number(item.oneClickCreated || 0);
      entry.oneClickSuccess = (entry.oneClickSuccess as number) + success;
      entry.oneClickFailed =
        (entry.oneClickFailed as number) + Math.max(0, created - success);
    }
  }

  const aggregatedData = Array.from(dateMap.values()).sort(
    (a, b) => (a.date as number) - (b.date as number),
  );

  const { series, data } = mapAreaChartData({
    data: aggregatedData,
    seriesConfig: [
      {
        key: 'Success',
        dataKey: 'oneClickSuccess',
        color: green,
      },
      {
        key: 'Failed',
        dataKey: 'oneClickFailed',
        color: red,
      },
    ],
  });

  return { series, data };
}
