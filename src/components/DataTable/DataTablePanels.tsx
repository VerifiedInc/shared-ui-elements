import { useDataTableContext } from './DataTable.context';
import { DataTableColumnMenu } from './DataTableColumnMenu';
import { DataTableFieldFilterPanel } from './DataTableFieldFilterPanel';
import { DataTableManageColumnsPanel } from './DataTableManageColumnsPanel';

/**
 * The floating column panels — at most one is open at a time (see
 * `DataTableColumnPanelState`): a column's kebab menu, the filter panel
 * or the manage columns panel.
 */
export function DataTablePanels() {
  const {
    table,
    icons,
    isLoading,
    filterFields,
    filterState,
    onFilterStateChange,
    columnPanel,
    closeColumnPanel,
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
          onOpenManageColumns={() =>
            openManageColumnsPanel(columnPanel.anchorEl)
          }
        />
      )}
      {columnPanel?.type === 'filter' && filterFields && (
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
      )}
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
