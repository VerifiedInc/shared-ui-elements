import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventsTableRow,
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
  columnValueOverrides?: Record<
    string,
    (value: number, row: BillableEventsTableRow) => string
  >;
}

export function exportBillableEventsToCsv({
  data,
  visibleProducts,
  filename = 'billable-events',
  columnValueOverrides,
}: ExportBillableEventsToCsvOptions): void {
  const products = visibleProducts ?? Object.values(BillableProduct);
  const activeProducts = BILLABLE_PRODUCTS.filter((p) =>
    products.includes(p.product),
  );
  const allColumns = activeProducts.flatMap((p) => p.columns);

  const rows: string[] = [];

  // Row 1: Product group header
  const groupHeader = ['', ''];
  for (const product of activeProducts) {
    groupHeader.push(escapeCsvValue(product.label));
    for (let i = 1; i < product.columns.length; i++) {
      groupHeader.push('');
    }
  }
  rows.push(groupHeader.join(','));

  // Row 2: Column header
  const columnHeader = ['Brand', 'Integration Type'];
  for (const col of allColumns) {
    columnHeader.push(escapeCsvValue(col.label));
  }
  rows.push(columnHeader.join(','));

  // Data rows
  for (const row of data) {
    const csvRow = [
      escapeCsvValue(row.brand),
      escapeCsvValue(row.integrationType),
    ];
    for (const col of allColumns) {
      const value = row.metrics[col.key] ?? 0;
      const override = columnValueOverrides?.[col.key];
      csvRow.push(
        override ? escapeCsvValue(override(value, row)) : String(value),
      );
    }
    rows.push(csvRow.join(','));
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
