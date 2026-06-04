import { useMemo, useRef, useState } from 'react';

import type { Table } from '@tanstack/react-table';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Add, Close, DeleteOutline } from '@mui/icons-material';

import type {
  DataTableActiveFilters,
  DataTableData,
  DataTableFilterLogicOperator,
  DataTableFilterOperator,
  DataTableFilterRow,
  DataTableIcons,
} from './DataTable.types';
import {
  dataTableFilterOperators,
  filterOperatorIsMultiValue,
  filterOperatorRequiresValue,
} from './DataTable.filters';
import { getColumnLabel, getColumnMeta } from './DataTable.utils';

interface DataTableFilterPanelProps<TData extends DataTableData> {
  table: Table<TData>;
  /**
   * Unfiltered rows — the value input derives its suggestions from each
   * column's distinct values here. (With manualFiltering this is just the
   * current page; `meta.filterOptions` supplies the full set instead.)
   */
  data?: TData[];
  /** Column preselected when opening from a column menu with no active filters. */
  initialColumnId: string;
  anchorPosition: { top: number; left: number };
  /**
   * Which top corner of the panel pins to `anchorPosition` — 'right' when
   * opening from the table toolbar so the panel grows leftward over the
   * table. Defaults to 'left'.
   */
  transformHorizontal?: 'left' | 'right';
  /** Custom icon slots for the panel actions; unset slots keep the MUI default. */
  icons?: DataTableIcons;
  /** Current filter state — the panel syncs from this on mount. */
  filters: DataTableActiveFilters;
  onFiltersChange: (filters: DataTableActiveFilters) => void;
  onClose: () => void;
}

function makeRow(columnId: string, id: string): DataTableFilterRow {
  // contains is multi-value — rows start with no chips.
  return { id, columnId, operator: 'contains', value: [] };
}

/**
 * Multi-value operators render chips — a single string value (e.g.
 * consumer-supplied initial filters) shows as one chip.
 */
function toChipValues(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : [];
}

/**
 * Multi-row filter panel — each row targets a Column / Operator / Value
 * triplet; rows combine with AND or OR (switched from the connector
 * dropdown on rows 2+). Matches the MUI DataGrid Premium filter panel.
 */
