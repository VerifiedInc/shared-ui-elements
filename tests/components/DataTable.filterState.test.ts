import { describe, expect, test } from 'vitest';

import type {
  DataTableFilterField,
  DataTableFilterState,
} from '../../src/components/DataTable/DataTable.types';
import {
  applyFieldFilters,
  buildInitialFilterState,
  effectiveFilterFieldCount,
  emptyFieldValue,
  isFilterFieldActive,
} from '../../src/components/DataTable/DataTable.filterState';

const stageField: DataTableFilterField = {
  id: 'currentStage',
  label: 'Current Deal Stage',
  kind: 'multiSelect',
  columnId: 'currentStageLabel',
  options: [
    { label: 'Paid Trial', value: '1042' },
    { label: 'Closed Won', value: '2088' },
    { label: 'No deal', value: 'none' },
  ],
};

const customersField: DataTableFilterField = {
  id: 'customers',
  label: 'Customers',
  kind: 'multiSelect',
  columnId: 'customerName',
  // Duplicate display names, distinct uuid values.
  options: [
    { label: 'AbbVie', value: 'uuid-a' },
    { label: 'AbbVie', value: 'uuid-b' },
    { label: 'Agilent', value: 'uuid-c' },
  ],
};

const billableField: DataTableFilterField = {
  id: 'billable',
  label: 'Billable',
  kind: 'boolean',
  columnId: 'billable',
};

const customerNameField: DataTableFilterField = {
  id: 'customerName',
  label: 'Customer',
  kind: 'text',
  columnId: 'customerName',
  operators: ['contains', 'startsWith', 'endsWith'],
};

const activityField: DataTableFilterField = {
  id: 'activity',
  label: 'Activity',
  kind: 'group',
  // No columnId, a non-column ("extended") filter spanning server params.
  sections: [
    {
      key: 'anyProductActivity',
      label: 'Any product',
      options: [
        { label: 'This month', value: 'this_month' },
        { label: 'Earlier', value: 'earlier' },
        { label: 'Never', value: 'never' },
      ],
    },
  ],
};

describe('emptyFieldValue / buildInitialFilterState', () => {
  test('text starts on its first operator with a blank value', () => {
    expect(emptyFieldValue(customerNameField)).toEqual({
      kind: 'text',
      operator: 'contains',
      value: '',
    });
  });

  test('non-text fields start cleared', () => {
    expect(emptyFieldValue(stageField)).toEqual({
      kind: 'multiSelect',
      values: [],
    });
    expect(emptyFieldValue(billableField)).toEqual({
      kind: 'boolean',
      value: null,
    });
    expect(emptyFieldValue(activityField)).toEqual({
      kind: 'group',
      values: {},
    });
  });

  test('builds a cleared value per field', () => {
    const state = buildInitialFilterState([stageField, billableField]);

    expect(state).toEqual({
      currentStage: { kind: 'multiSelect', values: [] },
      billable: { kind: 'boolean', value: null },
    });
  });
});

