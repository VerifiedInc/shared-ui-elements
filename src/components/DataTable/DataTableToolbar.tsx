import { useRef, useState } from 'react';

import {
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Close, FilterList, Search, ViewColumn } from '@mui/icons-material';

import { useDataTableContext } from './DataTable.context';
import { isFilterRowActive } from './DataTable.filters';
import { effectiveFilterFieldCount } from './DataTable.filterState';
import { DataTableExportMenu } from './DataTableExportMenu';

/**
 * Toolbar row above the table, like the MUI DataGrid toolbar: Manage
 * columns and Filters buttons (the filter button carries a badge with the
 * active filter count), the optional Export menu and a search button that
 * expands into the quick-search input on the right.
 */
export function DataTableToolbar() {
  const {
    table,
    icons,
    filters,
    search,
    onSearchChange,
    enableExport,
    exportFilename,
    additionalExportColumns,
    renderFilterPanel,
    activeFilterCount,
    filterFields,
    filterState,
    toolbarFilterButtonRef,
    toolbarManageColumnsButtonRef,
    openFilterPanel,
    openManageColumnsPanel,
  } = useDataTableContext();

  // Custom icon slots — capitalized so JSX treats them as components.
  // Unset slots fall back to the MUI default.
  const {
    openFilterPanel: OpenFilterPanelIcon = FilterList,
    manageColumns: ManageColumnsIcon = ViewColumn,
    search: SearchIcon = Search,
    close: CloseIcon = Close,
  } = icons;

  const searchInputRef = useRef<HTMLInputElement>(null);

  // The toolbar search expands from its icon button into the input on
  // focus and collapses back on blur — unless a query is active, which
  // keeps it expanded.
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const isSearchOpen = isSearchExpanded || search !== '';

  // The badge count on the filter button, and the column preselected when
  // it opens the panel with no active rows. The filter button is omitted
  // when no filter mechanism applies. With `filterFields` the table derives
  // the count from its own state; with a consumer panel the count comes from
  // the consumer (activeFilterCount); otherwise it counts active operator rows.
  const totalActiveFilterCount = filterFields
    ? effectiveFilterFieldCount(filterFields, filterState)
    : renderFilterPanel
      ? (activeFilterCount ?? 0)
      : filters.rows.filter(isFilterRowActive).length;
  const firstFilterableColumnId = table
    .getAllLeafColumns()
    .find((column) => column.getCanFilter())?.id;
  const showFilterButton =
    filterFields !== undefined ||
    renderFilterPanel !== undefined ||
    firstFilterableColumnId !== undefined;

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='flex-end'
      spacing={0.5}
      sx={{ mb: 0.5 }}
    >
      <Tooltip title='Manage columns' placement='bottom' arrow>
        <IconButton
          ref={toolbarManageColumnsButtonRef}
          size='small'
          aria-label='Manage columns'
          onClick={(event) => openManageColumnsPanel(event.currentTarget)}
        >
          <ManageColumnsIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      {showFilterButton && (
        <Tooltip title='Filters' placement='bottom' arrow>
          <IconButton
            ref={toolbarFilterButtonRef}
            size='small'
            aria-label='Show filters'
            onClick={(event) =>
              openFilterPanel(
                firstFilterableColumnId ?? '',
                event.currentTarget,
              )
            }
          >
            <Badge badgeContent={totalActiveFilterCount} color='primary'>
              <OpenFilterPanelIcon fontSize='small' />
            </Badge>
          </IconButton>
        </Tooltip>
      )}
      {enableExport && (
        <Divider
          orientation='vertical'
          variant='middle'
          flexItem
          sx={{ height: 14, alignSelf: 'center' }}
        />
      )}
      {enableExport && (
        <DataTableExportMenu
          table={table}
          filename={exportFilename}
          icons={icons}
          additionalExportColumns={additionalExportColumns}
        />
      )}
      <Divider
        orientation='vertical'
        variant='middle'
        flexItem
        sx={{ height: 14, alignSelf: 'center' }}
      />
      {/* Search button that expands into the quick-search input. The
          icon button is the input's start adornment, so the field
          grows open around it — expanding on focus and collapsing on
          blur once the query is cleared. */}
      <TextField
        size='small'
        variant='outlined'
        value={search}
        placeholder='Search…'
        inputRef={searchInputRef}
        onChange={(event) => onSearchChange(event.target.value)}
        onFocus={() => setIsSearchExpanded(true)}
        onBlur={() => setIsSearchExpanded(false)}
        onKeyDown={(event) => {
          // Escape clears the query; the blur then collapses the input.
          if (event.key === 'Escape') {
            onSearchChange('');
            searchInputRef.current?.blur();
          }
        }}
        inputProps={{ 'aria-label': 'Search' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Tooltip title='Search' placement='bottom' arrow>
                <IconButton
                  size='small'
                  aria-label='Show search'
                  onClick={() => searchInputRef.current?.focus()}
                >
                  <SearchIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment:
            search === '' ? undefined : (
              <InputAdornment position='end'>
                <Tooltip title='Clear' placement='bottom' arrow>
                  <IconButton
                    size='small'
                    aria-label='Clear search'
                    onClick={() => {
                      onSearchChange('');
                      searchInputRef.current?.focus();
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
        }}
        sx={{
          // Collapsed, only the icon button is visible — the input is
          // clipped away and the outline fades out with it.
          width: isSearchOpen ? 220 : 34,
          transition: 'width .2s',
          overflow: 'hidden',
          // Tightened from the outlined default (14px) so the icon
          // button hugs the field edges like the other toolbar buttons.
          '& .MuiOutlinedInput-root': { pl: 0.5, pr: 0.5 },
          '& .MuiOutlinedInput-notchedOutline': {
            opacity: isSearchOpen ? 1 : 0,
            transition: 'opacity .2s',
          },
        }}
      />
    </Stack>
  );
}
