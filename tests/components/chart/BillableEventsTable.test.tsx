import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, within } from '@testing-library/react';

import {
  BillableEventsTable,
  BillableProduct,
  exportBillableEventsToCsv,
  type BillableEventsTableRow,
  type BillableLeadingColumn,
} from '../../../src/components/chart/BillableEventsTable';

const HOOLI_CUSTOMER = 'a0000000-0000-0000-0000-000000000001';
const PIED_PIPER_CUSTOMER = 'a0000000-0000-0000-0000-000000000002';

function makeRow(
  overrides: Partial<BillableEventsTableRow>,
): BillableEventsTableRow {
  const has = (key: keyof BillableEventsTableRow) => key in overrides;
  return {
    brandUuid: has('brandUuid') ? overrides.brandUuid! : 'brand-1',
    brand: has('brand') ? overrides.brand! : 'Brand 1',
    customerUuid: has('customerUuid') ? overrides.customerUuid : HOOLI_CUSTOMER,
    customerName: has('customerName') ? overrides.customerName : 'Hooli',
    integrationType: has('integrationType')
      ? overrides.integrationType!
      : 'SDK',
    metrics: has('metrics')
      ? overrides.metrics!
      : { signup_autofillsSucceeded: 1 },
    raw: has('raw')
      ? overrides.raw!
      : {
          brandUuid: overrides.brandUuid ?? 'brand-1',
          brandName: overrides.brand ?? 'Brand 1',
          overall: {},
        },
    challengePrompts: overrides.challengePrompts,
    providers: overrides.providers,
    dealName: overrides.dealName,
    dealCurrentStage: overrides.dealCurrentStage,
    dealFurthestStage: overrides.dealFurthestStage,
    billable: overrides.billable,
    billingNotes: overrides.billingNotes,
  };
}

const baseData: BillableEventsTableRow[] = [
  makeRow({
    brandUuid: 'aviato-uuid',
    brand: 'Aviato',
    customerUuid: HOOLI_CUSTOMER,
    customerName: 'Hooli',
    challengePrompts: [
      { type: 'birthDate', promptForChallenge: 'always' },
      { type: 'fullName.firstName', promptForChallenge: 'ifNecessary' },
    ],
    providers: {
      allowedProviders: ['Acme', 'Pied Piper'],
      healthDataProviders: ['Aviato', 'Acme Health'],
      healthDataProviderMode: 'fallback',
    },
  }),
  makeRow({
    brandUuid: 'pied-piper-uuid',
    brand: 'Pied Piper',
    customerUuid: PIED_PIPER_CUSTOMER,
    customerName: 'Pied Piper',
  }),
];

afterEach(() => {
  cleanup();
});