export function DataTableFilterPanel<TData extends DataTableData>({
  table,
  data = [],
  initialColumnId,
  anchorPosition,
  transformHorizontal = 'left',
  icons = {},
  filters,
  onFiltersChange,
  onClose,
}: Readonly<DataTableFilterPanelProps<TData>>) {
  // Custom icon slots — capitalized so JSX treats them as components.
  const {
    close: CloseIcon = Close,
    addFilter: AddFilterIcon = Add,
    removeAllFilters: RemoveAllFiltersIcon = DeleteOutline,
  } = icons;

  const counter = useRef(0);
  const nextId = (): string => {
    counter.current += 1;
    return `r${counter.current}`;
  };

  const [rows, setRows] = useState<DataTableFilterRow[]>(() =>
    filters.rows.length > 0
      ? filters.rows
      : [makeRow(initialColumnId, nextId())],
  );
  const [logicOperator, setLogicOperator] =
    useState<DataTableFilterLogicOperator>(filters.logicOperator);

  const filterableColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getCanFilter());

  const firstFilterableColumnId = filterableColumns[0]?.id ?? initialColumnId;

  // Suggestions for the value input: the column's distinct stringified
  // values, derived lazily from the unfiltered rows and cached per column.
  // `meta.filterOptions` overrides the derived list.
  const optionsByColumn = useMemo(
    () => new Map<string, string[]>(),
    [table, data],
  );

  const getColumnOptions = (columnId: string): string[] => {
    const cached = optionsByColumn.get(columnId);

    if (cached) {
      return cached;
    }

    const column = table.getColumn(columnId);
    const meta = getColumnMeta(column?.columnDef.meta);

    let options: string[];

    if (meta?.filterOptions) {
      options = meta.filterOptions;
    } else if (column?.accessorFn) {
      const unique = new Set<string>();

      data.forEach((row, index) => {
        const value = column.accessorFn?.(row, index);

        // Mirrors the empty values the default cell renders as an em dash.
        if (value !== null && value !== undefined && value !== '') {
          unique.add(String(value));
        }
      });

      options = Array.from(unique).sort((a, b) => a.localeCompare(b));
    } else {
      options = [];
    }

    optionsByColumn.set(columnId, options);

    return options;
  };

  const report = (
    nextRows: DataTableFilterRow[],
    nextOp: DataTableFilterLogicOperator,
  ): void => {
    onFiltersChange({ rows: nextRows, logicOperator: nextOp });
  };

  const handleAddRow = (): void => {
    const newRow = makeRow(firstFilterableColumnId, nextId());
    const next = [...rows, newRow];

    setRows(next);
    // New row has an empty value — don't fire a filter change yet; the
    // user will type a value, which triggers report().
  };

  const handleRemoveRow = (id: string): void => {
    const next = rows.filter((r) => r.id !== id);

    setRows(next);
    report(next, logicOperator);
  };

  const handleRemoveAll = (): void => {
    report([], logicOperator);
    onClose();
  };

  const handleLogicOperatorChange = (
    op: DataTableFilterLogicOperator,
  ): void => {
    setLogicOperator(op);
    report(rows, op);
  };

  const updateRow = (id: string, patch: Partial<DataTableFilterRow>): void => {
    const next = rows.map((r) => (r.id === id ? { ...r, ...patch } : r));

    setRows(next);
    report(next, logicOperator);
  };

  const handleOperatorChange = (
    id: string,
    nextOperator: DataTableFilterOperator,
    currentValue: string | string[] | undefined,
  ): void => {
    // Crossing between single-value and multi-value operators converts
    // the value to the matching shape, carrying over what was typed
    // (multi -> single keeps the first chip).
    let nextValue: string | string[] | undefined = currentValue;

    if (filterOperatorIsMultiValue(nextOperator)) {
      nextValue = toChipValues(currentValue);
    } else if (Array.isArray(currentValue)) {
      nextValue = currentValue[0] ?? '';
    }

    updateRow(id, { operator: nextOperator, value: nextValue });
  };

  return (
    <Popover
      open
      anchorReference='anchorPosition'
      anchorPosition={anchorPosition}
      transformOrigin={{ vertical: 'top', horizontal: transformHorizontal }}
      onClose={onClose}
    >
      <Box sx={{ p: 1.5, minWidth: 560 }}>
        {rows.length === 0 && (
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 1.5, pl: 0.5 }}
          >
            No filters applied.
          </Typography>
        )}
        {rows.map((row, index) => (
          <Stack
            key={row.id}
            direction='row'
            alignItems='center'
            spacing={1}
            sx={{ mb: 1 }}
          >
            <IconButton
              size='medium'
              aria-label={`Remove filter row ${index + 1}`}
              onClick={() => handleRemoveRow(row.id)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
            {/* Logic operator — shown on rows 2+ as a dropdown; a fixed-
                width spacer on row 1 keeps the remaining columns aligned. */}
            {index > 0 ? (
              <TextField
                select
                size='medium'
                value={logicOperator}
                onChange={(event) =>
                  handleLogicOperatorChange(
                    event.target.value as DataTableFilterLogicOperator,
                  )
                }
                sx={{ minWidth: 80 }}
              >
                <MenuItem value='and'>And</MenuItem>
                <MenuItem value='or'>Or</MenuItem>
              </TextField>
            ) : (
              <Box sx={{ minWidth: 80, flexShrink: 0 }} />
            )}
            <TextField
              select
              size='medium'
              label='Column'
              value={row.columnId}
              onChange={(event) =>
                updateRow(row.id, { columnId: event.target.value })
              }
              sx={{ minWidth: 150 }}
            >
              {filterableColumns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  {getColumnLabel(column)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size='medium'
              label='Operator'
              value={row.operator}
              onChange={(event) =>
                handleOperatorChange(
                  row.id,
                  event.target.value as DataTableFilterOperator,
                  row.value,
                )
              }
              sx={{ minWidth: 150 }}
            >
              {dataTableFilterOperators.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {filterOperatorIsMultiValue(row.operator) ? (
              <Autocomplete
                multiple
                freeSolo
                options={getColumnOptions(row.columnId)}
                // Chips already picked drop out of the suggestion list.
                filterSelectedOptions
                size='medium'
                value={toChipValues(row.value)}
                onChange={(_, nextValue) =>
                  updateRow(row.id, { value: nextValue })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Value'
                    placeholder='Filter value'
                    // Auto-focus the value input on newly added rows.
                    autoFocus={index === rows.length - 1}
                  />
                )}
                sx={{ minWidth: 200 }}
              />
            ) : filterOperatorRequiresValue(row.operator) ? (
              <TextField
                size='medium'
                label='Value'
                placeholder='Filter value'
                autoFocus={index === rows.length - 1}
                value={typeof row.value === 'string' ? row.value : ''}
                onChange={(event) =>
                  updateRow(row.id, { value: event.target.value })
                }
                sx={{ minWidth: 180 }}
              />
            ) : null}
          </Stack>
        ))}
      </Box>
      <Divider />
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ px: 1.5, py: 0.75 }}
      >
        <Button
          size='small'
          startIcon={<AddFilterIcon />}
          onClick={handleAddRow}
        >
          Add filter
        </Button>
        {rows.length > 0 && (
          <Button
            size='small'
            color='primary'
            startIcon={<RemoveAllFiltersIcon />}
            onClick={handleRemoveAll}
          >
            Remove all
          </Button>
        )}
      </Stack>
    </Popover>
  );
}
