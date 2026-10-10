import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, within } from '@testing-library/react';

import {
  BILLABLE_PRODUCTS,
  BillableEventsTable,
  BillableProduct,
  billableEventsExportRecord,
  exportBillableEventsToCsv,
  mapBillableEventsTableData,
  type BillableEventsTableRow,
} from '../../../src/components/chart/BillableEventsTable';
import {
  BillableEventsProductTable,
  mapBillableEventsProductTableData,
} from '../../../src/components/chart/BillableEventsProductTable';

// The tables render through DataTable, whose virtualizer renders no rows in jsdom.
vi.mock(
  '@tanstack/react-virtual',
  async () => await import('../../utils/mockReactVirtual'),
);

const HOOLI_CUSTOMER = 'a0000000-0000-0000-0000-000000000001';
const PIED_PIPER_CUSTOMER = 'a0000000-0000-0000-0000-000000000002';

function makeRow(
  overrides: Partial<BillableEventsTableRow>,
): BillableEventsTableRow {
  const has = (key: keyof BillableEventsTableRow) => key in overrides;
  return {
    brandUuid: has('brandUuid') ? overrides.brandUuid! : 'brand-1',
    brand: has('brand') ? overrides.brand! : 'Brand 1',
    internalBrand: overrides.internalBrand,
    customerUuid: has('customerUuid') ? overrides.customerUuid : HOOLI_CUSTOMER,
    customerName: has('customerName') ? overrides.customerName : 'Hooli',
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

  test('renders the 1-Click Health "Checks Started" and "Autofills Started" columns', () => {
    const data = [
      makeRow({
        brandUuid: 'health-uuid',
        brand: 'Health Co',
        metrics: { health_autofillsStarted: 7, health_checksStarted: 12 },
      }),
    ];
    const { getByText } = render(
      <BillableEventsTable
        data={data}
        isLoading={false}
        isFetching={false}
        visibleProducts={[BillableProduct.ONE_CLICK_HEALTH]}
      />,
    );
    expect(getByText('Autofills Started')).toBeDefined();
    expect(getByText('Checks Started')).toBeDefined();
    // The checks column reads the oneClickHealthCheckStarted metric.
    expect(getByText('12')).toBeDefined();
  });

  test('renders the 1-Click Verify channel success columns', () => {
    const data = [
      makeRow({
        brandUuid: 'verify-uuid',
        brand: 'Verify Co',
        metrics: { verify_autofillsSucceeded: 9, verify_silentSucceeded: 4 },
      }),
    ];
    const { getByText, getAllByText } = render(
      <BillableEventsTable
        data={data}
        isLoading={false}
        isFetching={false}
        visibleProducts={[BillableProduct.ONE_CLICK_VERIFY]}
      />,
    );
    expect(getByText('Autofills Succeeded')).toBeDefined();
    expect(getByText('Silent Succeeded')).toBeDefined();
    expect(getByText('9')).toBeDefined();
    expect(getByText('4')).toBeDefined();
    expect(getAllByText('0').length).toBeGreaterThan(0);
  });

  test('every metric column is thousands-separated, relocated columns included', () => {
    const riskSignalsColumn = BILLABLE_PRODUCTS.find(
      (p) => p.product === BillableProduct.ONE_CLICK_SIGNUP,
    )!.columns.find((c) => c.key === 'signup_riskSignalsReturned')!;
    const data = [
      makeRow({
        brandUuid: 'big-numbers-uuid',
        brand: 'Big Numbers',
        metrics: {
          signup_autofillsSucceeded: 1234567,
          signup_riskSignalsReturned: 89012,
        },
      }),
    ];
    const { getByText } = render(
      <BillableEventsTable
        data={data}
        isLoading={false}
        isFetching={false}
        visibleProducts={[BillableProduct.ONE_CLICK_SIGNUP]}
        topLevelColumns={[riskSignalsColumn]}
      />,
    );
    expect(getByText('1,234,567')).toBeDefined();
    expect(getByText('89,012')).toBeDefined();
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

describe('<BillableEventsTable/> on DataTable', () => {
  test('has no export menu unless asked for', () => {
    const { queryByRole } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
      />,
    );
    expect(queryByRole('button', { name: 'Export' })).toBeNull();
  });

  test('enableExport adds the DataTable export menu, JSON included', () => {
    const { getByRole, getByText } = render(
      <BillableEventsTable
        data={baseData}
        isLoading={false}
        isFetching={false}
        enableExport
        enableJsonExport
        exportFilename='billable-events'
      />,
    );
    fireEvent.click(getByRole('button', { name: 'Export' }));
    expect(getByText('Download as CSV')).toBeDefined();
    expect(getByText('Download as Excel')).toBeDefined();
    expect(getByText('Download as JSON')).toBeDefined();
    expect(getByText('Print')).toBeDefined();
  });

  test('a metric header click re-sorts and reports the order', () => {
    const onSortedDataChange = vi.fn();
    const data = [
      makeRow({
        brandUuid: 'few-uuid',
        brand: 'Few',
        metrics: { signup_autofillsSucceeded: 1 },
      }),
      makeRow({
        brandUuid: 'many-uuid',
        brand: 'Many',
        metrics: { signup_autofillsSucceeded: 50 },
      }),
    ];
    const { getAllByText } = render(
      <BillableEventsTable
        data={data}
        isLoading={false}
        isFetching={false}
        visibleProducts={[BillableProduct.ONE_CLICK_SIGNUP]}
        onSortedDataChange={onSortedDataChange}
      />,
    );

    // Ascending first, then descending.
    fireEvent.click(getAllByText('Autofills Succeeded')[0]);
    fireEvent.click(getAllByText('Autofills Succeeded')[0]);

    const lastOrder = onSortedDataChange.mock.calls.at(-1)?.[0] as
      BillableEventsTableRow[] | undefined;
    expect(lastOrder?.map((row) => row.brand)).toEqual(['Many', 'Few']);
  });
});

describe('<BillableEventsProductTable/>', () => {
  test('enableExport adds the DataTable export menu', () => {
    const { getByRole, queryByText } = render(
      <BillableEventsProductTable
        data={baseData}
        isLoading={false}
        isFetching={false}
        product={BillableProduct.ONE_CLICK_SIGNUP}
        enableExport
      />,
    );
    fireEvent.click(getByRole('button', { name: 'Export' }));
    expect(queryByText('Download as CSV')).not.toBeNull();
    // JSON stays opt-in on its own.
    expect(queryByText('Download as JSON')).toBeNull();
  });

  test('metric columns are thousands-separated', () => {
    const data = [
      makeRow({
        brandUuid: 'big-numbers-uuid',
        brand: 'Big Numbers',
        metrics: {
          signup_autofillsSucceeded: 1234567,
          signup_riskSignalsReturned: 89012,
        },
      }),
    ];
    const { getByText } = render(
      <BillableEventsProductTable
        data={data}
        isLoading={false}
        isFetching={false}
        product={BillableProduct.ONE_CLICK_SIGNUP}
      />,
    );
    expect(getByText('1,234,567')).toBeDefined();
    expect(getByText('89,012')).toBeDefined();
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

  // jsdom's Blob lacks .text(); read via FileReader.
  const readCapturedCsv = async (): Promise<string> => {
    expect(capturedBlob).not.toBeNull();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(capturedBlob!);
    });
  };

  // The table displays separated counts; the CSV must stay machine-readable.
  test('metric values are exported unformatted', async () => {
    exportBillableEventsToCsv({
      data: [
        makeRow({
          brandUuid: 'big-numbers-uuid',
          brand: 'Big Numbers',
          metrics: { signup_autofillsSucceeded: 1234567 },
        }),
      ],
      filename: 'test',
      visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
    });

    const text = await readCapturedCsv();

    expect(text).toContain('1234567');
    expect(text).not.toContain('1,234,567');
  });

  test('1-Click Verify header includes the channel success columns', async () => {
    exportBillableEventsToCsv({
      data: [
        makeRow({
          brandUuid: 'verify-uuid',
          brand: 'Verify Co',
          metrics: { verify_autofillsSucceeded: 9, verify_silentSucceeded: 4 },
        }),
      ],
      filename: 'test',
      visibleProducts: [BillableProduct.ONE_CLICK_VERIFY],
    });

    const header = (await readCapturedCsv()).split('\n')[1];

    expect(header).toContain('Autofills Succeeded');
    expect(header).toContain('Silent Succeeded');
  });

  test('header includes Customer Name + Customer UUID + Brand Name + Brand UUID', async () => {
    exportBillableEventsToCsv({
      data: baseData,
      filename: 'test',
      visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
    });

    const lines = (await readCapturedCsv()).split('\n');

    // Row 0: product group header, 4 leading empty cells for the fixed columns.
    expect(lines[0].startsWith(',,,,')).toBe(true);
    // Row 1: column header.
    expect(
      lines[1].startsWith('Customer Name,Customer UUID,Brand Name,Brand UUID'),
    ).toBe(true);
    // Row 2+: data rows include both customer columns.
    expect(
      lines
        .slice(2)
        .some((l) =>
          l.startsWith(`Hooli,${HOOLI_CUSTOMER},Aviato,aviato-uuid`),
        ),
    ).toBe(true);
  });
});

describe('billableEventsExportRecord', () => {
  const row = makeRow({
    brandUuid: 'aviato-uuid',
    brand: 'Aviato',
    metrics: { signup_autofillsSucceeded: 23, signup_riskSignalsReturned: 8 },
  });

  test('writes brand and customer as { name, uuid }, counts grouped by product', () => {
    expect(
      billableEventsExportRecord(row, {
        visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
      }),
    ).toEqual({
      customer: { name: 'Hooli', uuid: HOOLI_CUSTOMER },
      brand: { name: 'Aviato', uuid: 'aviato-uuid' },
      oneClickSignup: {
        autofillsSucceeded: 23,
        riskSignalsReturned: 8,
      },
    });
  });

  test('drops the customer fields and lifts top-level columns out of their group', () => {
    const riskSignals = BILLABLE_PRODUCTS.find(
      (p) => p.product === BillableProduct.ONE_CLICK_SIGNUP,
    )?.columns.find((c) => c.key === 'signup_riskSignalsReturned');

    const record = billableEventsExportRecord(row, {
      visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
      topLevelColumns: riskSignals ? [riskSignals] : [],
      showCustomerColumn: false,
    });

    expect(record).toEqual({
      brand: { name: 'Aviato', uuid: 'aviato-uuid' },
      riskSignalsReturned: 8,
      oneClickSignup: { autofillsSucceeded: 23 },
    });
    // The row's internal shape stays out of the export.
    expect(record).not.toHaveProperty('raw');
    expect(record).not.toHaveProperty('metrics');
  });
});

describe('Internal Brand Name column', () => {
  // Two brands share the external name; only their internal names tell them apart.
  const footprintData = [
    makeRow({
      brandUuid: 'triumph-uuid',
      brand: 'Footprint',
      internalBrand: 'Footprint (Triumph DOB challenge)',
      metrics: { signup_autofillsSucceeded: 1 },
    }),
    makeRow({
      brandUuid: 'acme-uuid',
      brand: 'Footprint',
      internalBrand: 'Footprint (Acme KYC)',
      metrics: { signup_autofillsSucceeded: 2 },
    }),
  ];

  const headerTexts = (container: HTMLElement): string[] =>
    Array.from(container.querySelectorAll('thead th')).map(
      (cell) => cell.textContent ?? '',
    );

  const tables = [
    {
      name: '<BillableEventsTable/>',
      render: (
        props: Partial<React.ComponentProps<typeof BillableEventsTable>>,
      ) =>
        render(
          <BillableEventsTable
            data={footprintData}
            isLoading={false}
            isFetching={false}
            visibleProducts={[BillableProduct.ONE_CLICK_SIGNUP]}
            {...props}
          />,
        ),
    },
    {
      name: '<BillableEventsProductTable/>',
      render: (
        props: Partial<React.ComponentProps<typeof BillableEventsTable>>,
      ) =>
        render(
          <BillableEventsProductTable
            data={footprintData}
            isLoading={false}
            isFetching={false}
            product={BillableProduct.ONE_CLICK_SIGNUP}
            {...props}
          />,
        ),
    },
  ];

  describe.each(tables)('$name', ({ render: renderTable }) => {
    test('is offered unchecked in Manage columns, and hidden by default', () => {
      const { container, getByLabelText, getByRole } = renderTable({
        showInternalBrandColumn: true,
      });

      expect(headerTexts(container)).not.toContain('Internal Brand Name');
      expect(headerTexts(container)).toContain('Brand Name');

      // No export asked for: the toolbar still shows so the column can be revealed.
      fireEvent.click(getByLabelText('Manage columns'));
      const checkbox = getByRole('checkbox', {
        name: 'Internal Brand Name',
      }) as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    test("shows each brand's internal name once enabled, and Reset hides it again", () => {
      const { container, getByLabelText, getByRole, getByText } = renderTable({
        showInternalBrandColumn: true,
      });

      fireEvent.click(getByLabelText('Manage columns'));
      fireEvent.click(getByRole('checkbox', { name: 'Internal Brand Name' }));

      expect(headerTexts(container)).toContain('Internal Brand Name');
      expect(getByText('Footprint (Triumph DOB challenge)')).toBeDefined();
      expect(getByText('Footprint (Acme KYC)')).toBeDefined();

      fireEvent.click(getByText('Reset'));
      expect(headerTexts(container)).not.toContain('Internal Brand Name');
    });

    test('is not offered unless the host asks for it', () => {
      const { getByLabelText, queryByRole } = renderTable({
        enableExport: true,
      });

      fireEvent.click(getByLabelText('Manage columns'));
      expect(
        queryByRole('checkbox', { name: 'Internal Brand Name' }),
      ).toBeNull();
    });
  });

  test('falls back to the external name for a brand without an internal name', () => {
    const { getByLabelText, getByRole, getAllByText } = render(
      <BillableEventsProductTable
        data={[makeRow({ brandUuid: 'plain-uuid', brand: 'Plain Brand' })]}
        isLoading={false}
        isFetching={false}
        product={BillableProduct.ONE_CLICK_SIGNUP}
        showInternalBrandColumn
      />,
    );

    fireEvent.click(getByLabelText('Manage columns'));
    fireEvent.click(getByRole('checkbox', { name: 'Internal Brand Name' }));

    // Once under Brand Name, once under Internal Brand Name.
    expect(getAllByText('Plain Brand')).toHaveLength(2);
  });

  // Shows the Internal Brand Name column, sorts by it, and returns the order the table reports.
  function sortByInternalBrandName(
    data: BillableEventsTableRow[],
  ): BillableEventsTableRow[] | undefined {
    const onSortedDataChange = vi.fn();
    const { getByLabelText, getByRole, getByText } = render(
      <BillableEventsTable
        data={data}
        isLoading={false}
        isFetching={false}
        visibleProducts={[BillableProduct.ONE_CLICK_SIGNUP]}
        onSortedDataChange={onSortedDataChange}
        showInternalBrandColumn
      />,
    );
    fireEvent.click(getByLabelText('Manage columns'));
    fireEvent.click(getByRole('checkbox', { name: 'Internal Brand Name' }));
    fireEvent.keyDown(document.activeElement ?? document.body, {
      key: 'Escape',
    });

    fireEvent.click(getByText('Internal Brand Name', { selector: 'thead *' }));

    return onSortedDataChange.mock.calls.at(-1)?.[0] as
      BillableEventsTableRow[] | undefined;
  }

  test('sorts the rows by internal name from its header', () => {
    expect(
      sortByInternalBrandName(footprintData)?.map((row) => row.internalBrand),
    ).toEqual(['Footprint (Acme KYC)', 'Footprint (Triumph DOB challenge)']);
  });

  test('sorts a row without an internal name by the external name it shows', () => {
    const mixed = [
      // Shows "Zeta Health" under Internal Brand Name, so it sorts after "Footprint (Acme KYC)".
      makeRow({ brandUuid: 'zeta-uuid', brand: 'Zeta Health' }),
      makeRow({
        brandUuid: 'acme-uuid',
        brand: 'Footprint',
        internalBrand: 'Footprint (Acme KYC)',
      }),
    ];

    expect(sortByInternalBrandName(mixed)?.map((row) => row.brandUuid)).toEqual(
      ['acme-uuid', 'zeta-uuid'],
    );
  });

  test('the JSON export record carries the internal name when the column is offered', () => {
    const [triumph] = footprintData;

    expect(
      billableEventsExportRecord(triumph, {
        visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
        showCustomerColumn: false,
        showInternalBrandColumn: true,
      }).brand,
    ).toEqual({
      name: 'Footprint',
      internalName: 'Footprint (Triumph DOB challenge)',
      uuid: 'triumph-uuid',
    });
    expect(
      billableEventsExportRecord(triumph, {
        visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
      }).brand,
    ).toEqual({ name: 'Footprint', uuid: 'triumph-uuid' });
  });

  describe('mappers', () => {
    const chartData = (brandUuid: string) => ({
      brandUuid,
      brandName: 'Footprint',
      interval: [{ oneClickSuccess: 3 }],
      overall: {},
    });
    const brands = [
      {
        brandUuid: 'triumph-uuid',
        brandName: 'Footprint',
        internalBrandName: 'Footprint (Triumph DOB challenge)',
      },
      {
        brandUuid: 'unnamed-uuid',
        brandName: 'Footprint',
        internalBrandName: null,
      },
    ];

    test('mapBillableEventsTableData sets internalBrand, falling back to the external name', () => {
      const rows = mapBillableEventsTableData({
        productDataSets: [
          {
            product: BillableProduct.ONE_CLICK_SIGNUP,
            data: [chartData('triumph-uuid'), chartData('unnamed-uuid')],
          },
        ],
        brands,
      });

      expect(rows.map((row) => [row.brandUuid, row.internalBrand])).toEqual([
        ['triumph-uuid', 'Footprint (Triumph DOB challenge)'],
        ['unnamed-uuid', 'Footprint'],
      ]);
    });

    test('mapBillableEventsProductTableData sets internalBrand, falling back to the external name', () => {
      const rows = mapBillableEventsProductTableData({
        product: BillableProduct.ONE_CLICK_SIGNUP,
        data: [chartData('triumph-uuid'), chartData('unnamed-uuid')],
        brands,
      });

      expect(rows.map((row) => [row.brandUuid, row.internalBrand])).toEqual([
        ['triumph-uuid', 'Footprint (Triumph DOB challenge)'],
        ['unnamed-uuid', 'Footprint'],
      ]);
    });
  });
});
