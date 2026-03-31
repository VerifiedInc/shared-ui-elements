import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventsTableRow,
} from './BillableEventsTable.types';

/**
 * Maps raw or pre-mapped integration type values to display labels.
 * Handles both raw core-service values (e.g. "hosted") and values
 * already mapped by backend services (e.g. "SDK", "API").
 */
const INTEGRATION_TYPE_DISPLAY: Record<string, string> = {
  hosted: 'SDK',
  'non-hosted': 'API',
  'semi-hosted': 'Semi-Hosted',
  sdk: 'SDK',
  api: 'API',
};

export function formatIntegrationType(type?: string): string {
  if (!type) return '';
  return INTEGRATION_TYPE_DISPLAY[type.toLowerCase()] ?? type;
}

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

type ProductData = {
  product: BillableProduct;
  data: ChartData[];
};

type MapBillableEventsTableDataParams = {
  productDataSets: ProductData[];
  brands: Brand[];
};

export const mapBillableEventsTableData = ({
  productDataSets,
  brands,
}: MapBillableEventsTableDataParams): BillableEventsTableRow[] => {
  const brandMetrics = new Map<string, Record<string, number>>();
  const brandsWithData = new Map<string, ChartData>();

  for (const { product, data } of productDataSets) {
    const productConfig = BILLABLE_PRODUCTS.find((p) => p.product === product);
    if (!productConfig) continue;

    for (const brandData of data) {
      if (!brandData.interval?.length) continue;

      const existing = brandMetrics.get(brandData.brandUuid) ?? {};

      for (const col of productConfig.columns) {
        const total = brandData.interval.reduce(
          (sum, entry) => sum + (Number(entry[col.metricKey]) || 0),
          0,
        );
        // Sum with existing value to handle products like TTS where
        // the API returns multiple entries per brand (one per keyword).
        existing[col.key] = (existing[col.key] ?? 0) + total;
      }

      const hasNonZero = productConfig.columns.some(
        (col) => (existing[col.key] ?? 0) > 0,
      );
      if (hasNonZero && !brandsWithData.has(brandData.brandUuid)) {
        brandsWithData.set(brandData.brandUuid, brandData);
      }
      brandMetrics.set(brandData.brandUuid, existing);
    }
  }

  return Array.from(brandsWithData.entries())
    .map(([brandUuid, raw]) => {
      const brand = brands.find((b) => b.brandUuid === brandUuid);
      if (!brand) return null;

      return {
        brandUuid,
        brand: brand.brandName,
        integrationType: formatIntegrationType(brand.integrationType),
        metrics: brandMetrics.get(brandUuid) ?? {},
        raw,
      };
    })
    .filter((row): row is BillableEventsTableRow => row !== null);
};
