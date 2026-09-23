import { useState } from 'react';

import {
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  DataObject,
  DescriptionOutlined,
  FileDownloadOutlined,
  GridOnOutlined,
  Print,
} from '@mui/icons-material';
import type { Table } from '@tanstack/react-table';

import type { DataTableData, DataTableIcons } from './DataTable.types';
import {
  exportDataTableToCsv,
  exportDataTableToExcel,
  exportDataTableToJson,
  fetchAllDataTableRows,
  getDataTableExportModel,
  printDataTable,
  type DataTableExportColumn,
  type DataTableExportModel,
  type DataTableExportPageFetcher,
  type DataTableExportRowDetails,
} from './DataTable.export';

interface DataTableExportMenuProps<TData extends DataTableData> {
  table: Table<TData>;
  /** Base filename (no extension); also the printed document title. */
  filename: string;
  icons: DataTableIcons;
  /** Export-only columns appended after the visible columns. */
  additionalExportColumns?: ReadonlyArray<DataTableExportColumn<TData>>;
  exportRowDetails?: DataTableExportRowDetails<TData>;
  /** Shapes a row for the JSON export. */
  exportRecord?: (row: TData) => unknown;
  /** Adds the "Download as JSON" item. */
  enableJsonExport?: boolean;
  /** The page's CSP nonce, for the print document's stylesheet. */
  cspNonce?: string;
  /** Adds the "Export all rows" checkbox, exporting every page fetched through it. */
  fetchExportPage?: DataTableExportPageFetcher<TData>;
  exportPageSize?: number;
}

/**
 * Toolbar Export button opening a menu with Print / Download as CSV / Download as Excel, like
 * the MUI DataGrid toolbar, plus Download as JSON where the table asks for it. Every action
 * exports the displayed table: the filtered + sorted rows on the current page. Print and the
 * sheet formats write the visible accessor columns in display order; JSON writes the rows
 * themselves. With `fetchExportPage`, the "Export all rows" checkbox exports every page instead.
 */
export function DataTableExportMenu<TData extends DataTableData>({
  table,
  filename,
  icons,
  additionalExportColumns,
  exportRowDetails,
  exportRecord,
  enableJsonExport = false,
  cspNonce,
  fetchExportPage,
  exportPageSize = 100,
}: Readonly<DataTableExportMenuProps<TData>>) {
  const {
    export: ExportIcon = FileDownloadOutlined,
    print: PrintIcon = Print,
    downloadCsv: DownloadCsvIcon = DescriptionOutlined,
    downloadExcel: DownloadExcelIcon = GridOnOutlined,
    downloadJson: DownloadJsonIcon = DataObject,
  } = icons;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [exportAll, setExportAll] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFailed, setExportFailed] = useState(false);
  const exportLabel = exportFailed ? 'Export failed, try again' : 'Export';

  // The snapshot is built on click, so it reflects the table state at
  // that moment (sorting, filters, search, column visibility/order).
  const runExport = async (
    action: (model: DataTableExportModel, filename: string) => void,
  ): Promise<void> => {
    setIsExporting(true);
    setExportFailed(false);

    try {
      const rows =
        exportAll && fetchExportPage
          ? await fetchAllDataTableRows(fetchExportPage, exportPageSize)
          : undefined;

      action(
        getDataTableExportModel(table, additionalExportColumns, {
          rows,
          rowDetails: exportRowDetails,
          toRecord: exportRecord,
        }),
        filename,
      );
    } catch (error) {
      setExportFailed(true);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = (
    action: (model: DataTableExportModel, filename: string) => void,
  ): void => {
    setAnchorEl(null);
    runExport(action).catch(console.error);
  };

  return (
    <>
      <Tooltip title={exportLabel} placement='bottom' arrow>
        <IconButton
          size='small'
          aria-label={exportLabel}
          aria-busy={isExporting}
          color={exportFailed ? 'error' : 'default'}
          onClick={(event) => {
            // A second export waits for the one in flight.
            if (!isExporting) setAnchorEl(event.currentTarget);
          }}
        >
          {isExporting ? (
            <CircularProgress size={16} aria-label='Exporting' />
          ) : (
            <ExportIcon fontSize='small' />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {fetchExportPage && [
          <MenuItem
            key='export-all'
            onClick={() => setExportAll((checked) => !checked)}
          >
            <ListItemIcon>
              <Checkbox
                size='small'
                checked={exportAll}
                disableRipple
                tabIndex={-1}
                inputProps={{ 'aria-label': 'Export all rows' }}
                sx={{ p: 0 }}
              />
            </ListItemIcon>
            <ListItemText>Export all rows</ListItemText>
          </MenuItem>,
          <Divider key='export-all-divider' />,
        ]}
        {/* Printing every row renders one document holding all of them, which can run the tab out
            of memory; print stays with the loaded rows. */}
        <MenuItem
          disabled={exportAll}
          onClick={() =>
            handleExport((model, name) =>
              printDataTable(model, name, { nonce: cspNonce }),
            )
          }
        >
          <ListItemIcon>
            <PrintIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Print</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport(exportDataTableToCsv)}>
          <ListItemIcon>
            <DownloadCsvIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Download as CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport(exportDataTableToExcel)}>
          <ListItemIcon>
            <DownloadExcelIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Download as Excel</ListItemText>
        </MenuItem>
        {enableJsonExport && (
          <MenuItem onClick={() => handleExport(exportDataTableToJson)}>
            <ListItemIcon>
              <DownloadJsonIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Download as JSON</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
