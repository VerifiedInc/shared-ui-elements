import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventsMonthlyTableRow,
} from '../BillableEventsTable/BillableEventsTable.types';

type Brand = {
  brandUuid: string;
  brandName: string;
  integrationType: string;
};

type ChartData = {
  brandUuid: string;
  brandName: string;
  interval?: Array<Record<string, number | string>>;
  overall: Record<string, number | string>;
};

type MapBillableEventsMonthlyTableDataParams = {
  product: BillableProduct;
  data: ChartData[];
  brands: Brand[];
};

export const mapBillableEventsMonthlyTableData = ({
  product,
  data,
  brands,
}: MapBillableEventsMonthlyTableDataParams): BillableEventsMonthlyTableRow[] => {
  const productConfig = BILLABLE_PRODUCTS.find((p) => p.product === product);
  if (!productConfig) return [];

  // Group by brandUuid + month to handle products like TTS where
  // the API returns multiple entries per brand (one per keyword).
  const rowMap = new Map<string, BillableEventsMonthlyTableRow>();

  for (const brandData of data) {
    const brand = brands.find((b) => b.brandUuid === brandData.brandUuid);
    if (!brand || !brandData.interval) continue;

    for (const entry of brandData.interval) {
      const key = `${brandData.brandUuid}-${entry.date}`;
      const existing = rowMap.get(key);

      if (existing) {
        // Sum metrics into the existing row
        for (const col of productConfig.columns) {
          existing.metrics[col.key] =
            (existing.metrics[col.key] ?? 0) +
            (Number(entry[col.metricKey]) || 0);
        }
      } else {
        const metrics: Record<string, number> = {};
        for (const col of productConfig.columns) {
          metrics[col.key] = Number(entry[col.metricKey]) || 0;
        }

        rowMap.set(key, {
          month: entry.date as string,
          brandUuid: brandData.brandUuid,
          brand: brand.brandName,
          integrationType: brand.integrationType?.toLocaleUpperCase(),
          metrics,
        });
      }
    }
  }

  return Array.from(rowMap.values());
};