describe('<BillableEventsTable/>', () => {
  test('Brand UUID column is no longer in the header', () => {
    const { queryByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );
    // Header used to read 'Brand UUID', lives in the expanded panel only.
    expect(queryByText('Brand UUID:')).toBeNull();
  });

  test('renders Customer Name column with values', () => {
    const { getByText, getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );
    expect(getByText('Customer Name')).toBeDefined();
    expect(getByText('Hooli')).toBeDefined();
    // 'Pied Piper' is both the customer name AND the brand name,
    // so it appears in two cells of the same row.
    expect(getAllByText('Pied Piper').length).toBeGreaterThanOrEqual(2);
  });

  test('renders em-dash placeholder when customerName is missing', () => {
    const data = [
      makeRow({
        brandUuid: 'orphan-uuid',
        brand: 'Orphan',
        customerUuid: undefined,
        customerName: undefined,
      }),
    ];
    const { getAllByText } = render(
      <BillableEventsTable data={data} isLoading={false} isFetching={false} />,
    );
    expect(getAllByText('—').length).toBeGreaterThan(0);
  });

  test('sort by Customer Name (asc then desc)', () => {
    const { getByText, container } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    fireEvent.click(getByText('Customer Name'));
    let firstRowText =
      container.querySelectorAll('tbody tr')[0]?.textContent ?? '';
    expect(firstRowText).toContain('Hooli');

    fireEvent.click(getByText('Customer Name'));
    firstRowText = container.querySelectorAll('tbody tr')[0]?.textContent ?? '';
    expect(firstRowText).toContain('Pied Piper');
  });

  test('whole-row click toggles the panel', () => {
    const { queryByText, getByText, getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    expect(queryByText('Identifiers')).toBeNull();

    const aviatoRow = getAllByText('Aviato')[0].closest('tr');
    expect(aviatoRow).not.toBeNull();
    fireEvent.click(aviatoRow!);

    expect(getByText('Identifiers')).toBeDefined();
    expect(getByText('Settings')).toBeDefined();

    fireEvent.click(aviatoRow!);
    expect(queryByText('Identifiers')).toBeNull();
  });

  test('only one row is expanded at a time', () => {
    const { getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const aviatoRow = getAllByText('Aviato')[0].closest('tr');
    const pipRow = getAllByText('Pied Piper')[0].closest('tr');

    fireEvent.click(aviatoRow!);
    expect(getAllByText('Identifiers').length).toBe(1);

    fireEvent.click(pipRow!);
    expect(getAllByText('Identifiers').length).toBe(1);
  });

  test('expanded panel shows Brand UUID and Customer UUID labels', () => {
    const { getByText, getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const aviatoRow = getAllByText('Aviato')[0].closest('tr');
    fireEvent.click(aviatoRow!);

    expect(getByText('Brand UUID:')).toBeDefined();
    expect(getByText('Customer UUID:')).toBeDefined();
  });

  test('Challenges renders ordered prompts as "<type> (<lowercase prompt>)"', () => {
    const { getByText, getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const aviatoRow = getAllByText('Aviato')[0].closest('tr');
    fireEvent.click(aviatoRow!);

    expect(getByText('Birth Date (always)')).toBeDefined();
    expect(getByText('First Name (if necessary)')).toBeDefined();
  });

  test('Pied Piper has no providers — only 1-Click Signup column with empty challenges', () => {
    const { getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const pipRow = getAllByText('Pied Piper')[0].closest('tr');
    fireEvent.click(pipRow!);

    const expandedPanelRow = pipRow?.nextElementSibling as HTMLElement;
    const panel = within(expandedPanelRow);

    expect(panel.getByText('1-Click Signup')).toBeDefined();
    expect(panel.queryByText('1-Click Health')).toBeNull();
    // Empty challenge prompts collapse to "None configured".
    expect(panel.getAllByText('None configured').length).toBeGreaterThanOrEqual(
      1,
    );
  });

  test("Provider names render verbatim (formatting is the backend's job)", () => {
    const { getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const aviatoRow = getAllByText('Aviato')[0].closest('tr');
    fireEvent.click(aviatoRow!);

    const expandedPanelRow = aviatoRow?.nextElementSibling as HTMLElement;
    expect(expandedPanelRow).not.toBeNull();
    const panel = within(expandedPanelRow);

    expect(panel.getByText('Acme')).toBeDefined();
    expect(panel.getByText('Acme Health')).toBeDefined();
    // 'Pied Piper' and 'Aviato' are brands and providers; assert at-least-one inside the panel.
    expect(panel.getAllByText('Pied Piper').length).toBeGreaterThan(0);
    expect(panel.getAllByText('Aviato').length).toBeGreaterThan(0);
  });

  test('1-Click Health uses an ordered list when mode is fallback', () => {
    const { getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const aviatoRow = getAllByText('Aviato')[0].closest('tr');
    fireEvent.click(aviatoRow!);

    const expandedPanelRow = aviatoRow?.nextElementSibling;
    expect(
      expandedPanelRow?.querySelectorAll('ol').length ?? 0,
    ).toBeGreaterThan(0);
  });

  test('1-Click Health uses an unordered list when mode is parallel', () => {
    const parallelData = baseData.map((row) =>
      row.providers?.healthDataProviders
        ? {
            ...row,
            providers: { ...row.providers, healthDataProviderMode: 'parallel' },
          }
        : row,
    );
    const { getAllByText } = render(
      <BillableEventsTable
        data={parallelData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const aviatoRow = getAllByText('Aviato')[0].closest('tr');
    fireEvent.click(aviatoRow!);

    const expandedPanelRow = aviatoRow?.nextElementSibling;
    // 1-Click Signup is still <ol>; 1-Click Health switches to <ul> for parallel.
    expect(
      expandedPanelRow?.querySelectorAll('ul').length ?? 0,
    ).toBeGreaterThan(0);
  });

  test('inner CopyableUuid click does not toggle the row', () => {
    const { queryByText, getAllByLabelText, getAllByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const aviatoRow = getAllByText('Aviato')[0].closest('tr');
    fireEvent.click(aviatoRow!);
    // Clicking a UUID copy button inside the panel must not
    // collapse the row.
    const copyButtons = getAllByLabelText('Copy Brand UUID');
    fireEvent.click(copyButtons[0]);

    // Panel still open.
    expect(queryByText('Identifiers')).not.toBeNull();
  });
});

describe('exportBillableEventsToCsv', () => {
  let capturedBlob: Blob | null;
  // `vi.restoreAllMocks()` only restores `vi.spyOn` targets — it does NOT
  // undo `Object.defineProperty` overrides. Capture the originals here and
  // restore them in afterEach so URL.createObjectURL / revokeObjectURL don't
  // leak the mock into later test files.
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  beforeEach(() => {
    capturedBlob = null;

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn().mockImplementation((blob: Blob) => {
        capturedBlob = blob;
        return 'blob:mock';
      }),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn(),
    });

    const realCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(((tag: string) => {
      const el = realCreateElement(tag);
      if (tag === 'a') {
        Object.defineProperty(el, 'click', { value: vi.fn() });
      }
      return el;
    }) as typeof document.createElement);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: originalCreateObjectURL,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: originalRevokeObjectURL,
    });
  });

  test('header includes Customer Name + Customer UUID + Brand Name + Brand UUID + Integration Type', async () => {
    exportBillableEventsToCsv({
      data: baseData,
      filename: 'test',
      visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
    });

    expect(capturedBlob).not.toBeNull();
    // jsdom's Blob lacks .text(); read via FileReader.
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(capturedBlob!);
    });
    const lines = text.split('\n');

    // Row 0: product group header, 5 leading empty cells for the fixed columns.
    expect(lines[0].startsWith(',,,,,')).toBe(true);
    // Row 1: column header.
    expect(
      lines[1].startsWith(
        'Customer Name,Customer UUID,Brand Name,Brand UUID,Integration Type',
      ),
    ).toBe(true);
    // Row 2+: data rows include both customer columns.
    expect(
      lines
        .slice(2)
        .some((l) =>
          l.startsWith(`Hooli,${HOOLI_CUSTOMER},Aviato,aviato-uuid,SDK`),
        ),
    ).toBe(true);
  });
});

// Deal columns (leadingColumns + Billing Notes), opt-in.
const DEAL_LEADING_COLUMNS: BillableLeadingColumn[] = [
  {
    type: 'column',
    column: { key: 'dealName', label: 'Deal Name', metricKey: 'dealName' },
  },
  {
    type: 'group',
    label: 'Deal Stage',
    columns: [
      {
        key: 'dealCurrentStage',
        label: 'Current',
        metricKey: 'dealCurrentStage',
      },
      {
        key: 'dealFurthestStage',
        label: 'Furthest',
        metricKey: 'dealFurthestStage',
      },
    ],
  },
  {
    type: 'column',
    column: { key: 'billable', label: 'Billable?', metricKey: 'billable' },
  },
];

const DEAL_COLUMN_SLOTS = {
  dealName: (row: BillableEventsTableRow) => row.dealName ?? '—',
  dealCurrentStage: (row: BillableEventsTableRow) =>
    row.dealCurrentStage ?? 'none',
  dealFurthestStage: (row: BillableEventsTableRow) =>
    row.dealFurthestStage ?? 'none',
  billable: (row: BillableEventsTableRow) => (row.billable ? '✓' : ''),
};

describe('<BillableEventsTable/> deal columns', () => {
  const dealData = [
    makeRow({
      brandUuid: 'brand-uuid',
      brand: 'Brand',
      customerName: 'Customer A',
      dealName: 'Customer Deal',
      dealCurrentStage: 'Trial',
      dealFurthestStage: 'Won',
      billable: true,
      billingNotes: 'Prepaid',
    }),
  ];

  test('renders the Deal Stage group header + Current/Furthest sub-columns and the single deal columns', () => {
    const { getByText } = render(
      <BillableEventsTable
        data={dealData}
        isLoading={false}
        isFetching={false}
        leadingColumns={DEAL_LEADING_COLUMNS}
        columnSlots={DEAL_COLUMN_SLOTS}
      />,
    );

    expect(getByText('Deal Stage')).toBeDefined(); // group parent header
    expect(getByText('Current')).toBeDefined();
    expect(getByText('Furthest')).toBeDefined();
    expect(getByText('Deal Name')).toBeDefined();
    expect(getByText('Billable?')).toBeDefined();
    // cell values via columnSlots
    expect(getByText('Trial')).toBeDefined();
    expect(getByText('Won')).toBeDefined();
  });

  test('deal columns render between Customer Name and Brand Name', () => {
    const { container } = render(
      <BillableEventsTable
        data={dealData}
        isLoading={false}
        isFetching={false}
        leadingColumns={DEAL_LEADING_COLUMNS}
        columnSlots={DEAL_COLUMN_SLOTS}
      />,
    );
    const firstHeaderRow = container.querySelectorAll('thead tr')[0];
    const headerText = Array.from(
      firstHeaderRow?.querySelectorAll('th') ?? [],
    ).map((th) => th.textContent ?? '');
    const customerIdx = headerText.findIndex((t) =>
      t.includes('Customer Name'),
    );
    const dealNameIdx = headerText.findIndex((t) => t.includes('Deal Name'));
    const brandIdx = headerText.findIndex((t) => t.includes('Brand Name'));
    expect(customerIdx).toBeLessThan(dealNameIdx);
    expect(dealNameIdx).toBeLessThan(brandIdx);
  });

  test('does NOT render deal columns when leadingColumns is omitted', () => {
    const { queryByText } = render(
      <BillableEventsTable
        data={dealData}
        isLoading={false}
        isFetching={false}
      />,
    );
    expect(queryByText('Deal Stage')).toBeNull();
    expect(queryByText('Deal Name')).toBeNull();
  });

  test('Billing Notes appears in the expanded panel when present', () => {
    const { getAllByText, getByText, queryByText } = render(
      <BillableEventsTable
        data={dealData}
        isLoading={false}
        isFetching={false}
        leadingColumns={DEAL_LEADING_COLUMNS}
        columnSlots={DEAL_COLUMN_SLOTS}
      />,
    );

    expect(queryByText('Billing Notes')).toBeNull(); // collapsed
    fireEvent.click(getAllByText('Brand')[0].closest('tr')!);
    expect(getByText('Billing Notes')).toBeDefined();
    expect(getByText('Prepaid')).toBeDefined();
  });
});

describe('exportBillableEventsToCsv deal columns', () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  let capturedBlob: Blob | null;

  beforeEach(() => {
    capturedBlob = null;
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn().mockImplementation((blob: Blob) => {
        capturedBlob = blob;
        return 'blob:mock';
      }),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn(),
    });
    const realCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(((tag: string) => {
      const el = realCreateElement(tag);
      if (tag === 'a') Object.defineProperty(el, 'click', { value: vi.fn() });
      return el;
    }) as typeof document.createElement);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: originalCreateObjectURL,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: originalRevokeObjectURL,
    });
  });

  test('includes the Deal Stage group + leading columns with formatted values', async () => {
    const dealData = [
      makeRow({
        brand: 'Brand',
        customerName: 'Customer A',
        dealName: 'Customer Deal',
        dealCurrentStage: 'Trial',
        dealFurthestStage: 'Won',
        billable: true,
      }),
    ];

    exportBillableEventsToCsv({
      data: dealData,
      filename: 'test',
      visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
      leadingColumns: DEAL_LEADING_COLUMNS,
      columnFormatters: {
        dealName: (_v, row) => row.dealName ?? '',
        dealCurrentStage: (_v, row) => row.dealCurrentStage ?? 'none',
        dealFurthestStage: (_v, row) => row.dealFurthestStage ?? 'none',
        billable: (_v, row) => (row.billable ? 'Yes' : 'No'),
      },
    });

    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(capturedBlob!);
    });
    const lines = text.split('\n');

    expect(lines[0]).toContain('Deal Stage'); // group header row
    expect(lines[1]).toContain('Deal Name');
    expect(lines[1]).toContain('Current');
    expect(lines[1]).toContain('Furthest');
    expect(lines[1]).toContain('Billable?');
    // data row carries the formatted deal values
    expect(
      lines
        .slice(2)
        .some(
          (l) =>
            l.includes('Brand') &&
            l.includes('Trial') &&
            l.includes('Won') &&
            l.includes('Yes'),
        ),
    ).toBe(true);
  });
});
