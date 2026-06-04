import type { Column } from '@tanstack/react-table';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ArrowDownward,
  ArrowUpward,
  FilterAlt,
  ViewColumn,
  VisibilityOff,
} from '@mui/icons-material';

import type { DataTableData, DataTableIcons } from './DataTable.types';

interface DataTableColumnMenuProps<TData extends DataTableData> {
  column: Column<TData, unknown>;
  anchorEl: HTMLElement;
  /** Custom icon slots for the menu items; unset slots keep the MUI default. */
  icons?: DataTableIcons;
  /** Blocks the sort actions while a page is being fetched (manualSorting). */
  isLoading: boolean;
  onClose: () => void;
  /** Swaps this menu for the filter panel, preselecting this column. */
  onOpenFilter: () => void;
  /** Swaps this menu for the manage columns panel. */
  onOpenManageColumns: () => void;
}

/**
 * Per-column actions menu opened from the kebab button on a header cell,
 * mirroring the MUI DataGrid column menu. Sections render only when the
 * column supports them (e.g. sort items only for sortable columns).
 */
export function DataTableColumnMenu<TData extends DataTableData>({
  column,
  anchorEl,
  icons = {},
  isLoading,
  onClose,
  onOpenFilter,
  onOpenManageColumns,
}: Readonly<DataTableColumnMenuProps<TData>>) {
  // Custom icon slots — capitalized so JSX treats them as components.
  const {
    sortAsc: SortAscIcon = ArrowUpward,
    sortDesc: SortDescIcon = ArrowDownward,
    filter: FilterIcon = FilterAlt,
    hideColumn: HideColumnIcon = VisibilityOff,
    manageColumns: ManageColumnsIcon = ViewColumn,
  } = icons;

  const canSort = column.getCanSort();
  const isSort = column.getIsSorted();
  const canFilter = column.getCanFilter();
  const canHide = column.getCanHide();

  const handleSort = (desc: boolean): void => {
    column.toggleSorting(desc);
    onClose();
  };

  const handleUnsort = (): void => {
    column.clearSorting();
    onClose();
  };

  const handleHide = (): void => {
    column.toggleVisibility(false);
    onClose();
  };

  return (
    <Menu
      open
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {canSort && (
        <MenuItem disabled={isLoading} onClick={() => handleSort(false)}>
          <ListItemIcon>
            <SortAscIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Sort by ASC</ListItemText>
        </MenuItem>
      )}
      {canSort && (
        <MenuItem disabled={isLoading} onClick={() => handleSort(true)}>
          <ListItemIcon>
            <SortDescIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Sort by DESC</ListItemText>
        </MenuItem>
      )}
      {canSort && isSort && (
        <MenuItem disabled={isLoading} onClick={handleUnsort}>
          <ListItemIcon />
          <ListItemText>Unsort</ListItemText>
        </MenuItem>
      )}
      {canSort && canFilter && <Divider />}
      {canFilter && (
        <MenuItem onClick={onOpenFilter}>
          <ListItemIcon>
            <FilterIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Filter</ListItemText>
        </MenuItem>
      )}
      {(canSort || canFilter) && <Divider />}
      {canHide && (
        <MenuItem onClick={handleHide}>
          <ListItemIcon>
            <HideColumnIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Hide column</ListItemText>
        </MenuItem>
      )}
      <MenuItem onClick={onOpenManageColumns}>
        <ListItemIcon>
          <ManageColumnsIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Manage columns</ListItemText>
      </MenuItem>
    </Menu>
  );
}
