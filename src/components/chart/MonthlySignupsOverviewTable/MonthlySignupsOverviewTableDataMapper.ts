import { kebabCaseToPretty } from '../../../utils/string/formatKebabToPretty';
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
    date: number;
    totalCost: string;
  }>;
  overall: {
    oneClickCreated: number;
    oneClickSuccess: number;
    totalCost: string;
  };
};

type MapMonthlySignupsOverviewTableDataParams = {
  data: ChartData[];
  brands: Brand[];
};

export const mapMonthlySignupsOverviewTableData = ({
  data,
  brands,
}: MapMonthlySignupsOverviewTableDataParams) => {
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
    }));
  });
};
