import { afterEach, describe, expect, test, vi } from 'vitest';

import {
  exportDataTableToCsv,
  exportDataTableToJson,
  printDataTable,
  type DataTableExportModel,
} from '../../src/components/DataTable/DataTable.export';

const originalCreateObjectURL = URL.createObjectURL;
const originalRevokeObjectURL = URL.revokeObjectURL;

async function readBlob(blob: Blob): Promise<string> {
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(String(reader.result));
    };
    reader.readAsText(blob);
  });
}

/** The text of the blob an export downloads, with the UTF-8 BOM stripped. */
async function captureDownloadedText(download: () => void): Promise<string> {
  let downloaded: Blob | undefined;
  URL.createObjectURL = (blob: Blob) => {
    downloaded = blob;
    return 'blob:test';
  };
  URL.revokeObjectURL = () => undefined;
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
    () => undefined,
  );

  download();

  if (!downloaded) throw new Error('nothing was downloaded');
  return (await readBlob(downloaded)).replace('\ufeff', '');
}

/** The document `printDataTable` hands the print iframe. */
function capturePrintHtml(print: () => void): string {
  print();

  const iframe = document.body.querySelector('iframe');
  if (!iframe) throw new Error('nothing was printed');
  const html = iframe.srcdoc;
  iframe.remove();
  return html;
}

afterEach(() => {
  URL.createObjectURL = originalCreateObjectURL;
  URL.revokeObjectURL = originalRevokeObjectURL;
  vi.restoreAllMocks();
});

describe('exportDataTableToCsv', () => {
  test('neutralizes formula-prefixed text and leaves placeholders and numbers alone', async () => {
    let downloaded: Blob | undefined;
    URL.createObjectURL = (blob: Blob) => {
      downloaded = blob;
      return 'blob:test';
    };
    URL.revokeObjectURL = () => undefined;
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
      () => undefined,
    );

    exportDataTableToCsv(
      {
        header: ['Name', 'Notes', 'Starts', 'Count'],
        rows: [
          ['=HYPERLINK("https://evil.test")', '-2+3+cmd', '-', -5],
          ['Plain, with comma', '@home', 'October 1, 2026', 0],
        ],
      },
      'rules',
    );

    if (!downloaded) throw new Error('nothing was downloaded');
    const text = (await readBlob(downloaded)).replace('﻿', '');
    expect(text.split('\n')).toEqual([
      'Name,Notes,Starts,Count',
      `"'=HYPERLINK(""https://evil.test"")",'-2+3+cmd,-,-5`,
      `"Plain, with comma",'@home,"October 1, 2026",0`,
    ]);
  });
});

describe('row detail sections', () => {
  const model: DataTableExportModel = {
    header: ['Name', 'Status'],
    rows: [
      ['First rule', 'In Network'],
      ['Second rule', 'Out of Network'],
    ],
    rowDetails: [
      [
        {
          title: 'Conditions',
          header: ['Key', 'Operator', 'Values'],
          emptyMessage: 'No conditions',
          rows: [['Payer', 'equals', 'Aetna, Cigna']],
          lines: ['Payer equals Aetna, Cigna'],
        },
        {
          title: 'Metadata',
          header: ['Key', 'Type', 'Value'],
          emptyMessage: 'No metadata',
          rows: [
            ['tier', 'String', 'gold'],
            ['seats', 'Number', 4],
          ],
          lines: ['tier: gold', 'seats: 4'],
        },
      ],
      [
        {
          title: 'Conditions',
          header: ['Key', 'Operator', 'Values'],
          emptyMessage: 'No conditions',
          rows: [['State', 'is any of', 'CA, NY']],
        },
        {
          title: 'Metadata',
          header: ['Key', 'Type', 'Value'],
          emptyMessage: 'No metadata',
          rows: [],
        },
      ],
    ],
  };

  test('collapses each block into a column of its own in the CSV', async () => {
    const csv = await captureDownloadedText(() =>
      exportDataTableToCsv(model, 'rules'),
    );

    // One row per rule, one column per block: every entry is a line inside its cell, so a quoted
    // field carries the newlines. A rule with no entries leaves the cell empty.
    expect(csv).toBe(
      [
        'Name,Status,Conditions,Metadata',
        'First rule,In Network,"Payer equals Aetna, Cigna","tier: gold\nseats: 4"',
        'Second rule,Out of Network,"State is any of CA, NY",',
      ].join('\n'),
    );
  });

  test('nests each block under its row when printing', () => {
    const html = capturePrintHtml(() => printDataTable(model, 'rules'));

    // Print keeps the panel shape: a block per rule, under the row it belongs to.
    expect(html).toContain('<td colspan="2">');
    expect(html).toContain('Aetna, Cigna');
    expect(html.match(/<h2>Conditions<\/h2>/g)).toHaveLength(2);
    // An empty block shows its message instead of headers over nothing.
    expect(html).toContain('No metadata');
  });
});

describe('exportDataTableToJson', () => {
  test('writes the records themselves, nesting and all', async () => {
    const rule = {
      uuid: 'd41d6c90-63a6-447a-8353-4552b62707f8',
      brandUuid: '27c4ecb7-db22-4e8f-93cb-cdb8c7e1d720',
      name: 'Aha1234',
      status: 'IN_NETWORK',
      notes: 'dasdadsa',
      enabled: true,
      startDate: '2026-09-15',
      endDate: null,
      conditions: [{ key: 'payerId', values: ['V001117'], operator: 'EQUAL' }],
      createdAt: 1789659364229,
      updatedAt: 1789763664189,
      number: 1,
      metadata: { newkey: 'dasdsadsad1296', number: 9999999999.99999 },
    };

    const json = await captureDownloadedText(() =>
      exportDataTableToJson(
        { header: ['Name'], rows: [['Aha1234']], records: [rule] },
        'rules',
      ),
    );

    // The record round-trips: conditions, metadata and the fields no column shows.
    expect(JSON.parse(json)).toEqual([rule]);
    // Indented, so the file is readable as it downloads.
    expect(json.split('\n')[1]).toBe('  {');
  });

  test('writes an empty list when the model carries no records', async () => {
    const json = await captureDownloadedText(() =>
      exportDataTableToJson({ header: ['Name'], rows: [] }, 'rules'),
    );

    expect(json).toBe('[]');
  });
});
