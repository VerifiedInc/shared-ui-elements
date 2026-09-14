import { Skeleton, TableCell, TableRow } from '@mui/material';

const DEFAULT_ROWS = 4;

export interface DataTableLoadingRowsProps {
  columnCount: number;
  /** Placeholder rows to draw. Defaults to 4. */
  rows?: number;
}

/** Skeleton rows for `DataTable`'s `renderLoading`, so a loading table keeps the shape of a full one. */
export function DataTableLoadingRows({
  columnCount,
  rows = DEFAULT_ROWS,
}: Readonly<DataTableLoadingRowsProps>) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }, (_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton variant='text' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
