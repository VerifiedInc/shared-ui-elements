import { kebabCaseToPretty } from '../../../utils/string/formatKebabToPretty';
import { MonthlySignupsOverviewTableData } from './MonthlySignupsOverviewTable';

type Brand = {
  brandUuid: string;
  brandName: string;
  integrationType: string;
};

type ChartData = {
  brandUuid: string;
  brandName: string;
  interval?: Array<{
    oneClickCreated: number;
    oneClickSuccess: number;
    date: string;
    totalCost?: string;
    riskSignal?: number;
  }>;
  overall: {
    oneClickCreated: number;
    oneClickSuccess: number;
    totalCost?: string;
  };
};

type MapMonthlySignupsOverviewTableDataParams = {
  data: ChartData[];
  brands: Brand[];
};

export const mapMonthlySignupsOverviewTableData = ({
  data,
  brands,
}: MapMonthlySignupsOverviewTableDataParams): MonthlySignupsOverviewTableData[] => {
  return data.flatMap((brandData) => {
    const brand = brands.find((b) => b.brandUuid === brandData.brandUuid);
    if (!brand || !brandData.interval) return [];

    return brandData.interval.map((interval) => ({
      month: interval.date,
      brandUuid: brandData.brandUuid,
      brand: brand.brandName,
      integrationType: kebabCaseToPretty(brand.integrationType),
      total: interval.oneClickCreated,
      finished: interval.oneClickSuccess,
      totalCost: interval.totalCost,
      riskSignal: interval.riskSignal,
    }));
  });
};
