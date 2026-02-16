import { mapAreaChartData } from '../AreaChart/AreaChart.map';

export interface OneClickVerificationSuccessIntervalEntry {
  oneClickVerificationCreated: number;
  oneClickVerificationDelivered: number;
  oneClickVerificationVerified: number;
  oneClickVerificationFailed: number;
  oneClickVerificationSending: number;
  oneClickVerificationUndelivered: number;
  oneClickVerificationExpired: number;
  date: string | number;
  [key: string]: any;
}

export interface OneClickVerificationSuccessChartData {
  interval?: OneClickVerificationSuccessIntervalEntry[];
  brandUuid: string;
  brandName: string;
}

const calculatePercentage = (
  entry: OneClickVerificationSuccessIntervalEntry,
): number => {
  const {
    oneClickVerificationVerified: verified,
    oneClickVerificationExpired: expired,
    oneClickVerificationFailed: failed,
  } = entry;

  const total = verified + expired + failed;

  if (total === 0) {
    return 0;
  }

  return Math.round((verified / total) * 100);
};

export function mapOneClickVerificationSuccessTimeSeriesData(
  data: OneClickVerificationSuccessChartData[],
): ReturnType<typeof mapAreaChartData> {
  const dateMap = new Map<string | number, Record<string, number | string>>();

  const seriesConfig = data.map((brand) => ({
    key: brand.brandName,
    dataKey: brand.brandUuid,
  }));

  for (const brand of data) {
    if (!brand.interval) {
      continue;
    }

    for (const entry of brand.interval) {
      const timestamp = new Date(entry.date).getTime();
      const existing = dateMap.get(timestamp);
      const record = existing ?? { month: timestamp };

      dateMap.set(timestamp, record);

      record[brand.brandUuid] = calculatePercentage(entry);
    }
  }

  return mapAreaChartData({
    data: Array.from(dateMap.values()),
    seriesConfig,
  });
}
