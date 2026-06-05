import { flexRender } from '@tanstack/react-table';
import type { ColumnPinningPosition, Header } from '@tanstack/react-table';
import type { Theme } from '@mui/material';
import {
  Box,
  IconButton,
  TableCell,
  TableSortLabel,
  Tooltip,
  Typography,
} from '@mui/material';
import { FilterAlt, MoreVert } from '@mui/icons-material';

import type { DataTableData } from './DataTable.types';
import { useDataTableContext } from './DataTable.context';
import { isFilterRowActive } from './DataTable.filters';
import { getColumnLabel, getColumnMeta } from './DataTable.utils';

/** Maps a column meta align onto the header cell flex container. */
const HEADER_JUSTIFY_CONTENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

interface DataTableHeaderCellProps {
  header: Header<DataTableData, unknown>;
  /** Index of the header row this cell renders on. */
  rowIndex: number;
  /** Total header row count — leaf cells span the remaining rows. */
  headerRowCount: number;
}

/**
 * One header cell: the (sortable) label plus the hover kebab menu, the
 * active-filter indicator and the resize handle, with the sticky styles
 * for pinned columns and stacked (grouped) header rows.
 */
export function DataTableHeaderCell({
  header,
  rowIndex,
  headerRowCount,
}: Readonly<DataTableHeaderCellProps>) {
  const {
    icons,
    isLoading,
    filters,
    tableLayout,
    enableColumnResizing,
    enableColumnMenu,
    hasResizedColumns,
    columnPanel,
    setColumnPanel,
    openFilterPanel,
    startColumnResize,
    getPinnedOffsetStyle,
    isPinnedEdge,
    headerRowTops,
    headerCellRefs,
  } = useDataTableContext();

  // Custom icon slots — capitalized so JSX treats them as components.
  // Unset slots fall back to the MUI default.
  const {
    columnMenu: ColumnMenuIcon = MoreVert,
    filter: FilterIcon = FilterAlt,
  } = icons;

  const { column } = header;

  const meta = getColumnMeta(column.columnDef.meta);
  const isGroupHeader = column.columns.length > 0;
  const rowSpan = isGroupHeader ? 1 : headerRowCount - rowIndex;
  const align = meta?.align ?? (isGroupHeader ? 'center' : 'left');
  const canSort = column.getCanSort();
  const sortDirection = column.getIsSorted();
  const canResize =
    enableColumnResizing && !isGroupHeader && column.getCanResize();
  const isResizing = column.getIsResizing();
  // Group headers can't pin (only leaf columns can).
  const pinned: ColumnPinningPosition = isGroupHeader
    ? false
    : column.getIsPinned();
  const showColumnMenu = enableColumnMenu && !isGroupHeader;
  const isMenuOpen =
    columnPanel?.type === 'menu' && columnPanel.columnId === column.id;
  // Compute from our filter state — TanStack's columnFilters is no longer
  // used.
  const activeFilterCount = showColumnMenu
    ? filters.rows.filter(
        (r) => r.columnId === column.id && isFilterRowActive(r),
      ).length
    : 0;
  const isFiltered = activeFilterCount > 0;

  const label = (
    <Typography
      component='span'
      variant='subtitle2'
      sx={{
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: 900,
      }}
    >
      {flexRender(column.columnDef.header, header.getContext())}
    </Typography>
  );

  const headerContent = canSort ? (
    <TableSortLabel
      active={sortDirection !== false}
      direction={sortDirection === false ? 'asc' : sortDirection}
      // Blocks re-sorting while a page is being
      // fetched (relevant with manualSorting).
      disabled={isLoading}
      onClick={column.getToggleSortingHandler()}
      // undefined keeps the MUI default arrow.
      IconComponent={icons.sort}
    >
      {label}
    </TableSortLabel>
  ) : (
    label
  );

  return (
    <TableCell
      // Leaf header cells are the width source for the
      // pinned sticky offsets and for freezing the
      // columns when a resize drag starts.
      ref={(element: HTMLTableCellElement | null) => {
        if (!isGroupHeader) {
          headerCellRefs.current[column.id] = element;
        }
      }}
      align={align}
      colSpan={header.colSpan > 1 ? header.colSpan : undefined}
      rowSpan={rowSpan > 1 ? rowSpan : undefined}
      sortDirection={sortDirection}
      // Widths and sticky offsets are inline style (not
      // sx) — they change on every drag frame and would
      // churn Emotion classes. With resizing active every
      // header gets its explicit width (group headers the
      // sum of their leaves), so columns never reflow.
      style={{
        ...(hasResizedColumns ? { width: header.getSize() } : {}),
        ...getPinnedOffsetStyle(pinned, column.id),
      }}
      sx={{
        width: meta?.width,
        // Fixed layout enforces exact widths — clip
        // overflowing content (unbreakable strings would
        // otherwise paint over the neighboring cells).
        ...(tableLayout === 'fixed'
          ? { overflow: 'hidden', textOverflow: 'ellipsis' }
          : {}),
        // Group labels sit borderless above their
        // sub-columns, matching BillableEventsTable.
        ...(isGroupHeader ? { borderBottom: 'none' } : {}),
        ...(rowIndex > 0 ? { top: headerRowTops[rowIndex] ?? 0 } : {}),
        // Pinned headers float above the other sticky
        // header cells (MUI's stickyHeader is zIndex 2)
        // and draw the divider toward the scroll region.
        // The horizontal stickiness itself comes from the
        // stickyHeader position plus the inline offset.
        ...(pinned
          ? {
              zIndex: 3,
              ...(isPinnedEdge(pinned, column.id)
                ? {
                    boxShadow: (theme: Theme) =>
                      `inset ${pinned === 'left' ? -1 : 1}px 0 0 ${theme.palette.divider}`,
                  }
                : {}),
            }
          : {}),
        // The kebab stays invisible until the header is
        // hovered (or focused via keyboard), and pinned
        // while its menu is open — like the MUI DataGrid.
        ...(showColumnMenu
          ? {
              '& .DataTable-columnMenuButton': {
                opacity: isMenuOpen ? 1 : 0,
                transition: 'opacity .2s',
              },
              '&:hover .DataTable-columnMenuButton, &:focus-within .DataTable-columnMenuButton':
                { opacity: 1 },
            }
          : {}),
      }}
    >
      {showColumnMenu ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            justifyContent: HEADER_JUSTIFY_CONTENT[align],
          }}
        >
          {headerContent}
          {isFiltered && (
            <Tooltip
              title={`${activeFilterCount} active ${activeFilterCount === 1 ? 'filter' : 'filters'}`}
              placement='bottom'
              arrow
            >
              <IconButton
                size='small'
                aria-label={`${getColumnLabel(column)} filter`}
                onClick={(event) =>
                  openFilterPanel(column.id, event.currentTarget)
                }
              >
                <FilterIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title='Menu' placement='bottom' arrow>
            <IconButton
              size='small'
              className='DataTable-columnMenuButton'
              aria-label={`${getColumnLabel(column)} column menu`}
              onClick={(event) =>
                setColumnPanel({
                  type: 'menu',
                  columnId: column.id,
                  anchorEl: event.currentTarget,
                })
              }
              // Pushes the kebab to the cell edge so it does
              // not float next to short labels (right-aligned
              // columns already sit at the edge).
              sx={align !== 'right' ? { ml: 'auto' } : undefined}
            >
              <ColumnMenuIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        headerContent
      )}
      {canResize && (
        <Box
          className='DataTable-columnResizer'
          aria-hidden
          onMouseDown={(event) => startColumnResize(header, event)}
          onTouchStart={(event) => startColumnResize(header, event)}
          onDoubleClick={() => column.resetSize()}
          sx={{
            // The sticky header cell is the positioned
            // ancestor, so the handle hugs its right edge.
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 9,
            cursor: 'col-resize',
            touchAction: 'none',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // Vertical separator line — grows and recolors
            // while hovered or dragging. The line color is
            // painted by background-color, so that (not
            // `color`) is what transitions.
            '&::after': {
              content: '""',
              transition: 'background-color .2s',
              width: '1px',
              height: '50%',
              bgcolor: 'divider',
            },
            '&:hover::after': {
              width: '4px',
              bgcolor: 'primary.main',
            },
            ...(isResizing
              ? {
                  '&::after, &:hover::after': {
                    width: '4px',
                    bgcolor: 'primary.main',
                  },
                }
              : {}),
          }}
        />
      )}
    </TableCell>
  );
}
