import type { Column, ColumnPinningPosition } from '@tanstack/react-table';
import type { SvgIconProps } from '@mui/material';
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
  PushPin,
  PushPinOutlined,
  ViewColumn,
  VisibilityOff,
} from '@mui/icons-material';

import type { DataTableData, DataTableIcons } from './DataTable.types';

/**
 * MUI ships a single upright push pin — tilt it toward each side so the
 * two pin directions read differently, like the DataGrid pin icons.
 */
function PushPinLeft(props: Readonly<SvgIconProps>) {
  return <PushPin {...props} sx={{ transform: 'rotate(30deg)' }} />;
}

function PushPinRight(props: Readonly<SvgIconProps>) {
  return <PushPin {...props} sx={{ transform: 'rotate(-30deg)' }} />;
}

interface DataTableColumnMenuProps<TData extends DataTableData> {
  column: Column<TData, unknown>;
  anchorEl: HTMLElement;
  /** Custom icon slots for the menu items; unset slots keep the MUI default. */
  icons?: DataTableIcons;
  /** Blocks the sort actions while a page is being fetched (manualSorting). */
  isLoading: boolean;
  onClose: () => void;
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
  onOpenManageColumns,
}: Readonly<DataTableColumnMenuProps<TData>>) {
  // Custom icon slots — capitalized so JSX treats them as components.
  const {
    sortAsc: SortAscIcon = ArrowUpward,
    sortDesc: SortDescIcon = ArrowDownward,
    pinLeft: PinLeftIcon = PushPinLeft,
    pinRight: PinRightIcon = PushPinRight,
    unpin: UnpinIcon = PushPinOutlined,
    hideColumn: HideColumnIcon = VisibilityOff,
    manageColumns: ManageColumnsIcon = ViewColumn,
  } = icons;

  const canSort = column.getCanSort();
  const isSort = column.getIsSorted();
  // False unless the table enables column pinning (and the def doesn't
  // opt out via `enablePinning: false`).
  const canPin = column.getCanPin();
  const isPinned = column.getIsPinned();
  const canHide = column.getCanHide();

  const handleSort = (desc: boolean): void => {
    column.toggleSorting(desc);
    onClose();
  };

  const handleUnsort = (): void => {
    column.clearSorting();
    onClose();
  };

  const handlePin = (position: ColumnPinningPosition): void => {
    column.pin(position);
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
      {canSort && canPin && <Divider />}
      {canPin && isPinned !== 'left' && (
        <MenuItem onClick={() => handlePin('left')}>
          <ListItemIcon>
            <PinLeftIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Pin to left</ListItemText>
        </MenuItem>
      )}
      {canPin && isPinned !== 'right' && (
        <MenuItem onClick={() => handlePin('right')}>
          <ListItemIcon>
            <PinRightIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Pin to right</ListItemText>
        </MenuItem>
      )}
      {canPin && isPinned !== false && (
        <MenuItem onClick={() => handlePin(false)}>
          <ListItemIcon>
            <UnpinIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Unpin</ListItemText>
        </MenuItem>
      )}
      {(canSort || canPin) && <Divider />}
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
