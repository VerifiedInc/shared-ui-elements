import type { ColumnDef, VisibilityState } from '@tanstack/react-table';

import type { BillableEventsTableRow } from './BillableEventsTable.types';

export const INTERNAL_BRAND_COLUMN_ID = 'internalBrand';

// Offered in Manage columns, but external names stay the default view.
export const INTERNAL_BRAND_HIDDEN: VisibilityState = {
  [INTERNAL_BRAND_COLUMN_ID]: false,
};

/** The customer's own name for the brand, falling back to the external name when unset. */
export const internalBrandName = (row: BillableEventsTableRow): string =>
  row.internalBrand || row.brand;

export function internalBrandColumn<
  Row extends BillableEventsTableRow,
>(): ColumnDef<Row, unknown> {
  return {
    id: INTERNAL_BRAND_COLUMN_ID,
    accessorFn: internalBrandName,
    header: 'Internal Brand Name',
    enableSorting: true,
    enableColumnFilter: false,
  };
}
