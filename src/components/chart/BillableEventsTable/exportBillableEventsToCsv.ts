import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventColumn,
  type BillableEventsTableRow,
  type BillableLeadingColumn,
} from './BillableEventsTable.types';

function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

interface ExportBillableEventsToCsvOptions {
  data: BillableEventsTableRow[];
  visibleProducts?: BillableProduct[];
  filename?: string;
  topLevelColumns?: BillableEventColumn[];
  /** Leading columns/groups (between Customer and Brand), matches the table's `leadingColumns`. */
  leadingColumns?: BillableLeadingColumn[];
  columnFormatters?: Record<
    string,
    (value: number, row: BillableEventsTableRow) => string
  >;
  /**
   * Include the `Customer Name` and `Customer UUID` columns. Defaults to
   * `true`. Set `false` for single-customer-scoped exports.
   */
  showCustomerColumn?: boolean;
}

// A single CSV leaf column. `groupLabel` (set on the first leaf of a group) drives the group-header
// row, everything else leaves the cell blank.
interface CsvLeaf {
  label: string;
  groupLabel?: string;
  value: (row: BillableEventsTableRow) => string;
}

export function exportBillableEventsToCsv({
  data,
  visibleProducts,
  filename = 'billable-events',
  topLevelColumns = [],
  leadingColumns = [],
  columnFormatters,
  showCustomerColumn = true,
}: ExportBillableEventsToCsvOptions): void {
  const products = visibleProducts ?? Object.values(BillableProduct);
  const activeProducts = BILLABLE_PRODUCTS.filter((p) =>
    products.includes(p.product),
  );
  const topLevelKeys = new Set(topLevelColumns.map((c) => c.key));

  // Cells render via columnFormatters[key] (reading the row), else the raw metric value.
  const metricValue =
    (col: BillableEventColumn) =>
    (row: BillableEventsTableRow): string => {
      const value = row.metrics[col.key] ?? 0;
      const formatter = columnFormatters?.[col.key];
      return formatter ? formatter(value, row) : String(value);
    };

  // Build the ordered leaf list mirroring the table: Customer | leading | Brand | products.
  const leaves: CsvLeaf[] = [];

  if (showCustomerColumn) {
    leaves.push(
      { label: 'Customer Name', value: (r) => r.customerName ?? '' },
      { label: 'Customer UUID', value: (r) => r.customerUuid ?? '' },
    );
  }

  for (const item of leadingColumns) {
    if (item.type === 'column') {
      leaves.push({
        label: item.column.label,
        value: metricValue(item.column),
      });
    } else {
      item.columns.forEach((col, i) => {
        leaves.push({
          label: col.label,
          groupLabel: i === 0 ? item.label : undefined,
          value: metricValue(col),
        });
      });
    }
  }

  leaves.push(
    { label: 'Brand Name', value: (r) => r.brand },
    { label: 'Brand UUID', value: (r) => r.brandUuid },
    { label: 'Integration Type', value: (r) => r.integrationType },
  );

  for (const col of topLevelColumns) {
    leaves.push({ label: col.label, value: metricValue(col) });
  }

  for (const product of activeProducts) {
    const cols = product.columns.filter((c) => !topLevelKeys.has(c.key));
    cols.forEach((col, i) => {
      leaves.push({
        label: col.label,
        groupLabel: i === 0 ? product.label : undefined,
        value: metricValue(col),
      });
    });
  }

  const rows: string[] = [];
  // Row 1: group header (group label on the first leaf of each group, blank elsewhere).
  rows.push(
    leaves
      .map((l) => (l.groupLabel ? escapeCsvValue(l.groupLabel) : ''))
      .join(','),
  );
  // Row 2: column headers.
  rows.push(leaves.map((l) => escapeCsvValue(l.label)).join(','));
  // Data rows.
  for (const row of data) {
    rows.push(leaves.map((l) => escapeCsvValue(l.value(row))).join(','));
  }

  const csvContent = rows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
