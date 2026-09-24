import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventColumn,
  type BillableEventsTableRow,
} from './BillableEventsTable.types';

interface BillableEventsExportRecordOptions {
  /** Products to include, in table order. Defaults to all. */
  visibleProducts?: BillableProduct[];
  /** Columns the table lifts out of their product group; written at the top level. */
  topLevelColumns?: BillableEventColumn[];
  showCustomerColumn?: boolean;
}

// `ONE_CLICK_SIGNUP` -> `oneClickSignup`.
const productKey = (product: BillableProduct): string =>
  product
    .toLowerCase()
    .replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());

// The row's metric key without its product prefix: `signup_autofillsSucceeded` -> `autofillsSucceeded`.
const metricName = (key: string): string => key.slice(key.indexOf('_') + 1);

const metricValues = (
  row: BillableEventsTableRow,
  columns: BillableEventColumn[],
): Record<string, number> =>
  Object.fromEntries(
    columns.map((column) => [
      metricName(column.key),
      row.metrics[column.key] ?? 0,
    ]),
  );

/**
 * A row as the JSON export writes it: the brand (and customer) as `{ name, uuid }`, then each
 * product's event counts grouped under the product — rather than the row's internal shape (raw
 * chart data, panel details).
 */
export function billableEventsExportRecord(
  row: BillableEventsTableRow,
  {
    visibleProducts = Object.values(BillableProduct),
    topLevelColumns = [],
    showCustomerColumn = true,
  }: BillableEventsExportRecordOptions = {},
): Record<string, unknown> {
  const topLevelKeys = new Set(topLevelColumns.map((column) => column.key));
  const groups = BILLABLE_PRODUCTS.filter((product) =>
    visibleProducts.includes(product.product),
  )
    .map((product) => ({
      key: productKey(product.product),
      columns: product.columns.filter(
        (column) => !topLevelKeys.has(column.key),
      ),
    }))
    .filter(({ columns }) => columns.length > 0);

  return {
    ...(showCustomerColumn
      ? {
          customer: {
            name: row.customerName ?? null,
            uuid: row.customerUuid ?? null,
          },
        }
      : {}),
    brand: { name: row.brand, uuid: row.brandUuid },
    ...metricValues(row, topLevelColumns),
    ...Object.fromEntries(
      groups.map(({ key, columns }) => [key, metricValues(row, columns)]),
    ),
  };
}
