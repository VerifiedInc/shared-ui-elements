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

export function mapOneClickVerificationSuccessTimeSeriesData(
  data: OneClickVerificationSuccessChartData[],
): ReturnType<typeof mapAreaChartData> {
  const dateMap = new Map<string | number, Record<string, number | string>>();

  const seriesConfig = data.map((brand) => ({
    key: brand.brandName,
    dataKey: brand.brandUuid,
  }));

  const calculatePercentage = (delivered: number, verified: number): number => {
    if (verified === 0) {
      return 0;
    }

    return (delivered / verified) * 100;
  };

  for (const brand of data) {
    if (!brand.interval) {
      continue;
    }

    for (const entry of brand.interval) {
      const timestamp = new Date(entry.date).getTime();
      const existing = dateMap.get(timestamp);
      const record = existing ?? { month: timestamp };

      dateMap.set(timestamp, record);

      const percentage = calculatePercentage(
        entry.oneClickVerificationDelivered,
        entry.oneClickVerificationVerified,
      );

      record[brand.brandUuid] = Math.round(percentage * 100) / 100;
    }
  }

  return mapAreaChartData({
    data: Array.from(dateMap.values()),
    seriesConfig,
  });
}
