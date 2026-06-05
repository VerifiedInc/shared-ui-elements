import { Stack, TablePagination } from '@mui/material';

import { useDataTableContext } from './DataTable.context';

/**
 * Footer row below the table: consumer content on the left (`footerLeft`)
 * opposite the pagination controls. Renders nothing when pagination is
 * disabled and there is no footer content.
 */
export function DataTableFooter() {
  const {
    table,
    icons,
    isLoading,
    footerLeft,
    disablePagination,
    pageSizeOptions,
    totalRowCount,
  } = useDataTableContext();

  if (footerLeft === undefined && disablePagination) {
    return null;
  }

  const { pageIndex, pageSize } = table.getState().pagination;

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent={footerLeft !== undefined ? 'space-between' : 'flex-end'}
      sx={{ mt: 1 }}
    >
      {footerLeft}
      {!disablePagination && (
        <TablePagination
          component='div'
          showFirstButton
          showLastButton
          // Blocks page/page-size changes while a page is being
          // fetched (relevant with manualPagination).
          disabled={isLoading}
          sx={{
            // Vertically centers the rows-per-page select value with the
            // surrounding toolbar text.
            '& .MuiTablePagination-select': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
          count={totalRowCount}
          page={pageIndex}
          rowsPerPage={pageSize}
          rowsPerPageOptions={pageSizeOptions}
          onPageChange={(_, page) => table.setPageIndex(page)}
          onRowsPerPageChange={(event) =>
            table.setPageSize(Number(event.target.value))
          }
          // undefined slots keep the MUI default arrows.
          slots={{
            actions: {
              firstButtonIcon: icons.paginationFirst,
              previousButtonIcon: icons.paginationPrevious,
              nextButtonIcon: icons.paginationNext,
              lastButtonIcon: icons.paginationLast,
            },
          }}
        />
      )}
    </Stack>
  );
}
