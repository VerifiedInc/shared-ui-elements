import { Box, Popover } from '@mui/material';

import { useDataTableContext } from './DataTable.context';
import { DataTableColumnMenu } from './DataTableColumnMenu';
import { DataTableFieldFilterPanel } from './DataTableFieldFilterPanel';
import { DataTableFilterPanel } from './DataTableFilterPanel';
import { DataTableManageColumnsPanel } from './DataTableManageColumnsPanel';

/**
 * The floating column panels — at most one is open at a time (see
 * `DataTableColumnPanelState`): a column's kebab menu, the filter panel
 * or the manage columns panel.
 */
export function DataTablePanels() {
  const {
    table,
    data,
    icons,
    isLoading,
    filters,
    onFiltersChange,
    renderFilterPanel,
    filterFields,
    filterState,
    onFilterStateChange,
    columnPanel,
    closeColumnPanel,
    openFilterPanel,
    openManageColumnsPanel,
  } = useDataTableContext();

  // Column whose kebab menu is open. Resolved per render so the menu sees
  // fresh sorting state.
  const menuColumn =
    columnPanel?.type === 'menu'
      ? table.getColumn(columnPanel.columnId)
      : undefined;

  return (
    <>
      {columnPanel?.type === 'menu' && menuColumn && (
        <DataTableColumnMenu
          column={menuColumn}
          anchorEl={columnPanel.anchorEl}
          icons={icons}
          isLoading={isLoading}
          onClose={closeColumnPanel}
          onOpenFilter={() =>
            openFilterPanel(columnPanel.columnId, columnPanel.anchorEl)
          }
          onOpenManageColumns={() =>
            openManageColumnsPanel(columnPanel.anchorEl)
          }
        />
      )}
      {columnPanel?.type === 'filter' &&
        (filterFields ? (
          // Declarative field panel: the table renders one control per field
          // from the spec and owns the filter state.
          <DataTableFieldFilterPanel
            fields={filterFields}
            filterState={filterState}
            onFilterStateChange={onFilterStateChange}
            anchorPosition={columnPanel.anchorPosition}
            transformHorizontal={columnPanel.transformHorizontal}
            icons={icons}
            onClose={closeColumnPanel}
          />
        ) : renderFilterPanel ? (
          // Consumer-rendered filter panel: the table provides the popover shell + anchor,
          // the consumer owns the controls and filter state.
          <Popover
            open
            anchorReference='anchorPosition'
            anchorPosition={columnPanel.anchorPosition}
            transformOrigin={{
              vertical: 'top',
              horizontal: columnPanel.transformHorizontal,
            }}
            onClose={closeColumnPanel}
          >
            <Box sx={{ p: 2 }}>
              {renderFilterPanel({ onClose: closeColumnPanel, table })}
            </Box>
          </Popover>
        ) : (
          <DataTableFilterPanel
            table={table}
            // Unfiltered rows, value suggestions shouldn't shrink as the
            // active filters narrow the table.
            data={data}
            initialColumnId={columnPanel.columnId}
            anchorPosition={columnPanel.anchorPosition}
            transformHorizontal={columnPanel.transformHorizontal}
            icons={icons}
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClose={closeColumnPanel}
          />
        ))}
      {columnPanel?.type === 'manageColumns' && (
        <DataTableManageColumnsPanel
          table={table}
          anchorPosition={columnPanel.anchorPosition}
          transformHorizontal={columnPanel.transformHorizontal}
          icons={icons}
          onClose={closeColumnPanel}
        />
      )}
    </>
  );
}
