import { useState } from 'react';

import {
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
  getDataTableExportModel,
  printDataTable,
  type DataTableExportColumn,
  type DataTableExportModel,
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
}

/**
 * Toolbar Export button opening a menu with Print / Download as CSV / Download as Excel, like
 * the MUI DataGrid toolbar, plus Download as JSON where the table asks for it. Every action
 * exports the displayed table: the filtered + sorted rows across every page. Print and the sheet
 * formats write the visible accessor columns in display order; JSON writes the rows themselves.
 */
export function DataTableExportMenu<TData extends DataTableData>({
  table,
  filename,
  icons,
  additionalExportColumns,
  exportRowDetails,
  exportRecord,
  enableJsonExport = false,
}: Readonly<DataTableExportMenuProps<TData>>) {
  const {
    export: ExportIcon = FileDownloadOutlined,
    print: PrintIcon = Print,
    downloadCsv: DownloadCsvIcon = DescriptionOutlined,
    downloadExcel: DownloadExcelIcon = GridOnOutlined,
    downloadJson: DownloadJsonIcon = DataObject,
  } = icons;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // The snapshot is built on click, so it reflects the table state at
  // that moment (sorting, filters, search, column visibility/order).
  const handleExport = (
    action: (model: DataTableExportModel, filename: string) => void,
  ): void => {
    action(
      getDataTableExportModel(table, additionalExportColumns, {
        rowDetails: exportRowDetails,
        toRecord: exportRecord,
      }),
      filename,
    );
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title='Export' placement='bottom' arrow>
        <IconButton
          size='small'
          aria-label='Export'
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <ExportIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleExport(printDataTable)}>
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
