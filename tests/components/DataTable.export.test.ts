import { afterEach, describe, expect, test, vi } from 'vitest';

import { exportDataTableToCsv } from '../../src/components/DataTable/DataTable.export';

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
