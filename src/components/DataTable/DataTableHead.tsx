import { TableHead, TableRow } from '@mui/material';

import { useDataTableContext } from './DataTable.context';
import { DataTableHeaderCell } from './DataTableHeaderCell';

/**
 * Header rows. Each column renders exactly one header cell, on the row
 * matching its nesting depth: group headers on their own row, leaf
 * headers spanning the remaining rows — like the BillableEventsTable
 * two-row header. The other slots TanStack emits for the column
 * (placeholders above, the repeated leaf header below) are skipped.
 */
export function DataTableHead() {
  const { table, headerRowRefs } = useDataTableContext();

  const headerGroups = table.getHeaderGroups();
  const headerRowCount = headerGroups.length;

  return (
    <TableHead>
      {headerGroups.map((headerGroup, rowIndex) => (
        <TableRow
          key={headerGroup.id}
          ref={(element) => {
            headerRowRefs.current[rowIndex] = element;
          }}
        >
          {headerGroup.headers.map((header) =>
            header.column.depth === rowIndex ? (
              <DataTableHeaderCell
                key={header.id}
                header={header}
                rowIndex={rowIndex}
                headerRowCount={headerRowCount}
              />
            ) : null,
          )}
        </TableRow>
      ))}
    </TableHead>
  );
}
