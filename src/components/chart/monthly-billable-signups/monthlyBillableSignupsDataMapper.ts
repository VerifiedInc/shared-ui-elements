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

type MapMonthlyBillableSignupsDataParams = {
  data: ChartData[];
  brands: Brand[];
};

export const mapMonthlyBillableSignupsData = ({
  data,
  brands,
}: MapMonthlyBillableSignupsDataParams) => {
  return data.flatMap((brandData) => {
    const brand = brands.find((b) => b.brandUuid === brandData.brandUuid);
    if (!brand || !brandData.interval) return [];

    return brandData.interval.map((interval) => ({
      month: new Date(interval.date).toISOString(),
      brand: brand.brandName,
      integrationType: brand.integrationType,
      total: interval.oneClickCreated,
      finished: interval.oneClickSuccess,
      totalCost: interval.totalCost,
    }));
  });
};
