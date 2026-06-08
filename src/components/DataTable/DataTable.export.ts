import type { Table } from '@tanstack/react-table';

import type { DataTableData } from './DataTable.types';
import { getColumnLabel } from './DataTable.utils';

/** Cell value shape carried into the export formats. */
export type DataTableExportValue = string | number | boolean;

/**
 * An extra export-only column appended after the visible table columns, for data shown outside
 * the grid (e.g. an expandable detail row) that should still land in the CSV / Excel / Print output.
 * The consumer supplies the header and a per-row value extractor, the table has no knowledge of it.
 */
export interface DataTableExportColumn<TData extends DataTableData> {
  header: string;
  value: (row: TData) => DataTableExportValue;
}

/**
 * Snapshot of the displayed table used by every export format: the
 * filtered + sorted rows across every page and the visible accessor
 * columns in display order.
 */
export interface DataTableExportModel {
  /**
   * Group header row mirroring the table's grouped header — each group
   * label at the start of its span, blanks elsewhere. Omitted when no
   * visible column is grouped.
   */
  groupHeader?: string[];
  header: string[];
  rows: DataTableExportValue[][];
}

function toExportValue(value: unknown): DataTableExportValue {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

/**
 * Builds the export snapshot from the table instance. Rows come from the
 * pre-pagination row model, so they reflect the active filters, quick
 * search and sort order across every page (with manual pagination only
 * the loaded page is available). Display-only columns (no accessor, e.g.
 * expand chevrons) are skipped.
 */
export function getDataTableExportModel<TData extends DataTableData>(
  table: Table<TData>,
  additionalColumns: ReadonlyArray<DataTableExportColumn<TData>> = [],
): DataTableExportModel {
  const columns = table
    .getVisibleLeafColumns()
    .filter((column) => column.accessorFn !== undefined);

  const groupLabels = columns.map((column) => {
    const header = column.parent?.columnDef.header;

    return typeof header === 'string' ? header : '';
  });

  // Blank out the repeats so each group label appears once at the start
  // of its span, like the rendered grouped header row.
  const groupHeader = groupLabels.some((label) => label !== '')
    ? groupLabels
        .map((label, index) =>
          index > 0 && groupLabels[index - 1] === label ? '' : label,
        )
        // Additional (export-only) columns sit outside any group.
        .concat(additionalColumns.map(() => ''))
    : undefined;

  return {
    groupHeader,
    header: [
      ...columns.map((column) => getColumnLabel(column)),
      ...additionalColumns.map((column) => column.header),
    ],
    rows: table.getPrePaginationRowModel().rows.map((row) => [
      ...columns.map((column) => toExportValue(row.getValue(column.id))),
      ...additionalColumns.map((column) => toExportValue(column.value(row.original))),
    ]),
  };
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: DataTableExportValue): string {
  const text = String(value);

  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Downloads the export snapshot as `<filename>.csv`. */
export function exportDataTableToCsv(
  model: DataTableExportModel,
  filename: string,
): void {
  const lines = [
    ...(model.groupHeader ? [model.groupHeader] : []),
    model.header,
    ...model.rows,
  ].map((cells) => cells.map(escapeCsvValue).join(','));

  // Leading BOM so Excel detects the file as UTF-8.
  const blob = new Blob(['\ufeff', lines.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });

  downloadBlob(blob, `${filename}.csv`);
}

function escapeMarkup(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// --- Minimal XLSX writer --------------------------------------------------
// A .xlsx file is a zip archive of XML parts. The parts below are the
// minimum Excel needs to open a single-sheet workbook: cells are written
// as inline strings (no shared-string table) and plain numbers. Entries
// are stored uncompressed, so no compression library is needed.

/** Spreadsheet column reference for a zero-based index: 0 → A, 26 → AA. */
function columnRef(index: number): string {
  let ref = '';
  let n = index + 1;

  while (n > 0) {
    ref = String.fromCharCode(65 + ((n - 1) % 26)) + ref;
    n = Math.floor((n - 1) / 26);
  }

  return ref;
}

function worksheetXml(model: DataTableExportModel): string {
  const allRows = [
    ...(model.groupHeader ? [model.groupHeader] : []),
    model.header,
    ...model.rows,
  ];

  const rowsXml = allRows
    .map((cells, rowIndex) => {
      const cellsXml = cells
        .map((value, columnIndex) => {
          const ref = `${columnRef(columnIndex)}${rowIndex + 1}`;

          if (typeof value === 'number' && Number.isFinite(value)) {
            return `<c r="${ref}"><v>${value}</v></c>`;
          }

          if (typeof value === 'boolean') {
            return `<c r="${ref}" t="b"><v>${value ? 1 : 0}</v></c>`;
          }

          return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${escapeMarkup(String(value))}</t></is></c>`;
        })
        .join('');

      return `<row r="${rowIndex + 1}">${cellsXml}</row>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowsXml}</sheetData></worksheet>`;
}

const XLSX_STATIC_PARTS: ReadonlyArray<{ name: string; content: string }> = [
  {
    name: '[Content_Types].xml',
    content:
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
  },
  {
    name: '_rels/.rels',
    content:
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
  },
  {
    name: 'xl/workbook.xml',
    content:
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Data" sheetId="1" r:id="rId1"/></sheets></workbook>',
  },
  {
    name: 'xl/_rels/workbook.xml.rels',
    content:
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
  },
];

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);

  for (let i = 0; i < 256; i++) {
    let crc = i;

    for (let j = 0; j < 8; j++) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }

    table[i] = crc >>> 0;
  }

  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;

  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Packs the parts into a zip archive with stored (uncompressed) entries.
 * Timestamps are fixed to the DOS epoch (1980-01-01) so the same data
 * always produces the same bytes.
 */
function createZip(
  files: Array<{ name: string; content: string }>,
): ArrayBuffer {
  const encoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = encoder.encode(file.content);
    const crc = crc32(dataBytes);

    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true); // local file header signature
    local.setUint16(4, 20, true); // version needed to extract
    local.setUint16(6, 0x0800, true); // flags: UTF-8 names
    local.setUint16(8, 0, true); // method: stored
    local.setUint16(10, 0, true); // mod time
    local.setUint16(12, 0x21, true); // mod date: 1980-01-01
    local.setUint32(14, crc, true);
    local.setUint32(18, dataBytes.length, true); // compressed size
    local.setUint32(22, dataBytes.length, true); // uncompressed size
    local.setUint16(26, nameBytes.length, true);
    local.setUint16(28, 0, true); // extra field length

    localParts.push(new Uint8Array(local.buffer), nameBytes, dataBytes);

    const central = new DataView(new ArrayBuffer(46));
    central.setUint32(0, 0x02014b50, true); // central directory signature
    central.setUint16(4, 20, true); // version made by
    central.setUint16(6, 20, true); // version needed to extract
    central.setUint16(8, 0x0800, true); // flags: UTF-8 names
    central.setUint16(10, 0, true); // method: stored
    central.setUint16(12, 0, true); // mod time
    central.setUint16(14, 0x21, true); // mod date: 1980-01-01
    central.setUint32(16, crc, true);
    central.setUint32(20, dataBytes.length, true); // compressed size
    central.setUint32(24, dataBytes.length, true); // uncompressed size
    central.setUint16(28, nameBytes.length, true);
    // Bytes 30-37 (extra/comment lengths, disk number, internal
    // attributes) and 38-41 (external attributes) stay zero.
    central.setUint32(42, offset, true); // local header offset

    centralParts.push(new Uint8Array(central.buffer), nameBytes);

    offset += 30 + nameBytes.length + dataBytes.length;
  }

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);

  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); // end of central directory signature
  end.setUint16(8, files.length, true); // entries on this disk
  end.setUint16(10, files.length, true); // total entries
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true); // central directory offset

  const endBytes = new Uint8Array(end.buffer);
  const archive = new Uint8Array(offset + centralSize + endBytes.length);
  let position = 0;

  for (const part of [...localParts, ...centralParts, endBytes]) {
    archive.set(part, position);
    position += part.length;
  }

  return archive.buffer;
}

/** Downloads the export snapshot as `<filename>.xlsx`. */
export function exportDataTableToExcel(
  model: DataTableExportModel,
  filename: string,
): void {
  const zip = createZip([
    ...XLSX_STATIC_PARTS,
    { name: 'xl/worksheets/sheet1.xml', content: worksheetXml(model) },
  ]);

  downloadBlob(
    new Blob([zip], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    `${filename}.xlsx`,
  );
}

function printHtml(model: DataTableExportModel, title: string): string {
  const renderRow = (cells: DataTableExportValue[], tag: 'th' | 'td') =>
    `<tr>${cells
      .map((value) => {
        const numClass = typeof value === 'number' ? ' class="num"' : '';

        return `<${tag}${numClass}>${escapeMarkup(String(value))}</${tag}>`;
      })
      .join('')}</tr>`;

  const headRows = [
    ...(model.groupHeader ? [renderRow(model.groupHeader, 'th')] : []),
    renderRow(model.header, 'th'),
  ].join('');

  const bodyRows = model.rows.map((row) => renderRow(row, 'td')).join('');

  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeMarkup(title)}</title><style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 16px; }
table { border-collapse: collapse; width: 100%; font-size: 12px; }
th, td { padding: 6px 8px; border-bottom: 1px solid #ddd; text-align: left; }
th { text-transform: uppercase; font-size: 10px; }
.num { text-align: right; }
</style></head><body><table><thead>${headRows}</thead><tbody>${bodyRows}</tbody></table></body></html>`;
}

/**
 * Opens the browser print dialog with a print-friendly rendering of the
 * export snapshot (via a hidden iframe, so the page itself never
 * navigates). The title becomes the printed document name.
 */
export function printDataTable(
  model: DataTableExportModel,
  title: string,
): void {
  const iframe = document.createElement('iframe');

  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';

  iframe.onload = () => {
    const win = iframe.contentWindow;

    if (!win) {
      iframe.remove();
      return;
    }

    win.addEventListener('afterprint', () => iframe.remove());
    win.focus();
    win.print();
  };

  iframe.srcdoc = printHtml(model, title);
  document.body.appendChild(iframe);
}
