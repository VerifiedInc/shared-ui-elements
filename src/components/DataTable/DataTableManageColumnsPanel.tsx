import { useState } from 'react';

import type { Table } from '@tanstack/react-table';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  Popover,
  Stack,
  TextField,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import type { DataTableData, DataTableIcons } from './DataTable.types';
import { getColumnLabel } from './DataTable.utils';

interface DataTableManageColumnsPanelProps<TData extends DataTableData> {
  table: Table<TData>;
  /**
   * Snapshot of the opener's position — the panel can outlive the element
   * that opened it (columns can hide under it), so it is not anchored to
   * a node.
   */
  anchorPosition: { top: number; left: number };
  /**
   * Which top corner of the panel pins to `anchorPosition` — 'right' when
   * opening from the table toolbar so the panel grows leftward over the
   * table. Defaults to 'left'.
   */
  transformHorizontal?: 'left' | 'right';
  /** Custom icon slots for the panel; unset slots keep the MUI default. */
  icons?: DataTableIcons;
  onClose: () => void;
}

/**
 * Column visibility panel opened from the column menu, like the MUI
 * DataGrid columns panel: a searchable checkbox per hideable column, plus
 * Show/Hide All and a Reset back to the initial visibility.
 */
export function DataTableManageColumnsPanel<TData extends DataTableData>({
  table,
  anchorPosition,
  transformHorizontal = 'left',
  icons = {},
  onClose,
}: Readonly<DataTableManageColumnsPanelProps<TData>>) {
  // Custom icon slot — capitalized so JSX treats it as a component.
  const { search: SearchIcon = Search } = icons;

  const [search, setSearch] = useState('');

  const hideableColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getCanHide());

  const query = search.trim().toLowerCase();
  const matchingColumns = hideableColumns.filter((column) =>
    getColumnLabel(column).toLowerCase().includes(query),
  );

  const allVisible = table.getIsAllColumnsVisible();

  return (
    <Popover
      open
      anchorReference='anchorPosition'
      anchorPosition={anchorPosition}
      transformOrigin={{ vertical: 'top', horizontal: transformHorizontal }}
      onClose={onClose}
    >
      <Box sx={{ p: 1.5, pb: 0.5 }}>
        <TextField
          fullWidth
          autoFocus
          size='small'
          placeholder='Search'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            ),
          }}
        />
        <Stack sx={{ mt: 1, maxHeight: 300, overflowY: 'auto' }}>
          {matchingColumns.map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  size='small'
                  checked={column.getIsVisible()}
                  onChange={() => column.toggleVisibility()}
                />
              }
              label={getColumnLabel(column)}
            />
          ))}
        </Stack>
      </Box>
      <Divider />
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ pl: 1.5, pr: 1, py: 0.5 }}
      >
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={allVisible}
              indeterminate={!allVisible && table.getIsSomeColumnsVisible()}
              onChange={() => table.toggleAllColumnsVisible(!allVisible)}
            />
          }
          label='Show/Hide All'
        />
        <Button size='small' onClick={() => table.resetColumnVisibility()}>
          Reset
        </Button>
      </Stack>
    </Popover>
  );
}