describe('isFilterFieldActive', () => {
  test('multiSelect: empty is inactive, partial is active', () => {
    expect(
      isFilterFieldActive(stageField, { kind: 'multiSelect', values: [] }),
    ).toBe(false);
    expect(
      isFilterFieldActive(stageField, {
        kind: 'multiSelect',
        values: ['1042'],
      }),
    ).toBe(true);
  });

  test('multiSelect: fully-selected clears by default (select-all = no filter)', () => {
    expect(
      isFilterFieldActive(stageField, {
        kind: 'multiSelect',
        values: ['1042', '2088', 'none'],
      }),
    ).toBe(false);
  });

  test('multiSelect: selectAllClears=false keeps a full selection active', () => {
    expect(
      isFilterFieldActive(
        { ...stageField, selectAllClears: false },
        { kind: 'multiSelect', values: ['1042', '2088', 'none'] },
      ),
    ).toBe(true);
  });

  test('boolean: unset inactive, set active', () => {
    expect(
      isFilterFieldActive(billableField, { kind: 'boolean', value: null }),
    ).toBe(false);
    expect(
      isFilterFieldActive(billableField, { kind: 'boolean', value: false }),
    ).toBe(true);
  });

  test('text: blank inactive, non-blank active; isEmpty always active', () => {
    expect(
      isFilterFieldActive(customerNameField, {
        kind: 'text',
        operator: 'contains',
        value: '  ',
      }),
    ).toBe(false);
    expect(
      isFilterFieldActive(customerNameField, {
        kind: 'text',
        operator: 'contains',
        value: 'Abb',
      }),
    ).toBe(true);
    expect(
      isFilterFieldActive(customerNameField, {
        kind: 'text',
        operator: 'isEmpty',
        value: '',
      }),
    ).toBe(true);
  });

  test('group: active only when a section has a partial selection', () => {
    expect(
      isFilterFieldActive(activityField, { kind: 'group', values: {} }),
    ).toBe(false);
    expect(
      isFilterFieldActive(activityField, {
        kind: 'group',
        values: { anyProductActivity: ['this_month'] },
      }),
    ).toBe(true);
    // fully selected section clears
    expect(
      isFilterFieldActive(activityField, {
        kind: 'group',
        values: { anyProductActivity: ['this_month', 'earlier', 'never'] },
      }),
    ).toBe(false);
  });

  test('kind mismatch or missing value is inactive', () => {
    expect(isFilterFieldActive(stageField, undefined)).toBe(false);
    expect(
      isFilterFieldActive(stageField, { kind: 'boolean', value: true }),
    ).toBe(false);
  });
});

describe('effectiveFilterFieldCount', () => {
  test('counts only active fields', () => {
    const state: DataTableFilterState = {
      currentStage: { kind: 'multiSelect', values: ['1042'] },
      billable: { kind: 'boolean', value: null },
      activity: {
        kind: 'group',
        values: { anyProductActivity: ['this_month'] },
      },
    };

    expect(
      effectiveFilterFieldCount(
        [stageField, billableField, activityField],
        state,
      ),
    ).toBe(2);
  });
});

describe('applyFieldFilters', () => {
  interface Row {
    customerName: string;
    customerUuid: string;
    billable: boolean;
    [key: string]: unknown;
  }

  const rows: Row[] = [
    { customerName: 'AbbVie', customerUuid: 'uuid-a', billable: true },
    { customerName: 'AbbVie', customerUuid: 'uuid-b', billable: false },
    { customerName: 'Agilent', customerUuid: 'uuid-c', billable: true },
  ];

  test('no active fields returns the same array reference', () => {
    const state = buildInitialFilterState([customerNameField]);

    expect(applyFieldFilters(rows, [customerNameField], state)).toBe(rows);
  });

  test('multiSelect ORs values within the field, keyed by value not label', () => {
    // Select one of the two duplicate-named AbbVie rows by its distinct uuid.
    const field: DataTableFilterField = {
      ...customersField,
      columnId: 'customerUuid',
    };
    const state: DataTableFilterState = {
      customers: { kind: 'multiSelect', values: ['uuid-b'] },
    };

    expect(applyFieldFilters(rows, [field], state)).toEqual([rows[1]]);
  });

  test('text contains matches case-insensitively', () => {
    const state: DataTableFilterState = {
      customerName: { kind: 'text', operator: 'contains', value: 'agi' },
    };

    expect(applyFieldFilters(rows, [customerNameField], state)).toEqual([
      rows[2],
    ]);
  });

  test('boolean matches the raw boolean cell', () => {
    const state: DataTableFilterState = {
      billable: { kind: 'boolean', value: false },
    };

    expect(applyFieldFilters(rows, [billableField], state)).toEqual([rows[1]]);
  });

  test('column-less and group fields are skipped client-side', () => {
    const state: DataTableFilterState = {
      activity: {
        kind: 'group',
        values: { anyProductActivity: ['this_month'] },
      },
    };

    expect(applyFieldFilters(rows, [activityField], state)).toBe(rows);
  });
});
