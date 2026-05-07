import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, within } from '@testing-library/react';

import {
  BillableEventsTable,
  BillableProduct,
  exportBillableEventsToCsv,
  type BillableEventsTableRow,
} from '../../../src/components/chart/BillableEventsTable';

const HOOLI_CUSTOMER = 'a0000000-0000-0000-0000-000000000001';
const PIED_PIPER_CUSTOMER = 'a0000000-0000-0000-0000-000000000002';

function makeRow(
  overrides: Partial<BillableEventsTableRow>,
): BillableEventsTableRow {
  return {
    brandUuid: overrides.brandUuid ?? 'brand-1',
    brand: overrides.brand ?? 'Brand 1',
    customerUuid: overrides.customerUuid ?? HOOLI_CUSTOMER,
    customerName: overrides.customerName ?? 'Hooli',
    integrationType: overrides.integrationType ?? 'SDK',
    metrics: overrides.metrics ?? { signup_autofillsSucceeded: 1 },
    raw: overrides.raw ?? {
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
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );
    // Header used to read 'Brand UUID' — now lives in the expanded panel only.
    expect(queryByText('Brand UUID:')).toBeNull();
  });

  test('renders Customer Name column with values', () => {
    const { getByText } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );
    expect(getByText('Customer Name')).toBeDefined();
    expect(getByText('Hooli')).toBeDefined();
    expect(getByText('Pied Piper')).toBeDefined();
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
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    fireEvent.click(getByText('Customer Name'));
    let firstRowText =
      container.querySelectorAll('tbody tr')[0]?.textContent ?? '';
    expect(firstRowText).toContain('Hooli');

    fireEvent.click(getByText('Customer Name'));
    firstRowText =
      container.querySelectorAll('tbody tr')[0]?.textContent ?? '';
    expect(firstRowText).toContain('Pied Piper');
  });

  test('whole-row click toggles the panel', () => {
    const { container, queryByText, getByText } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    expect(queryByText('Identifiers')).toBeNull();

    const aviatoRow = within(container).getByText('Aviato').closest('tr');
    expect(aviatoRow).not.toBeNull();
    fireEvent.click(aviatoRow!);

    expect(getByText('Identifiers')).toBeDefined();
    expect(getByText('Settings')).toBeDefined();

    fireEvent.click(aviatoRow!);
    expect(queryByText('Identifiers')).toBeNull();
  });

  test('only one row is expanded at a time', () => {
    const { container, getAllByText } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    const aviatoRow = within(container).getByText('Aviato').closest('tr');
    const pipRow = within(container).getByText('Pied Piper').closest('tr');

    fireEvent.click(aviatoRow!);
    expect(getAllByText('Identifiers').length).toBe(1);

    fireEvent.click(pipRow!);
    expect(getAllByText('Identifiers').length).toBe(1);
  });

  test('expanded panel shows Brand UUID and Customer UUID labels', () => {
    const { container, getByText } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    const aviatoRow = within(container).getByText('Aviato').closest('tr');
    fireEvent.click(aviatoRow!);

    expect(getByText('Brand UUID:')).toBeDefined();
    expect(getByText('Customer UUID:')).toBeDefined();
  });

  test('Challenges renders ordered prompts as "<type> (<lowercase prompt>)"', () => {
    const { container, getByText } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    const aviatoRow = within(container).getByText('Aviato').closest('tr');
    fireEvent.click(aviatoRow!);

    expect(getByText('Birth Date (always)')).toBeDefined();
    expect(getByText('First Name (if necessary)')).toBeDefined();
  });

  test('Pied Piper has no providers — only 1-Click Signup column with empty challenges', () => {
    const { container, getByText, queryByText, getAllByText } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    const pipRow = within(container).getByText('Pied Piper').closest('tr');
    fireEvent.click(pipRow!);

    expect(getByText('1-Click Signup')).toBeDefined();
    expect(queryByText('1-Click Health')).toBeNull();
    // Empty challenge prompts collapse to "None configured".
    expect(getAllByText('None configured').length).toBeGreaterThanOrEqual(1);
  });

  test('Provider names render verbatim (formatting is the backend\'s job)', () => {
    const { container, getByText } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    const aviatoRow = within(container).getByText('Aviato').closest('tr');
    fireEvent.click(aviatoRow!);

    expect(getByText('Acme')).toBeDefined();
    expect(getByText('Pied Piper')).toBeDefined();
    expect(getByText('Acme Health')).toBeDefined();
    expect(getByText('Aviato')).toBeDefined();
  });

  test('1-Click Health uses an ordered list when mode is fallback', () => {
    const { container } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    const aviatoRow = within(container).getByText('Aviato').closest('tr');
    fireEvent.click(aviatoRow!);

    const expandedPanelRow = aviatoRow?.nextElementSibling;
    expect(expandedPanelRow?.querySelectorAll('ol').length ?? 0).toBeGreaterThan(0);
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
    const { container } = render(
      <BillableEventsTable
        data={parallelData}
        isLoading={false}
        isFetching={false}
      />,
    );

    const aviatoRow = within(container).getByText('Aviato').closest('tr');
    fireEvent.click(aviatoRow!);

    const expandedPanelRow = aviatoRow?.nextElementSibling;
    // 1-Click Signup is still <ol>; 1-Click Health switches to <ul> for parallel.
    expect(expandedPanelRow?.querySelectorAll('ul').length ?? 0).toBeGreaterThan(0);
  });

  test('inner CopyableUuid click does not toggle the row', () => {
    const { queryByText, getAllByLabelText, container } = render(
      <BillableEventsTable data={baseData} isLoading={false} isFetching={false} />,
    );

    const aviatoRow = within(container).getByText('Aviato').closest('tr');
    fireEvent.click(aviatoRow!);
    // Now expanded — clicking a UUID copy button inside the panel must not
    // collapse the row.
    const copyButtons = getAllByLabelText('Copy Brand UUID');
    fireEvent.click(copyButtons[0]);

    // Panel still open.
    expect(queryByText('Identifiers')).not.toBeNull();
  });
});

describe('exportBillableEventsToCsv', () => {
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
      if (tag === 'a') {
        Object.defineProperty(el, 'click', { value: vi.fn() });
      }
      return el;
    }) as typeof document.createElement);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('header includes Customer Name + Customer UUID + Brand Name + Brand UUID + Integration Type', async () => {
    exportBillableEventsToCsv({
      data: baseData,
      filename: 'test',
      visibleProducts: [BillableProduct.ONE_CLICK_SIGNUP],
    });

    expect(capturedBlob).not.toBeNull();
    const text = await capturedBlob!.text();
    const lines = text.split('\n');

    // Row 0: product group header — 5 leading empty cells for the fixed columns.
    expect(lines[0].startsWith(',,,,,')).toBe(true);
    // Row 1: column header.
    expect(lines[1].startsWith(
      'Customer Name,Customer UUID,Brand Name,Brand UUID,Integration Type',
    )).toBe(true);
    // Row 2+: data rows include both customer columns.
    expect(
      lines.slice(2).some((l) =>
        l.startsWith(`Hooli,${HOOLI_CUSTOMER},Aviato,aviato-uuid,SDK`),
      ),
    ).toBe(true);
  });
});
