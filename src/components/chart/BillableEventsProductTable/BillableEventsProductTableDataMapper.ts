import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventsTableRow,
} from '../BillableEventsTable/BillableEventsTable.types';
import { formatIntegrationType } from '../BillableEventsTable/BillableEventsTableDataMapper';

type Brand = {
  brandUuid: string;
  brandName: string;
  integrationType: string;
};

export type ChartData = {
  brandUuid: string;
  brandName: string;
  interval?: Array<Record<string, number | string>>;
  overall: Record<string, number | string>;
};

type MapBillableEventsProductTableDataParams = {
  product: BillableProduct;
  data: ChartData[];
  brands: Brand[];
};

export const mapBillableEventsProductTableData = ({
  product,
  data,
  brands,
}: MapBillableEventsProductTableDataParams): BillableEventsTableRow[] => {
  const productConfig = BILLABLE_PRODUCTS.find((p) => p.product === product);
  if (!productConfig) return [];

  // Group by brandUuid to handle products like TTS where
  // the API returns multiple entries per brand (one per keyword).
  const rowMap = new Map<string, BillableEventsTableRow>();

  for (const brandData of data) {
    const brand = brands.find((b) => b.brandUuid === brandData.brandUuid);
    if (!brand || !brandData.interval) continue;

    const existing = rowMap.get(brandData.brandUuid);
    const metrics = existing?.metrics ?? {};

    for (const entry of brandData.interval) {
      for (const col of productConfig.columns) {
        metrics[col.key] =
          (metrics[col.key] ?? 0) + (Number(entry[col.metricKey]) || 0);
      }
    }

    if (!existing) {
      rowMap.set(brandData.brandUuid, {
        brandUuid: brandData.brandUuid,
        brand: brand.brandName,
        integrationType: formatIntegrationType(brand.integrationType),
        metrics,
        raw: brandData,
      });
    }
  }

  return Array.from(rowMap.values());
};
